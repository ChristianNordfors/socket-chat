const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios.js')
const { crearMensaje } = require('../utilidades/utilidades.js');

const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        //console.log(data);

        if ( !data.nombre || !data.nombre ){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        // Se obitene el id del objeto client io.on('connection', (client) => {
        let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala );

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió al chat`))

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    // la 'data' contiene toda la informacion
    // el id de quien lo esta enviendo, etc
    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje );

        callback(mensaje);
    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } abandonó el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona( client.id );
        client.to(data.para).emit('mensajePrivado', crearMensaje(  persona.nombre, data.mensaje ) );

    });

});
