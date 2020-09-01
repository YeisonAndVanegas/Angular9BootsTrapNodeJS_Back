import {Schema, model, Document} from 'mongoose';

const noticiasSchema = new Schema({
    created: {
        type: Date
    },
    titulo: {
        type: String
    },
    subtitulo: {
        type: String
    },
    autor: {
        type: String
    },
    img: {
        type: String
    },
    imgAutor: {
        type: String
    },
    texto1: {
        type: String
    },
    texto2: {
        type: String
    },
    texto3: {
        type: String
    },
    texto4: {
        type: String
    },
    texto5: {
        type: String
    }

});

noticiasSchema.pre<INoticias>('save', function (next) {
    this.created = new Date();
    next();
});

interface INoticias extends Document {
    created: Date;
    titulo: String;
    subtitulo: String;
    autor: String;
    img: String;
    imgAutor: String;
    texto1: String;
    texto2: String;
    texto3: String;
    texto4: String;
    texto5: String;
    
}

export const Noticias = model<INoticias>('Noticias', noticiasSchema)