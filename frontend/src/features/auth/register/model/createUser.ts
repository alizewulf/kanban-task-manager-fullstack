import axios from "axios";
import { api } from "../../../../shared/config/api/api.config";
import type { User } from "../../../../entities/users/interface";



const createUser = async (user: Omit<User, "id">) => {
try {
    const res = await axios.post(api.users.create, user)
    console.log(res.data);
    
} catch (error) {
    console.log(error)
}
};
export default createUser 