import { pool } from '../../database/database.js'

export interface TaskSubtaskInput {
  id?: number;
  title: string;
  completed: boolean;
}

export class InvalidSubtaskIdsError extends Error {}

export async function getTasks(categoryId: number) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE category_id = $1',
    [categoryId]
  )
  return result.rows
}

export async function createTask(categoryId: number, title: string, description: string) {
    const positionResult = await pool.query(
      'SELECT MAX(position) AS max_position FROM tasks WHERE category_id = $1',
      [categoryId]
    )

    const position = positionResult.rows[0].max_position;

    const result = await pool.query(
      'INSERT INTO tasks (category_id, title, description, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [categoryId, title, description, position + 1]
    )
    return result.rows[0]
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