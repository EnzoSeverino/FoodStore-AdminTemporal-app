import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getPedidos,
    cambiarEstado,
    getEstadosPosibles,
    type CambioEstadoRequest,
} from "@/api/pedidosApi";

const QUERY_KEY = ['pedidos']

export function usePedidos() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: getPedidos,
    })
}

export function useCambiarEstado() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data}: { id: number; data: CambioEstadoRequest }) =>
            cambiarEstado(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY })
        },
    })
}

export function useEstadosPosibles(pedidoId: number) {
    return useQuery({
        queryKey: ['estados-posibles', pedidoId],
        queryFn: () => getEstadosPosibles(pedidoId),
        enabled: pedidoId > 0,
    })
}