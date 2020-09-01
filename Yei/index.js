"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const contacto_1 = __importDefault(require("./rutas/contacto"));
const imagenesYo_1 = __importDefault(require("./rutas/imagenesYo"));
const sobreMi_1 = __importDefault(require("./rutas/sobreMi"));
const tecnologia_1 = __importDefault(require("./rutas/tecnologia"));
const noticias_1 = __importDefault(require("./rutas/noticias"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//fileupload
server.app.use(express_fileupload_1.default());
//Rutas
server.app.use('/usuario', usuario_1.default);
server.app.use('/contacto', contacto_1.default);
server.app.use('/uploadYo', imagenesYo_1.default);
server.app.use('/sobreMi', sobreMi_1.default);
server.app.use('/tecnologia', tecnologia_1.default);
server.app.use('/noticias', noticias_1.default);
// Conectar Base de Datos
mongoose_1.default.connect('mongodb://localhost:27017/YeiDJBase', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err)
        throw "err";
    console.log('Base de datos ONLINE');
});
//Levantar el servidor
server.start(() => {
    console.log(`Servidor YEI corriendo en el puerto ${server.port}`);
});
