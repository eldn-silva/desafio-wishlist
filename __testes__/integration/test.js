require('dotenv').config()
const request = require('supertest');
const app = require('../../app');
const server = require('../../server');

// testes rota de usuarios
describe("POST /users/cadastro", () => {
    it ("should return 201 to register user", async () => {
        const response = await request(server)
        .post("/users/cadastro")
        .send({ email: "exemplo3@gmail.com", senha: "12345" })
        
    expect(response.status).toBe(201)
    })
})

describe("POST /users/login", () => {
    it ("should return 200 to login user", async () => {
        const response = await request(server)
        .post("/users/login")
        .send({ email: "exemplo1@gmail.com", senha: "12345" })
        
    expect(response.status).toBe(200)
    })
})

//testes rota de clientes
describe("GET /clientes", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .set('authorization', `bearer ${user.token}`)
        .get("/clientes")
        
    expect(response.status).toBe(200)
    })
})

describe("POST /clientes", () => {
    it ("should return 201", async () => {
        const response = await request(server)
        .post("/clientes")
        .send({ nome: "antonio", email: "antonio2@gmail.com" })
        
    expect(response.status).toBe(201)
    })
})

describe("GET /clientes/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .get("/clientes/1")
        
    expect(response.status).toBe(200)
    })
})

describe("PATCH /clientes/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .patch("/clientes/1")
        .send({ nome: "geraldo", email: "geraldo1@gmail.com" })
        
    expect(response.status).toBe(202)
    })
})

describe("DELETE /clientes/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .delete("/clientes/2")
        
    expect(response.status).toBe(202)
    })
})

//testes rota wishlist

describe("POST /wishlist", () => {
    it ("should return 201", async () => {
        const response = await request(server)
        .post("/wishlist")
        .send({ id_produto: "1643bc32-20cd-9156-715f-c7fdbf798a01", id_cliente: 7 })
    expect(response.status).toBe(201)
    })
})

describe("GET /wishlist/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .get("/wishlist/1")
        
    expect(response.status).toBe(200)
    })
})

describe("GET /wishlist/:id/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .get("/wishlist/3/1")
        
    expect(response.status).toBe(200)
    })
})

describe("DELETE /wishlist/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .delete("/wishlist")
        .send({ id_cliente: 1, id_produto: "5ef1a6f1-012c-95d1-642c-2779a7eb9e4a"})
        
    expect(response.status).toBe(202)
    })
})
