


export function getApiUrl(): string {
    return import.meta.env.VITE_APP_API_URL ?? "";
}