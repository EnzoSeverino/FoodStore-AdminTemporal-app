// ─── Autenticación
export interface LoginRequest {
    email: string
    password: string
}

export interface TokenResponse {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
}

export interface UserPublic {
    id: number
    nombre: string
    apellido: string
    email: string
    roles: string[]
    created_at: string
}

// Error estándar RFC 7807 que devuelve FastAPI
export interface ApiError {
    detail: string
    code?: string
    field?: string
}

// Respuesta paginada genérica — se usa con cualquier entidad
export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    size: number
    pages: number
}