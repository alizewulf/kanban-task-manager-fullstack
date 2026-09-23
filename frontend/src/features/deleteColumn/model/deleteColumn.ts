import { COLUMN_LINK } from "@/shared/config/api/columns.config";
import axios from "axios";

function deleteColumn(columnId: number): Promise<void> {
  return axios.delete(`${COLUMN_LINK}/${columnId}`)
    .then(() => {
      console.log(`Column with ID ${columnId} deleted successfully.`);
    })
    .catch((error) => {
      console.error(`Error deleting column with ID ${columnId}:`, error);
      throw error;
    });
}

export default deleteColumn;