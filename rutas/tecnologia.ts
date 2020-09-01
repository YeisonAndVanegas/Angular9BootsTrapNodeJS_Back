import {Router, Response} from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { Tecnologias } from '../modelos/tecnologias';

const tecnologiasRutas = Router();

//Crear Tecnologia
tecnologiasRutas.post('/create', verificarToken, (req: any, res: Response) => {
    
    const body = req.body;

    Tecnologias.create(body).then(tecnologiasDB => {
        res.json({
            ok: true,
            mensaje: 'Información de Tecnologías creada',
            sobreMi: tecnologiasDB
        });
    }).catch(err => {
        res.json(err)
    });
});

//Obtener Tecnologia
tecnologiasRutas.get('/getTecno', async (req: any, res: Response) => {
    const tecnologias = await Tecnologias.find()
    .exec();

    res.json({
        ok: true,
        tecnologias
    });
    
});

//Actualizar Tecnologia
tecnologiasRutas.post('/updateTecno/:id', verificarToken, (req: any, res: Response) => {
    
    const id = req.params.id;

    const tecnologia = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    }

    Tecnologias.findByIdAndUpdate(id, tecnologia, {new: true}, (err, tecnologiaDB) =>{
        if(err) throw err;
        if(!tecnologiaDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalide Data'
            })
        }
        res.json({
            ok: true,
            mensaje: 'Se a actualizado la Información de la Tecnologia',
            tecnologia
        })
    })
});

export default tecnologiasRutas;