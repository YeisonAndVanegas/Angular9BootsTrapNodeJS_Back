import Server from "./clases/server";
import usuarioRutas from "./rutas/usuario";
import mongoose from "mongoose";
import cors from "cors";

import fileupload from 'express-fileupload';

import bodyParser from "body-parser";
import contactoRutas from "./rutas/contacto";
import yoRutas from "./rutas/imagenesYo";
import sobreMiRutas from "./rutas/sobreMi";
import tecnologiasRutas from "./rutas/tecnologia";
import noticiasRutas from "./rutas/noticias";


const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({origin: true, credentials: true}));

//fileupload
server.app.use(fileupload());

//Rutas
server.app.use('/usuario', usuarioRutas);
server.app.use('/contacto', contactoRutas);
server.app.use('/uploadYo', yoRutas);
server.app.use('/sobreMi', sobreMiRutas);
server.app.use('/tecnologia', tecnologiasRutas);
server.app.use('/noticias', noticiasRutas);

// Conectar Base de Datos
mongoose.connect(
    'mongodb://localhost:27017/YeiDJBase',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false },
    (err) => {
        if (err) throw "err";
        console.log('Base de datos ONLINE');
    }
)

//Levantar el servidor
server.start( () => {
    console.log(`Servidor YEI corriendo en el puerto ${server.port}`);
})