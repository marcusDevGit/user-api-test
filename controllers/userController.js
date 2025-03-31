//api-/controllers/userController.js
import ResourseController from "./resource.controller.js"; // Importa o controlador de recursos
import db from "../src/models/index.js"

const User = db.User


class UserController extends ResourseController {
    // Extende a classe ResourseController
    constructor() {
        super();
        this.setModel(User); // Define o modelo de usuário
    }
}

export default new UserController;