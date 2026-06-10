import apiClient from "./axiosInstance";
import type { CloudinaryResponse } from "@/types/producto";

const UPLOADS = '/uploads'

// ─── POST /api/v1/uploads/imagen
export async function uploadImage(file: File): Promise<CloudinaryResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post<CloudinaryResponse>(`${UPLOADS}/imagen`,
        formData, { headers: { 'Content-Type': undefined } })
    
    return response.data
}

// ─── DELETE /api/v1/uploads/imagen/{public_id} 
export async function deleteImagen(publicId: string): Promise<void> {
    await apiClient.delete(`${UPLOADS}/imagen/${encodeURIComponent(publicId)}`)
}