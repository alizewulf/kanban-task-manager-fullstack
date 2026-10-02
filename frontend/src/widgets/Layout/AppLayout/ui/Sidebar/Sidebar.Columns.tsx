import  useColumns  from "@/features/columns/useColumns/useColumns"
import textStyles from "@/shared/typography/typography";
import AbstractIcon, { iconFillColors } from "./icons/AbstractIcon";
import { useAppContext } from "@/shared/context/app.context";
import { useEffect } from "react";
import ColumnSkeleton from "./Column.Skeleton";
import CreateColumnButton from "@/features/columns/ui/CreateColumn.Button";
import { useModal } from "@/shared/ui/modal/useModal";
import CreateColumnModal from "@/features/columns/ui/CreateColumn.Modal";
import type { Column } from "@/features/columns/model/column.types";

function SidebarColumns({ userId }:{userId:number}) {

  const { data, loading, error, addColumn, updateColumn, removeColumn: removeColumnFromState } = useColumns(userId)
  const { selectedColumn, setSelectedColumn, setRemoveColumn } = useAppContext();
  const activeColumn = selectedColumn?.id ?? 0
  const { openModal } = useModal()

  function handleColumnCreated(column: Column) {
    addColumn(column)
    setSelectedColumn(column)
  }

  useEffect(() => {
    if (!loading && data.length > 0 && !selectedColumn) {
      setSelectedColumn(data[0]);
    }
  }, [loading, data, selectedColumn, setSelectedColumn])

  useEffect(() => {
    if (selectedColumn) {
      updateColumn(selectedColumn)
    }
  }, [selectedColumn, updateColumn])

  useEffect(() => {
    setRemoveColumn(() => (columnId: number) => {
      setSelectedColumn(null)
      removeColumnFromState(columnId)
    })
  }, [removeColumnFromState, setRemoveColumn, setSelectedColumn])

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <p role="alert" className="px-8 text-sm text-accent3-hover">
          Не удалось загрузить список досок. {data.length > 0 ? "Показаны сохранённые данные." : "Попробуйте обновить страницу."}
        </p>
      )}
      <span className={`px-8 ${textStyles.heading.sm} tracking-[2.4px] text-accent3-hover uppercase font-bold`}>
        All Boards ({data.length})
      </span>

      <ul>
        {loading && data.length === 0 ? (
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
        <CreateColumnButton
          color={iconFillColors.create}
          onClick={() => openModal(<CreateColumnModal onCreated={handleColumnCreated} />)}
        />
      </ul>
    </div>
  )
}

export default SidebarColumns