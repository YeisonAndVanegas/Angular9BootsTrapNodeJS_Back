import {Router, Response} from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { SobreMi } from '../modelos/sobreMi';

const sobreMiRutas = Router();

//Crear SobreMi
sobreMiRutas.post('/', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    body.titulo = 'Yeison Andrés Vanegas'

    SobreMi.create(body).then(sobreMiDB => {
        res.json({
            ok: true,
            mensaje: 'Información Sobre Mi Cargada',
            sobreMi: sobreMiDB
        });
    }).catch(err => {
        res.json(err)
    });
});

//Actualizar sobre Mi
sobreMiRutas.post('/updateSobreMi/:id', verificarToken, (req: any, res: Response) => {
    
    const id = req.params.id;

    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5 : req.body.texto5,
    }

    SobreMi.findByIdAndUpdate(id, sobreMi, {new: true}, (err, sobreMiDB) =>{
        if(err) throw err;
        if(!sobreMiDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalide Data'
            })
        }
        res.json({
            ok: true,
            mensaje: 'Se a actualizado la Información',
            sobreMi
        })
    })
});

//Obtener SobreMi
sobreMiRutas.get('/getSobreMi', async (req: any, res: Response) => {
    const sobreMi = await SobreMi.find()
    .sort({_id: -1})
    .exec();

    res.json({
        ok: true,
        sobreMi
    });
    
});

export default sobreMiRutas;