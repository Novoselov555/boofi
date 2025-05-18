export function saveToken(token) {
    localStorage.setItem("jwtToken", token);
}

export function getToken() {
    return localStorage.getItem("jwtToken");
}

export function clearToken() {
    localStorage.removeItem("jwtToken");
}
