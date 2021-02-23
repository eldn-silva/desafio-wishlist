/**
 * @jest-environment node
 */
require('dotenv').config()
const request = require('supertest')
const server = require('../../server')
const nock = require('nock')

token = process.env.token

// testes rota de usuarios
describe("POST /users/cadastro", () => {
    it ("should return 201 to register user", async () => {
        const response = await request(server)
        .post("/users/cadastro")
        .send({ email: "exemplo2@gmail.com", senha: "12345" })
        
    expect(response.status).toBe(201)
    })
})

describe("POST /users/login", () => {
    it ("should return 200 to login user", async () => {
        const response = await request(server)
        .post("/users/login")
        .send({ email: "exemplo2@gmail.com", senha: "12345" })
        
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
    beforeEach((done) => {
        nock.disableNetConnect();
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/);
        nock.cleanAll();
        done();
    });

    afterEach((done) => {
        nock.cleanAll();
        done();
    })

    it ("should return 201", async () => {
        nock('http://challenge-api.luizalabs.com/api/product').get('/2b505fab-d865-e164-345d-efbd4c2045b6/')
            .reply(200, {
                "price": 6309.9, 
                "image": "http://challenge-api.luizalabs.com/images/2b505fab-d865-e164-345d-efbd4c2045b6.jpg", 
                "brand": "ibanez", 
                "id": "2b505fab-d865-e164-345d-efbd4c2045b6", 
                "title": "Guitarra Original Ibanez DN 520K"
        }
    );
        const response = await request(server)
            .post("/wishlist")
            .send({ id_produto: '2b505fab-d865-e164-345d-efbd4c2045b6', id_cliente: 1 })
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
        .send({ id_cliente: 1, id_produto: "6668a2df-257f-7dee-2215-0283a8244f9c"})
        .set('authorization', `bearer ${token}`)
        
    expect(response.status).toBe(202)
    })
})