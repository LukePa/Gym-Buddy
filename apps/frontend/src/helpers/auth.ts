

export function getLocalAuthToken(): string | null {
    return sessionStorage.getItem("jwt");
}

export function setLocalAuthToken(token: string) {
    sessionStorage.setItem("jwt", token);
}

export function clearLocalAuthToken() {
    sessionStorage.clear();
}