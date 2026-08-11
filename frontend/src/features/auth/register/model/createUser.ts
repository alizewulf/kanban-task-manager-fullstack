import axios from "axios";
import USERS_API from "../../../../entities/users/users.config";
import type { User } from "../../../../entities/users/interface";



const createUser = async (user:User) => {
try {
    const res = await axios.post(USERS_API, user)
    console.log(res.data);
    
} catch (error) {
    console.log(error)
}
};
export default createUser 