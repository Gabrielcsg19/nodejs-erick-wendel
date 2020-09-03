const assert = require('assert')
const api = require('./../api')


const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta biônica'
}
let app = {}
describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar GET = /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('listar GET = /herois - deve retornar somente 1 registros', async () => {
        const TAMANHO_LIMITE = 1
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })


        const dados = JSON.parse(result.payload)

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('listar GET = /herois - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'adasd'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"limit\" must be a number",
            "validation": {
                "source": "query", "keys": ["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })
    it('listar GET = /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000
        const NAME = 'Mulher Maravilha'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })

    it('cadastrar POST = /herois', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_CADASTRAR
        })

        const statusCode = result.statusCode
        const {message} = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })
})