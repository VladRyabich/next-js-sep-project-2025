// src/services/api.service.ts
import { cookies } from 'next/headers';
import {IRecipe} from "@/models/IRecipe";
import {IUser} from "@/models/IUser";
import {IRecipeBaseResponseModel} from "@/models/IRecipeBaseResponseModel";
import {IUserBaseResponseModel} from "@/models/IUserBaseResponseModel";

const BASE_URL = 'https://dummyjson.com/auth';

async function getAccessToken(): Promise<string> {
    const coockieStore = await cookies();
    const token = coockieStore.get('accessToken')?.value;
    if (!token) {
        throw new Error('Немає access token');
    }
    return token;
}

async function fetchAPI<T>(url: string): Promise<T> {
    const token = await getAccessToken();
    const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    });

    const response = await fetch(url, { headers });
    console.log('Response status:', response.status);

    if (response.status === 401) {
        const refreshResponse = await fetch('http://localhost/api/refresh-token', {
            credentials: 'include',
        });
        console.log('refresh response:', refreshResponse);

        const newToken = await getAccessToken(); // Функція, яка зчитує accessToken з cookies
        headers.set('Authorization', `Bearer ${newToken}`);

        const response = await fetch(url, { headers });
        console.log('Response status after 401: ', response.status);
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Помилка при запиті ${url}: ${response.status} - ${errorText}`);
        throw new Error(`Запит завершився помилкою: ${response.statusText}`);
    }
    return response.json();
}

export const apiService = {
    getUsers: async (skip = 0, limit = 10, query?: string | number): Promise<IUserBaseResponseModel> => {
        let url = `${BASE_URL}/users?skip=${skip}&limit=${limit}`;
        if (query) {
            url =
                typeof query === 'number'
                    ? `${BASE_URL}/users/${query}`
                    : `${BASE_URL}/users/search?q=${query}&skip=${skip}&limit=${limit}`;
        }
        return fetchAPI(url);
    },

    getUser: async (id: number): Promise<IUser> => {
        const url = `${BASE_URL}/users/${id}`;
        return fetchAPI(url);
    },

    getRecipes: async (skip = 0, limit = 10, query?: string | number): Promise<IRecipeBaseResponseModel> => {
        let url = `${BASE_URL}/recipes?skip=${skip}&limit=${limit}`;
        if (query) {
            url = typeof query === "number"
                ? `${BASE_URL}/recipes/${query}`
                : `${BASE_URL}/recipes/search?q=${query}&skip=${skip}&limit=${limit}`;
        }
        return fetchAPI(url);
    },

    getRecipe: async (id: number): Promise<IRecipe> => {
        return fetchAPI(`${BASE_URL}/recipes/${id}`);
    },

    getRecipesByTag: async (tag: string, skip = 0, limit = 10): Promise<IRecipeBaseResponseModel> => {
        return fetchAPI(`${BASE_URL}/recipes/tag/${tag}?skip=${skip}&limit=${limit}`);
    },
};