import request, { Response } from 'supertest';

const api = request('https://demoqa.com');

export const getUser = async (userId: string, token: string): Promise<Response> => {
  return api
    .get(`/Account/v1/User/${userId}`)
    .set('Authorization', `Bearer ${token}`);
};

export const deleteUser = async (userId: string, token: string): Promise<Response> => {
  return api
    .delete(`/Account/v1/User/${userId}`)
    .set('Authorization', `Bearer ${token}`);
};
