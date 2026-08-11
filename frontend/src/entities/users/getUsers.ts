import axios from "axios"
import usersAPI from "./users.config"

async function getUsers() {
    const response = await axios.get(usersAPI)   
    return response.data
}
export default getUsers