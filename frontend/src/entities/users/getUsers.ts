import usersAPI from "./users.config"

async function getUsers() {
    const response = await fetch(usersAPI)
    const data = await response.json()
    return data
}

export default getUsers