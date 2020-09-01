import jwt, { decode } from 'jsonwebtoken';

export default class Token {
    private static semilla: string = 'semilla-seed,privacidadYPropia-YeiDJ';
    private static caducidad: string = '1h'; //Media hora 
    //1h = 1 hora: 1d = 1 día

    constructor(){}

    static getToken(payload: any): string{
        return jwt.sign({
            usuario: payload
        }, this.semilla, {expiresIn: this.caducidad});
    }

    static comprobarToken(userToken: string){

        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.semilla, (err, decode) => {
                if(err) {
                    reject();
                } else {
                    resolve(decode);
                }
            });
        });
    }

}