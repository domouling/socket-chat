const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades'); 

const usuarios = new Usuarios();

io.on('connection', (client) => {
    
    client.on('entrarChat', (usuario, callback) => {

        console.log(usuario);

        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                msg: 'El nombre ó sala es necesario'
            });
        }

        client.join(usuario.sala);

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        
        return callback(personas);
    
    });


    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.msg);

        client.broadcast.emit('crearMensaje', mensaje);
    });


    client.on('disconnect', () => {
        let personaDesconect = usuarios.deletePersona(client.id);

        client.broadcast.emit('crearMensaje', crearMensaje('Admin', `${personaDesconect.nombre} salio...`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });


    //Mensajes Privados
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
    
    //Comentarios borrador
    // console.log('Usuario conectado');
    
    /* client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    }); */

});