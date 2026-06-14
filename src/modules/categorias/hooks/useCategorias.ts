import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getCategorias,
    getAllCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} from "@/api/categoriasApi";
import type { Categoria, CategoriaCreate, CategoriaUpdate } from "@/types/categoria";
import type { PaginatedResponse } from "@/types/api";

const CATEGORIAS_KEY = ['categorias'] as const
const ALL_CATEGORIAS_KEY = ['categorias', 'all'] as const

export function useCategorias(page = 1, size = 20) {
    return useQuery<PaginatedResponse<Categoria>>({
        queryKey: [...CATEGORIAS_KEY, page, size],
        queryFn: () => getCategorias(page, size),
        staleTime: 2 * 60 * 1000
    })
}

export function useAllCategorias() {
    return useQuery<Categoria[]>({
        queryKey: ALL_CATEGORIAS_KEY,
        queryFn: getAllCategorias,
        staleTime: 5 * 60 * 1000
    })
}

export function useCreateCategoria() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CategoriaCreate) => createCategoria(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIAS_KEY })
            queryClient.invalidateQueries({ queryKey: ALL_CATEGORIAS_KEY })
        },
    })
}

export function useUpdateCategoria() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CategoriaUpdate }) =>
            updateCategoria(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIAS_KEY })
            queryClient.invalidateQueries({ queryKey: ALL_CATEGORIAS_KEY })
        },
    })
}

export function useDeleteCategoria() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteCategoria(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIAS_KEY })
            queryClient.invalidateQueries({ queryKey: ALL_CATEGORIAS_KEY })
        },
    })
}