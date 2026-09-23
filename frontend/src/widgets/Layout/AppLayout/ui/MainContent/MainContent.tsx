import CreateTaskColumnButton from "@/features/createTaskColumn";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import textStyles from "@/shared/typography/typography";

function MainContent({data}:{data:TaskCategory[]}) {
  return (
    <div className="flex gap-6 pt-6 pl-6">
      {data.map(task_category => (
        <div className="flex gap-3 items-center h-fit">
          <span style={{backgroundColor: `${task_category.color}`}} className="w-3.75 h-3.75 rounded-full"></span>
          <p className={`${textStyles.heading.sm} text-accent3-hover uppercase tracking-[2.4px]`}>{task_category.title} (0)</p>
        </div>
      ))}

      <CreateTaskColumnButton/>
    </div>
  )
}

export default MainContent