import {Router, Response} from 'express';
import { Contacto } from '../modelos/contacto';
import { decode } from 'jsonwebtoken';

const contactoRutas = Router();

//Crear Mensajes
contactoRutas.post('/newContact', (req: any, res: Response) => {

    const body = req.body;
    Contacto.create(body).then(contactoDB => {
        res.json({
            ok: true,
            contacto: contactoDB
        });
    }).catch(err => {
        res.json(err)
    });
});

//Borrar Mensajes
contactoRutas.delete('/deletedContact/:id', (req: any, res: Response) => {
    const id = req.params.id;

    Contacto.findByIdAndRemove(id, (err, contactoBorrar) =>{
        if(err) throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje Eliminado',
            body: contactoBorrar
        })
    });
});

//Obtener Mensaje
contactoRutas.get('/getSms', async (req: any, res: Response) => {
    const mensajes = await Contacto.find()
    .sort({_id: -1})
    .limit(50)
    .exec();

    res.json({
        ok: true,
        mensajes
    });
    
});

export default contactoRutas;