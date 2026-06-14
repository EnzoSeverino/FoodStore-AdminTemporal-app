import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getIngredientes,
    getAllIngredientes,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
} from "@/api/ingredientesApi";
import type { Ingrediente, IngredienteCreate, IngredienteUpdate } from "@/types/producto";
import type { PaginatedResponse } from "@/types/api";

const INGREDIENTES_KEY = ['ingredientes'] as const
const ALL_INGREDIENTES_KEY = ['ingredientes', 'all'] as const

export function useIngredientes(page = 1, size = 20) {
    return useQuery<PaginatedResponse<Ingrediente>>({
        queryKey: [...INGREDIENTES_KEY, page, size],
        queryFn: () => getIngredientes(page, size),
        staleTime: 2 * 60 * 1000,
    })
}

export function useAllIngredientes() {
    return useQuery<Ingrediente[]>({
        queryKey: ALL_INGREDIENTES_KEY,
        queryFn: getAllIngredientes,
        staleTime: 5 * 60 * 1000,
    })
}

export function useCreateIngrediente() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: IngredienteCreate) => createIngrediente(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: INGREDIENTES_KEY })
            queryClient.invalidateQueries({ queryKey: ALL_INGREDIENTES_KEY })
        },
    })
}

export function useUpdateIngrediente() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: IngredienteUpdate }) =>
            updateIngrediente(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: INGREDIENTES_KEY })
            queryClient.invalidateQueries({ queryKey: ALL_INGREDIENTES_KEY })
        },
    })
}

export function useDeleteIngrediente() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteIngrediente(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: INGREDIENTES_KEY })
            queryClient.invalidateQueries({ queryKey: ALL_INGREDIENTES_KEY })
        },
    })
}