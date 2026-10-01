import { pool } from '../../database/database.js'

export interface TaskSubtaskInput {
  id?: number;
  title: string;
  completed: boolean;
}

export class InvalidSubtaskIdsError extends Error {}
export class InvalidTaskMoveError extends Error {}

interface TaskRow {
  id: number;
  category_id: number;
  position: number;
  [key: string]: unknown;
}

export async function getTasks(categoryId: number) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE category_id = $1 ORDER BY position, id',
    [categoryId]
  )
  return result.rows
}

export async function createTask(categoryId: number, title: string, description: string) {
    const positionResult = await pool.query(
  'SELECT COALESCE(MAX(position), 0) AS max_position FROM tasks WHERE category_id = $1',
      [categoryId]
    )

    const position = positionResult.rows[0].max_position;

    const result = await pool.query(
      'INSERT INTO tasks (category_id, title, description, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [categoryId, title, description, position + 1]
    )
    return result.rows[0]
}

export async function moveTask(taskId: number, targetCategoryId: number, beforeTaskId: number | null) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const taskResult = await client.query(
      'SELECT * FROM tasks WHERE id = $1',
      [taskId]
    );
    const initialTask = taskResult.rows[0] as TaskRow | undefined;

    if (!initialTask) {
      await client.query('ROLLBACK');
      return null;
    }

    const sourceCategoryId = initialTask.category_id;
    const categoryIds = [...new Set([sourceCategoryId, targetCategoryId])].sort((a, b) => a - b);
    const categoriesResult = await client.query(
      'SELECT id, column_id FROM task_categories WHERE id = ANY($1::int[]) ORDER BY id FOR UPDATE',
      [categoryIds]
    );
    const categories = categoriesResult.rows as { id: number; column_id: number }[];
    const sourceCategory = categories.find((category) => category.id === sourceCategoryId);
    const targetCategory = categories.find((category) => category.id === targetCategoryId);

    if (!sourceCategory || !targetCategory || sourceCategory.column_id !== targetCategory.column_id) {
      throw new InvalidTaskMoveError('Tasks can only be moved between categories on the same board');
    }

    const lockedTaskResult = await client.query(
      'SELECT * FROM tasks WHERE id = $1 FOR UPDATE',
      [taskId]
    );
    const movingTask = lockedTaskResult.rows[0] as TaskRow | undefined;
    if (!movingTask || movingTask.category_id !== sourceCategoryId) {
      throw new InvalidTaskMoveError('The task changed categories; refresh and try again');
    }

    const tasksResult = await client.query(
      'SELECT * FROM tasks WHERE category_id = ANY($1::int[]) ORDER BY category_id, position, id FOR UPDATE',
      [categoryIds]
    );
    const allTasks = tasksResult.rows as TaskRow[];
    const sourceTasks = allTasks.filter((task) => task.category_id === movingTask.category_id);
    const targetTasks = movingTask.category_id === targetCategoryId
      ? sourceTasks
      : allTasks.filter((task) => task.category_id === targetCategoryId);
    const reorderedSource = sourceTasks.filter((task) => task.id !== taskId);
    const reorderedTarget = movingTask.category_id === targetCategoryId
      ? reorderedSource
      : [...targetTasks];

    let insertionIndex = reorderedTarget.length;
    if (beforeTaskId !== null) {
      if (beforeTaskId === taskId) {
        throw new InvalidTaskMoveError('A task cannot be inserted before itself');
      }

      insertionIndex = reorderedTarget.findIndex((task) => task.id === beforeTaskId);
      if (insertionIndex === -1) {
        throw new InvalidTaskMoveError('The destination task was not found in the target category');
      }
    }
    reorderedTarget.splice(insertionIndex, 0, movingTask);

    const finalSource = movingTask.category_id === targetCategoryId ? reorderedTarget : reorderedSource;
    const finalTarget = reorderedTarget;
    const updatedLists = movingTask.category_id === targetCategoryId
      ? [{ categoryId: targetCategoryId, tasks: finalTarget }]
      : [
          { categoryId: movingTask.category_id, tasks: finalSource },
          { categoryId: targetCategoryId, tasks: finalTarget },
        ];

    for (const list of updatedLists) {
      for (const [index, task] of list.tasks.entries()) {
        await client.query(
          'UPDATE tasks SET category_id = $1, position = $2 WHERE id = $3',
          [list.categoryId, index + 1, task.id]
        );
        task.category_id = list.categoryId;
        task.position = index + 1;
      }
    }

    await client.query('COMMIT');
    return {
      sourceCategoryId,
      targetCategoryId,
      sourceTasks: finalSource,
      targetTasks: finalTarget,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function updateTaskDetails(
  taskId: number,
  title: string,
  description: string,
  subtasks: TaskSubtaskInput[]
) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const taskResult = await client.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, taskId]
    );

    if (taskResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    const existingResult = await client.query(
      'SELECT id FROM subtasks WHERE task_id = $1',
      [taskId]
    );
    const existingIds = new Set<number>(existingResult.rows.map((row: { id: number }) => row.id));
    const requestedIds = subtasks.flatMap((subtask) => subtask.id === undefined ? [] : [subtask.id]);

    if (requestedIds.some((id) => !existingIds.has(id))) {
      throw new InvalidSubtaskIdsError('Subtask does not belong to this task');
    }

    if (requestedIds.length === 0) {
      await client.query('DELETE FROM subtasks WHERE task_id = $1', [taskId]);
    } else {
      await client.query(
        'DELETE FROM subtasks WHERE task_id = $1 AND NOT (id = ANY($2::int[]))',
        [taskId, requestedIds]
      );
    }

    for (const [position, subtask] of subtasks.entries()) {
      if (subtask.id === undefined) {
        await client.query(
          'INSERT INTO subtasks (task_id, title, completed, position) VALUES ($1, $2, $3, $4)',
          [taskId, subtask.title, subtask.completed, position]
        );
      } else {
        await client.query(
          'UPDATE subtasks SET title = $1, completed = $2, position = $3 WHERE id = $4 AND task_id = $5',
          [subtask.title, subtask.completed, position, subtask.id, taskId]
        );
      }
    }

    const subtasksResult = await client.query(
      'SELECT * FROM subtasks WHERE task_id = $1 ORDER BY position, id',
      [taskId]
    );

    await client.query('COMMIT');
    return { task: taskResult.rows[0], subtasks: subtasksResult.rows };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}