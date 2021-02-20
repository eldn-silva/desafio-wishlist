const request = require('supertest');
const server = require('../../server');

describe("POST /users/cadastro", () => {
    it ("should return 201 to register user", async () => {
        const response = await request(server)
        .post("/users/cadastro")
        .send({ email: "elder@gmail.com", senha: "12345" })
        
    expect(response.status).toBe(201)
    })
})

describe("POST /users/login", () => {
    it ("should return 200 to login user", async () => {
        const response = await request(server)
        .post("/users/login")
        .send({ email: "elder@gmail.com", senha: "12345" })
        
    expect(response.status).toBe(200)
    })
})