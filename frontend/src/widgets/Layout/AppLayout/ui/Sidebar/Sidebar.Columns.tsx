import useColumns from "../../../../../features/columns/useColumns/useColumns"
import textStyles from "../../../../../shared/typography/typography";
import AbstractIcon from "./icons/AbstractIcon";
import { useAppContext } from "../../../../../shared/context/app.context";

function SidebarColumns({ userId }: { userId: number }) {

  const { data, loading, error } = useColumns(userId)
  const { setSelectedColumn } = useAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <span className={`px-8 ${textStyles.heading.sm} tracking-[2.4px] text-accent3-hover uppercase font-bold`}>
        All Boards ({data.length})
      </span>

      <ul>
        {data.map((column) => (
          <li
            key={column.id}
            className={`${textStyles.heading.md} cursor-pointer py-4 pl-8 font-bold capitalize flex gap-4 items-center`}
            onClick={() => setSelectedColumn(column)}
          >
            <AbstractIcon />
            {column.title}
          </li>
        ))}

        <li
          className="text-primary text-[15px] py-4 pl-8 capitalize cursor-pointer flex gap-4 font-bold items-center"
        >
          <AbstractIcon />
          + Create New Board
        </li>
      </ul>
    </div>
  )
}

export default SidebarColumns