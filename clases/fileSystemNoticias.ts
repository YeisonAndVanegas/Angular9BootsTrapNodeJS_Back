import path from 'path';
import fs from 'fs';

export default class FileSystemNoticias {

    constructor() {}

    guardarImgNoti(file: any){
        return new Promise((resolve, reject) => {
            
            //crear carpeta
            const path = this.crearCarpetaImgNoti();

            //Nombre del archivo
            const nombreArchivo = file.name;

            //Mover el archivo
            file.mv(`${path}/${nombreArchivo}`,(err: any) => {
                if(err){
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    private crearCarpetaImgNoti(){
        const pathImgNoti = path.resolve(__dirname, '../uploads/ImgNoticia');
        const existe = fs.existsSync(pathImgNoti);

        if(!existe) {
            fs.mkdirSync(pathImgNoti);
        }

        return pathImgNoti;
    }

    getImgNotiUrl(img: string) {
        const pathImgNoti = path.resolve(__dirname, '../uploads', 'imgNoticia', img);
        return pathImgNoti;
    }

    guardarImgAutor(file: any){
        return new Promise((resolve, reject) => {
            
            //crear carpeta
            const path = this.crearCarpetaImgAutor();

            //Nombre del archivo
            const nombreArchivo = file.name;

            //Mover el archivo
            file.mv(`${path}/${nombreArchivo}`,(err: any) => {
                if(err){
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    private crearCarpetaImgAutor(){
        const pathImgAutor = path.resolve(__dirname, '../uploads/ImgAutor');
        const existe = fs.existsSync(pathImgAutor);

        if(!existe) {
            fs.mkdirSync(pathImgAutor);
        }

        return pathImgAutor;
    }

    getImgAutorUrl(imgAutor: string) {
        const pathImgAutor = path.resolve(__dirname, '../uploads', 'imgAutor', imgAutor);
        return pathImgAutor;
    }

}