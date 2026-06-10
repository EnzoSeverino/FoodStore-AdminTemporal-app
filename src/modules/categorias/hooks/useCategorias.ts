import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    type CategoriaCreate,
    type CategoriaUpdate,
} from "@/api/categoriasApi";

const QUERY_KEY = ['categorias']

export function useCategorias() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: getCategorias,
    })
}

export function useCreateCategoria() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CategoriaCreate) => createCategoria(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}

export function useUpdateCategoria() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CategoriaUpdate }) =>
            updateCategoria(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}

export function useDeleteCategoria() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteCategoria(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}