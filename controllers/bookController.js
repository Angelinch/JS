const request = require('supertest')
const { baseURL } = require('../config')

const api = request(baseURL);

async function createBook(userId, isbn, token) {
  return api
    .post('/BookStore/v1/Books')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      collectionOfIsbns: [{ isbn }]
    });
}

async function updateBook(isbn, userId, newIsbn, token) {
  return api
    .put(`/BookStore/v1/Books/${isbn}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      isbn: newIsbn
    })
}

async function getBook(isbn) {
  return api.get(`/BookStore/v1/Book?ISBN=${isbn}`)
}

async function deleteBook(userId, isbn, token) {
  return api
    .delete('/BookStore/v1/Book')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      isbn
    })
}

module.exports = {
  createBook,
  updateBook,
  getBook,
  deleteBook
}
