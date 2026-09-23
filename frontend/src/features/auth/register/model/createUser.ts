import axios from "axios";
import USERS_API from "../../../../shared/config/api/users.config";
import type { User } from "../../../../entities/users/interface";



const createUser = async (user: Omit<User, "id">) => {
try {
    const res = await axios.post(USERS_API, user)
    console.log(res.data);
    
} catch (error) {
    console.log(error)
}
};
export default createUser 