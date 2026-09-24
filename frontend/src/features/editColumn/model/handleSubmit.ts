import { api } from "@/shared/config/api/api.config";
import axios from "axios";

const handleSubmit = async (
  state: string,
  columnId: number
) => {

  const response = await axios.patch(
    api.columns.update(columnId),
    {
      title: state
    }
  );

  return response.data;
};

export default handleSubmit;