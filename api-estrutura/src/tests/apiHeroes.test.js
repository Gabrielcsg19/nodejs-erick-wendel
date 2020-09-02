const assert = require('assert')
const api = require('./../api')

let app = {}
describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('listar /herois - deve retornar somente 1 registros', async () => {
        const TAMANHO_LIMITE = 1
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })


        const dados = JSON.parse(result.payload)

        const statusCode = result.statusCode
        console.log('dados', dados.length)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('listar /herois - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'adasd'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const statusCode = result.statusCode

        assert.deepEqual(result.payload, 'Erro interno no servidor')
    })
    it('listar /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000
        const NAME = 'Teste-1599005798271'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })
})