var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp) => {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
        usuario: 'Fernando',
        mensaje: 'Hola Mundo'
    }, (resp) => {
        console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor:', mensaje);
});

//Escuchar cambios de usuarios entra o sale
socket.on('listaPersonas', (personas) => {
    console.log(personas);
});

//Mensajes Privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mernsaje Privado:', mensaje)
});