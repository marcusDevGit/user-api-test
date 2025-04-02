//api-/src/routes/midlleware/verifyAcessToken
import db from '../../models/index.js';
import errorResponse from '../../../controllers/responses/error.responses.js';


const User = db.User

export default async (req, res, next) => {
    console.log('Middleware de validação executado, 2');
    try {
        if (!req.headers['x-access-token']) {
            console.log('Token no cabeçalho:', req.headers['x-access-token']);
            return errorResponse(res, 400, 'O header [x-access-token] deve ser informado, !req');
        }

        const token = req.headers['x-access-token'];
        if (!token) {
            console.log("token recebido 2:", token);
            return errorResponse(res, 400, 'O header [x-access-token] deve ser informado, !token');

        }

        req.body.token = await User.verifyToken(token);
        console.log('Token decodificado:', req.body.token);

        req.body.userId = parseInt(req.body.token.id)
        console.log('Token verificado:', req.body.token);

        req.body.user = await User.findByPk(req.body.userId)


        if (!req.body.user) {
            return errorResponse(res, 400, 'Usuario não encontrado!')
        }
        next()
    } catch (error) {
        return errorResponse(res, 400, 'Não foi possivel validar o token de acesso', error);

    }
}