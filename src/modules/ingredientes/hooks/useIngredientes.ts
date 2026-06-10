import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getIngredientes,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
    type IngredienteCreate,
    type IngredienteUpdate,
} from "@/api/ingredientesApi";

const QUERY_KEY = ['ingredientes']

export function useIngredientes() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: getIngredientes,
    })
}

export function useCreateIngrediente() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: IngredienteCreate) => createIngrediente(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}

export function useUpdateIngrediente() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: IngredienteUpdate }) =>
            updateIngrediente(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}

export function useDeleteIngrediente() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteIngrediente(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}