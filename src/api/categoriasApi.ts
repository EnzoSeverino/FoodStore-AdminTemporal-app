import apiClient from "./axiosInstance";
import type { Categoria, CategoriaCreate, CategoriaUpdate } from "@/types/categoria";
import type { PaginatedResponse } from "@/types/api";

const CATEGORIAS = '/categorias'

// ─── GET /api/v1/categorias
export async function getCategorias(
    page = 1,
    size = 20,
): Promise<PaginatedResponse<Categoria>> {
    const response = await apiClient.get<PaginatedResponse<Categoria>>(CATEGORIAS, {
        params: { page, size },
    })
    return response.data
}

// ─── GET /api/v1/categorias/all 
export async function getAllCategorias(): Promise<Categoria[]> {
    const response = await apiClient.get<Categoria[]>(`${CATEGORIAS}/all`)
    return response.data
}

// ─── POST /api/v1/categorias
export async function createCategoria(data: CategoriaCreate): Promise<Categoria> {
    const response = await apiClient.post<Categoria>(CATEGORIAS, data)
    return response.data
}

// ─── PUT /api/v1/categorias/{id} 
export async function updateCategoria(id: number, data: CategoriaUpdate): Promise<Categoria> {
    const response = await apiClient.put<Categoria>(`${CATEGORIAS}/${id}`, data)
    return response.data
}

// ─── DELETE /api/v1/categorias/{id}
export async function deleteCategoria(id: number): Promise<void> {
    await apiClient.delete(`${CATEGORIAS}/${id}`)
}