// ─── Roles del sistema
export type CodigoRol = 'ADMIN' | 'STOCK' | 'PEDIDOS' | 'CLIENT'

// ─── Asignación de rol (tabla pivote UsuarioRol)
export interface UsuarioRol {
    rol_codigo: CodigoRol
    asignado_por_id: number | null
    expires_at: string | null
}

// ─── Usuario
export interface Usuario {
    id: number
    nombre: string
    apellido: string
    email: string
    celular: string | null
    roles: UsuarioRol[]
    created_at: string
    deleted_at: string | null
}

// ─── Usuario Create 
export interface UsuarioCreate {
    nombre: string
    apellido: string
    email: string
    password: string
    celular?: string
    roles: CodigoRol[]
}

// ─── Usuario Update
export interface UsuarioUpdate {
    nombre?: string
    apellido?: string
    email?: string
    celular?: string
    roles?: CodigoRol[]
}