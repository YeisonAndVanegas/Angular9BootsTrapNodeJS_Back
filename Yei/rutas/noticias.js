"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middelwares/autentificacion");
const fileSystemNoticias_1 = __importDefault(require("../clases/fileSystemNoticias"));
const noticias_1 = require("../modelos/noticias");
const noticiasRutas = express_1.Router();
const fileSystemNoticias = new fileSystemNoticias_1.default();
//Subir Noticia
noticiasRutas.post('/uploadNoti/:img/:imgAutor', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const img = req.params.img;
    const imgAutor = req.params.imgAutor;
    body.img = img;
    body.imgAutor = imgAutor;
    noticias_1.Noticias.create(body).then(noticiaDB => {
        res.json({
            ok: true,
            mensaje: 'Noticia Creada Exitosamente',
            noticia: noticiaDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obtener Noticias Paginadas
noticiasRutas.get('/getNoti', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;
    const noticias = yield noticias_1.Noticias.find()
        .sort({ _id: -1 })
        .skip(saltar)
        .limit(8)
        .exec();
    res.json({
        ok: true,
        pagina,
        noticias
    });
}));
//Subir ImagenesAutor
noticiasRutas.post('/uploadImgAutor', autentificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file1 = req.files.imgAutor;
    yield fileSystemNoticias.guardarImgAutor(file1);
    res.json({
        ok: true,
        mensaje: 'Imagen Autor Cargada Exitosa',
        file1: file1.name
    });
}));
//Subir ImagenesNoticia
noticiasRutas.post('/uploadImgNoti', autentificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file2 = req.files.img;
    yield fileSystemNoticias.guardarImgNoti(file2);
    res.json({
        ok: true,
        mensaje: 'Imagen de Noticia Cargada Exitosa',
        file1: file2.name
    });
}));
//Mostrar Imagen Noticia por URL
noticiasRutas.get('/ImgNoticia/:img', (req, res) => {
    const imgNoti = req.params.img;
    const pathImagenNoti = fileSystemNoticias.getImgNotiUrl(imgNoti);
    res.sendFile(pathImagenNoti);
});
//Mostrar Imagen Autor por URL
noticiasRutas.get('/ImgAutor/:imgAutor', (req, res) => {
    const imgAutor = req.params.imgAutor;
    const pathImagenAutor = fileSystemNoticias.getImgAutorUrl(imgAutor);
    res.sendFile(pathImagenAutor);
});
exports.default = noticiasRutas;
