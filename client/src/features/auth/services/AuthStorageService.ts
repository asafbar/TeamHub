import { STORAGE_KEYS } from "../../../constants/StorageKeys"


function saveToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
}

function getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
}

function removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
}

export {
    saveToken,
    getToken,
    removeToken
}