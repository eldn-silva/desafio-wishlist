require('dotenv').config()
const request = require('supertest')
const server = require('../../server')

token = process.env.token

// testes rota de usuarios
describe("POST /users/cadastro", () => {
    it ("should return 201 to register user", async () => {
        const response = await request(server)
        .post("/users/cadastro")
        .send({ email: "exemplo1@gmail.com", senha: "12345" })
        
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
        .get("/clientes")
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(200)
    })
})

describe("POST /clientes", () => {
    it ("should return 201", async () => {
        const response = await request(server)
        .post("/clientes")
        .send({ nome: "exemplo2", email: "exemplo2@gmail.com" })
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(201)
    })
})

describe("GET /clientes/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .get("/clientes/1")
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(200)
    })
})

describe("PATCH /clientes/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .patch("/clientes/1")
        .send({ nome: "exemplo3", email: "exemplo3@gmail.com" })
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(202)
    })
})

describe("DELETE /clientes/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .delete("/clientes/2")
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(202)
    })
})

//testes rota wishlist

describe("POST /wishlist", () => {
    it ("should return 201", async () => {
        const response = await request(server)
        .post("/wishlist")
        .send({ id_produto: '1bf0f365-fbdd-4e21-9786-da459d78dd1f', id_cliente: 1 })
        .set('authorization', `bearer ${token}`)

    expect(response.status).toBe(201)
    })
})

describe("GET /wishlist/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .get("/wishlist/1")
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(200)
    })
})

describe("GET /wishlist/:id/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .get("/wishlist/1/1")
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(200)
    })
})

describe("DELETE /wishlist/:id", () => {
    it ("should return 200", async () => {
        const response = await request(server)
        .delete("/wishlist")
        .send({ id_cliente: 1, id_produto: "6d548487-4235-8512-8a5a-d9c813c8d05a"})
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(202)
    })
})
