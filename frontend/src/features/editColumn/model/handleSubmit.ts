import { COLUMN_LINK } from "@/shared/config/api/columns.config";
import axios from "axios";

const handleSubmit = async (
  state: string,
  columnId: number
) => {

  const response = await axios.patch(
    `${COLUMN_LINK}/${columnId}`,
    {
      title: state
    }
  );

  return response.data;
};

export default handleSubmit;