import request, { Response } from 'supertest';

const api = request('https://demoqa.com');

export const generateToken = async (username: string, password: string): Promise<Response> => {
  return api
    .post('/Account/v1/GenerateToken')
    .send({ userName: username, password })
    .set('Accept', 'application/json');
};

export const authorize = async (username: string, password: string): Promise<Response> => {
  const tokenRes = await generateToken(username, password);
  if (tokenRes.status === 200 && tokenRes.body.token) {
    return { status: 200, body: { token: tokenRes.body.token } } as unknown as Response;
  }
  return { status: tokenRes.status, body: { token: null } } as unknown as Response;
};
