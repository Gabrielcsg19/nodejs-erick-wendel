const Mongoose = require('mongoose')

Mongoose.connect('mongodb://127.0.0.1:27017/herois', {useNewUrlParser: true, useUnifiedTopology: true}, function(error) {
    if(!error) {    
        return;
    }
    console.log('Falha na conexão', error)
})

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando!!'))
setTimeout(() => {
    const state = connection.readyState
    console.log('state', state)
}, 1000)

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('itens', listItens)
}

main()