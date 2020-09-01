import { Router, Response, response } from "express";
import { verificarToken } from "../middelwares/autentificacion";
import { ImagenesYo } from "../modelos/imagenesYo";
import FileSystemYo from "../clases/fileSystemYo";
import fs from "fs";
import path from "path";

const yoRutas = Router();
const fileSystemYo = new FileSystemYo();

//Subir Imagenes
yoRutas.post('/uploadImg', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);

    ImagenesYo.create(body).then(imgYoDB => {
        res.json({
            ok: true,
            imgYoDB
        });

        fileSystemYo.guardarImagenYo(file, req.usuario.nombre);

    }).catch(err => {
        res.json(err)
    });
});

//Mostrar Imagen por URL
yoRutas.get('/Yeison/:img', (req: any, res: Response) =>{
    const img = req.params.img;
    const pathImagen = fileSystemYo.getImgUrl(img);
    res.sendFile(pathImagen);
});

//Actualizar Imagen
yoRutas.post('/update', verificarToken, (req: any, res:Response) => {
    const file = req.files.img;
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen Actualizada'
    });
});

//Borrar Imagen
yoRutas.delete('/:id/:name', verificarToken, (req: any, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;

    ImagenesYo.findByIdAndRemove(id, (err, imgBorrar) => {
        if(err) throw err;
        res.json({
            ok: true,
            mensaje: 'Imagen Eliminada',
            body: imgBorrar
        })
        fs.unlinkSync(path.resolve(__dirname, '../uploads', 'Yeison', name));
    });
})

export default yoRutas;