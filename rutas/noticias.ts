import { Router, Response, response } from "express";
import { verificarToken } from "../middelwares/autentificacion";
import FileSystemNoticias from "../clases/fileSystemNoticias";
import { Noticias } from "../modelos/noticias";

const noticiasRutas = Router();
const fileSystemNoticias = new FileSystemNoticias();

//Subir Noticia
noticiasRutas.post('/uploadNoti/:img/:imgAutor', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    const img = req.params.img;
    const imgAutor = req.params.imgAutor;

    body.img = img;
    body.imgAutor = imgAutor;

    Noticias.create(body).then(noticiaDB => {
        res.json({
            ok: true,
            mensaje: 'Noticia Creada Exitosamente',
            noticia: noticiaDB
        });

    }).catch(err => {
        res.json(err)
    });
});

//Obtener Noticias Paginadas
noticiasRutas.get('/getNoti', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina -1;
    saltar = saltar*8;

    const noticias = await Noticias.find()
        .sort({_id: -1})
        .skip(saltar)
        .limit(8)
        .exec();

    res.json({
        ok: true,
        pagina,
        noticias
    });
    
});

//Subir ImagenesAutor
noticiasRutas.post('/uploadImgAutor', verificarToken, async(req: any, res: Response) => {

    const file1 = req.files.imgAutor;
    await fileSystemNoticias.guardarImgAutor(file1);

    res.json({
        ok: true,
        mensaje: 'Imagen Autor Cargada Exitosa',
        file1: file1.name
    });

});

//Subir ImagenesNoticia
noticiasRutas.post('/uploadImgNoti', verificarToken, async(req: any, res: Response) => {

    const file2 = req.files.img;
    await fileSystemNoticias.guardarImgNoti(file2);

    res.json({
        ok: true,
        mensaje: 'Imagen de Noticia Cargada Exitosa',
        file1: file2.name
    });

});

//Mostrar Imagen Noticia por URL
noticiasRutas.get('/ImgNoticia/:img', (req: any, res: Response) =>{
    const imgNoti = req.params.img;
    const pathImagenNoti = fileSystemNoticias.getImgNotiUrl(imgNoti);
    res.sendFile(pathImagenNoti);
});

//Mostrar Imagen Autor por URL
noticiasRutas.get('/ImgAutor/:imgAutor', (req: any, res: Response) =>{
    const imgAutor = req.params.imgAutor;
    const pathImagenAutor = fileSystemNoticias.getImgAutorUrl(imgAutor);
    res.sendFile(pathImagenAutor);
});

export default noticiasRutas;