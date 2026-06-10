// ─── Estado de la conexión
export type WsConnectionStatus =
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'error'

// ─── Estado del wsStore
export interface WsState {
    status: WsConnectionStatus
    lastEvent: WsLastEvent | null
    retryCount: number
}

// ─── Último evento recibido
export interface WsLastEvent {
    event: string
    pedido_id: number
    timestamp: string
}