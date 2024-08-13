import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { faker } from "@faker-js/faker";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type getUsersReponse = {
    totalCount: number;
    users: User[];
}


export async function getUsers(page: number): Promise<getUsersReponse> {
    const { data, headers } = await api.get('users', { 
        params: { page }
    })

    const totalCount = Number(headers['x-total-count'])
        
    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(faker.date.anytime().toISOString()).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        }
    });

    return {users, totalCount}
}


export function useUsers(page: number) {
    return useQuery({
        queryKey: ['users', page],
        queryFn: () => getUsers(page),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 60,
    })
}