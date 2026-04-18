import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async(userData : SignupProps) => {
    // console.log("signup payload:", userData);
    const response = await httpClient.post("/users/join",
        userData);
    return response.data;
}

export const resetRequest = async (data: SignupProps) => {
    const response = await httpClient.post("/users/password-reset", data);
    return response.data;
}

export const resetPassword = async (data: SignupProps) => {
    const response = await httpClient.put("/users/password-reset", data);
    return response.data;
}

interface LoginResponse {
    token: string;
}
export const login = async (data: SignupProps) => {
    const response = await httpClient.post<LoginResponse>("/users/login", data);
    return response.data;
    // token 받음
}