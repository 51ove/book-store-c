import { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategory = async()=>{
    const response = await httpClient.get<Category[]>("/category");
    // 응답 타입이 Category[]
    return response.data;
}