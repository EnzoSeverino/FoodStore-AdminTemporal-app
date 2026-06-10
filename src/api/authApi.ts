import apiClient from "./axiosInstance";
import type { UserPublic, TokenResponse, LoginRequest } from "@/types/api";

const AUTH = '/auth'

// ─── Login
export async function requestLogin(
    email: string,
    password: string
): Promise<TokenResponse> {
    const body: LoginRequest = { email, password }
    const response = await apiClient.post<TokenResponse>(`${AUTH}/login`, body)
    return response.data
}

// ─── Refresh Token
export async function requestRefresh(): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(`${AUTH}/refresh`)
    return response.data
}

// ─── Me (usuario actual)
export async function requestMe(): Promise<UserPublic> {
    const response = await apiClient.get<UserPublic>(`${AUTH}/me`)
    return response.data
}

// ─── Logout 
export async function requestLogout(): Promise<void> {
    await apiClient.post(`${AUTH}/logout`)
}