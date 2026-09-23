import axios from "axios"
import usersAPI from "../../shared/config/api/users.config"

async function getUsers() {
    const response = await axios.get(usersAPI)   
    return response.data
}
export default getUsers