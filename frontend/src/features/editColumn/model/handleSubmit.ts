import { api } from "@/shared/config/api/api.config";
import { apiClient } from "@/shared/config/api/apiClient";

const handleSubmit = async (
  state: string,
  columnId: number
) => {

  const response = await apiClient.patch(
    api.columns.update(columnId),
    {
      title: state
    }
  );

  return response.data;
};

export default handleSubmit;