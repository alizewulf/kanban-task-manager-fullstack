import { api } from "@/shared/config/api/api.config";
import { apiClient } from "@/shared/config/api/apiClient";

function deleteColumn(columnId: number): Promise<void> {
  return apiClient.delete(api.columns.delete(columnId))
    .then(() => {
      console.log(`Column with ID ${columnId} deleted successfully.`);
    })
    .catch((error) => {
      console.error(`Error deleting column with ID ${columnId}:`, error);
      throw error;
    });
}

export default deleteColumn;