//api-/controllers/userController.js
import ResourseController from "./resource.controller.js"; // Importa o controlador de recursos
import db from "../src/models/index.js"
import sucessResponses from "./responses/sucess.responses.js";
import errorResponses from "./responses/error.responses.js";

const User = db.User


class UserController extends ResourseController {
    // Extende a classe ResourseController
    constructor() {
        super();
        this.setModel(User); // Define o modelo de usuário
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(req.body, email, password)
            const result = await User.verifyLogin(email, password);
            console.log(result)
            sucessResponses(res, 200, "Usuario autenticado com sucesso!", result)
        } catch (error) {
            console.log(error)
            errorResponses(res, 500, "Não foi possivel realizar o login!")
        }
    }
}

export default new UserController;