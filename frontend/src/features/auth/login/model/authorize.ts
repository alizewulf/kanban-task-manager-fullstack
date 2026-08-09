import type { User } from "../../../../entities/users/interface";

interface LoginForm {
    login: string,
    password: string
}

function login(object:User[], form:LoginForm) {
    const {login, password} = form
    const find = object.find(user => user.login === login && user.password === password)
    if (find) {
        return find
    } else {
        return "error"
    }
}

export default login