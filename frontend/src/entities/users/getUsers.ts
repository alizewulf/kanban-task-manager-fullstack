import axios from "axios"
import { api } from "../../shared/config/api/api.config"

async function getUsers() {
    const response = await axios.get(api.users.list)
    return response.data
}
export default getUsers