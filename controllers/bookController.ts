import request, { Response } from 'supertest';

const api = request('https://demoqa.com');

export const createBook = async (userId: string, isbn: string, token: string): Promise<Response> => {
  return api
    .post('/BookStore/v1/Books')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      collectionOfIsbns: [{ isbn }]
    })
    .set('Accept', 'application/json');
};

export const updateBook = async (isbn: string, userId: string, newIsbn: string, token: string): Promise<Response> => {
  return api
    .put(`/BookStore/v1/Books/${isbn}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ userId, isbn: newIsbn })
    .set('Accept', 'application/json');
};

export const getBook = async (isbn: string): Promise<Response> => {
  return api.get(`/BookStore/v1/Book?ISBN=${isbn}`);
};

export const deleteBook = async (userId: string, isbn: string, token: string): Promise<Response> => {
  return api
    .delete('/BookStore/v1/Book')
    .set('Authorization', `Bearer ${token}`)
    .send({ userId, isbn });
};
