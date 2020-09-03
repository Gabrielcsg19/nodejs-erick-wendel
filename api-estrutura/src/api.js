const Hapi = require('@hapi/hapi');
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const Joi = require('joi')
const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {

    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const mongodb = new Context(new MongoDB(connection, HeroiSchema))
    
    app.validator(Joi)
    app.route([
        ...mapRoutes(new HeroRoute(mongodb), HeroRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app;
}

module.exports = main()