import { removeToken } from "./AuthStorageService";

function logoutUser() {
    removeToken()
}

export {
    logoutUser
}