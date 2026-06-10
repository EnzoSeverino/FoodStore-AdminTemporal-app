import apiClient from "./axiosInstance";
import type { Usuario, UsuarioCreate, UsuarioUpdate } from "@/types/usuario";
import type { PaginatedResponse } from "@/types/api";

const ADMIN = '/admin'

// ─── GET /api/v1/admin/usuarios
export async function getUsuarios(
    page = 1,
    size = 20,
): Promise<PaginatedResponse<Usuario>> {
    const response = await apiClient.get<PaginatedResponse<Usuario>>(`${ADMIN}/usuarios`, {
        params: { page, size }
    })
    return response.data
}

// ─── POST /api/v1/admin/usuarios
export async function createUsuario(data: UsuarioCreate): Promise<Usuario> {
    const response = await apiClient.post<Usuario>(`${ADMIN}/usuarios`, data)
    return response.data
}

// ─── PUT /api/v1/admin/usuarios/{id} 
export async function updateUsuario(id: number, data: UsuarioUpdate): Promise<Usuario> {
    const response = await apiClient.put<Usuario>(`${ADMIN}/usuarios/${id}`, data)
    return response.data
}

// ─── DELETE /api/v1/admin/usuarios/{id}
export async function deleteUsuario(id: number): Promise<void> {
    await apiClient.delete(`${ADMIN}/usuarios/${id}`)
}