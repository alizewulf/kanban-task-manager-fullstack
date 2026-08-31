import useColumns from "../../../../../features/columns/useColumns/useColumns"
import textStyles from "../../../../../shared/typography/typography";
import AbstractIcon, { iconFillColors } from "./icons/AbstractIcon";
import { useAppContext } from "../../../../../shared/context/app.context";
import { useState, useEffect } from "react";
import ColumnSkeleton from "./Column.Skeleton";

function SidebarColumns({ userId }: { userId: number }) {

  const { data, loading, error } = useColumns(userId)
  const { selectedColumn, setSelectedColumn } = useAppContext();
  const [activeColumn, setActiveColumn] = useState<number>(1)

  // Автоматически установить первую колонну при загрузке
  useEffect(() => {
    if (!loading && data.length > 0 && !selectedColumn) {
      setSelectedColumn(data[0]);
      setActiveColumn(data[0].id);
    }
  }, [loading, data, selectedColumn, setSelectedColumn])

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <span className={`px-8 ${textStyles.heading.sm} tracking-[2.4px] text-accent3-hover uppercase font-bold`}>
        All Boards ({data.length})
      </span>

      <ul>
        {loading ? (
          <div className="flex flex-col pl-8 gap-2">
            {Array.from({ length: 4 }, () => (
              <ColumnSkeleton />
            ))}
          </div>
        ) : (
          data.map((column) => (
            <li
              key={column.id}
              className={`${textStyles.heading.md} cursor-pointer py-4 pl-8 pr-6 font-bold capitalize flex gap-4 items-center ${activeColumn === column.id
                  ? 'text-white bg-primary rounded-r-full'
                  : 'text-accent3-hover'
                }`}
              onClick={() => {
                setSelectedColumn(column);
                setActiveColumn(column.id);
              }}
            >
              <AbstractIcon
                fill={
                  activeColumn === column.id
                    ? iconFillColors.active
                    : iconFillColors.inactive
                }
              />

              {column.title}
            </li>
          ))
        )}

        <li className="text-primary text-[15px] py-4 pl-8 capitalize cursor-pointer flex gap-4 font-bold items-center">
          <AbstractIcon fill={iconFillColors.create} />
          + Create New Board
        </li>
      </ul>
    </div>
  )
}

export default SidebarColumns