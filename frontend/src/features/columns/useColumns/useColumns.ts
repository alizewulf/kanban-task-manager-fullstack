import { useCallback, useEffect, useState } from "react"
import type { Column } from "../model/column.types"
import getColumns from "../model/getColumns"

interface ColumnsState {
    data: Column[]
    loading: boolean,
    error: string | null
}
function useColumns(userId: number) {
    const [state, setState] = useState<ColumnsState>({
        data: [],
        loading: true,
        error: null
    })

    function addColumn(column: Column) {
        setState(prev => ({
            ...prev,
            data: [...prev.data, column]
        }))
    }

    const updateColumn = useCallback((column: Column) => {
        setState(prev => ({
            ...prev,
            data: prev.data.map(item => item.id === column.id ? column : item)
        }))
    }, [])

    useEffect(() => {
        async function fetchColumns() {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true,
                    error: null
                }))
                
                const data = await getColumns(userId)
                
                setState(() => ({
                    data,
                    loading: false,
                    error: null
                }))
            } catch {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: "Failed to fetch columns"
                }))
            }
        }
        fetchColumns()
    },[userId])
    return { ...state, addColumn, updateColumn }
}

export default useColumns