
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://c453e15198bc48109d6cb5611b28c673.weavy.io',
    headers: {
        'Authorization': `Bearer wys_Fhv6T4NE3NHepHAwmvo852HdGWQ06n37XY1d`,
        'Content-Type': 'application/json',
    },
});

export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (userId, userData) => api.put(`/users/${userId}`, userData);
export const listUsers = () => api.get('/users');
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
