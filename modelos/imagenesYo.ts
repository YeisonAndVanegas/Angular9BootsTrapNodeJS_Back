import {Schema, model, Document} from 'mongoose';

const imagenesYoSchema = new Schema({
    img: {
        type: String,
        unique: true
    },

});

interface IImagenesYo extends Document {
    img: String;
}

export const ImagenesYo = model<IImagenesYo>('ImagenesYo', imagenesYoSchema)