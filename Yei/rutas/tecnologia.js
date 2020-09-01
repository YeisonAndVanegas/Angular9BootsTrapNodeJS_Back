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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middelwares/autentificacion");
const tecnologias_1 = require("../modelos/tecnologias");
const tecnologiasRutas = express_1.Router();
//Crear Tecnologia
tecnologiasRutas.post('/create', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    tecnologias_1.Tecnologias.create(body).then(tecnologiasDB => {
        res.json({
            ok: true,
            mensaje: 'Información de Tecnologías creada',
            sobreMi: tecnologiasDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obtener Tecnologia
tecnologiasRutas.get('/getTecno', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tecnologias = yield tecnologias_1.Tecnologias.find()
        .exec();
    res.json({
        ok: true,
        tecnologias
    });
}));
//Actualizar Tecnologia
tecnologiasRutas.post('/updateTecno/:id', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const tecnologia = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    };
    tecnologias_1.Tecnologias.findByIdAndUpdate(id, tecnologia, { new: true }, (err, tecnologiaDB) => {
        if (err)
            throw err;
        if (!tecnologiaDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalide Data'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Se a actualizado la Información de la Tecnologia',
            tecnologia
        });
    });
});
exports.default = tecnologiasRutas;
