const EventEmitter = require('events');
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function(click) {
    console.log('Um usuário clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(function () {
//     meuEmissor.emit(nomeEvento, 'no ok'+ (count++))
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', function (value) {
    console.log(`Você digitou: ${value.toString().trim()}`)
})