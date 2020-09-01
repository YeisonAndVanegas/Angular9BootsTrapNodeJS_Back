"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNoticias {
    constructor() { }
    guardarImgNoti(file) {
        return new Promise((resolve, reject) => {
            //crear carpeta
            const path = this.crearCarpetaImgNoti();
            //Nombre del archivo
            const nombreArchivo = file.name;
            //Mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaImgNoti() {
        const pathImgNoti = path_1.default.resolve(__dirname, '../uploads/ImgNoticia');
        const existe = fs_1.default.existsSync(pathImgNoti);
        if (!existe) {
            fs_1.default.mkdirSync(pathImgNoti);
        }
        return pathImgNoti;
    }
    getImgNotiUrl(img) {
        const pathImgNoti = path_1.default.resolve(__dirname, '../uploads', 'imgNoticia', img);
        return pathImgNoti;
    }
    guardarImgAutor(file) {
        return new Promise((resolve, reject) => {
            //crear carpeta
            const path = this.crearCarpetaImgAutor();
            //Nombre del archivo
            const nombreArchivo = file.name;
            //Mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaImgAutor() {
        const pathImgAutor = path_1.default.resolve(__dirname, '../uploads/ImgAutor');
        const existe = fs_1.default.existsSync(pathImgAutor);
        if (!existe) {
            fs_1.default.mkdirSync(pathImgAutor);
        }
        return pathImgAutor;
    }
    getImgAutorUrl(imgAutor) {
        const pathImgAutor = path_1.default.resolve(__dirname, '../uploads', 'imgAutor', imgAutor);
        return pathImgAutor;
    }
}
exports.default = FileSystemNoticias;
