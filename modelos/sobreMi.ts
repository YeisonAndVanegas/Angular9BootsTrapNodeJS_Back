import {Schema, model, Document} from 'mongoose';

const sobreMiSchema = new Schema({

    titulo: {
        type: String
    },
    texto1: {
        type: String,
    },
    texto2: {
        type: String,
    },
    texto3: {
        type: String,
    },
    texto4: {
        type: String,
    },
    texto5: {
        type: String,
    }

});

interface ISobreMi extends Document {
    titulo: String;
    text1: String;
    text2: String;
    text3: String;
    text4: String;
    text5: String;
}

export const SobreMi = model<ISobreMi>('SobreMi', sobreMiSchema)