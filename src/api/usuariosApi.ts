import apiClient from "./axiosInstance";

export interface Usuario {
    id: number
    email: string
    nombre: string
    rol: string
    deleted_at: string | null
}

export interface UsuarioUpdate {
    nombre?: string
    email?: string
    rol?: string
}

export interface UsuarioCreate {
    email: string
    password: string
    nombre: string
    rol: string
}

interface UsuariosResponse {
    items: Usuario[]
    total: number
    skip: number
    limit: number
}

const ADMIN = '/admin'

export async function getUsuarios(skip = 0, limit = 20): Promise<{ items: Usuario[]; total: number }> {
    const response = await apiClient.get<UsuariosResponse>(`${ADMIN}/usuarios`, {
        params: { skip, limit }
    })
    return { items: response.data.items, total: response.data.total }
}

export async function createUsuario(data: UsuarioCreate): Promise<Usuario> {
    const response = await apiClient.post<Usuario>(`${ADMIN}/usuarios`, data)
    return response.data
}

export async function updateUsuario(id: number, data: UsuarioUpdate): Promise<Usuario> {
    const response = await apiClient.put<Usuario>(`${ADMIN}/usuarios/${id}`, data)
    return response.data
}

export async function deleteUsuario(id: number): Promise<void> {
    await apiClient.delete(`${ADMIN}/usuarios/${id}`)
}