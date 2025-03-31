//api-/controllers/userController.js
import { Sequelize } from "sequelize";
import db from "../src/models/index.js"; // Importa o banco de dados
import sucessResponses from "./responses/sucess.responses.js";
import invalidResponses from "./responses/invalid.responses.js";
import errorResponses from "./responses/error.responses.js";

const { Op } = Sequelize; // Importa os operadores do Sequelize
const { User } = db; // Desestrutura o modelo de usuário do banco de dados


class UserController {
    async index(req, res, next) {
        try {
            const { entity, meta } = await User.seach(req.query)
            return sucessResponses(res, 200, "Lista de usuários", entity, meta);
        } catch (error) {
            console.log(error)
            return errorResponses(res, 500, "Erro ao buscar usuários", error.message);
        }
    }
    async show(req, res, next) {
        try {
            const entity = await User.getId(req.params.id)
            return sucessResponses(res, 200, "Usuário encontrado", entity);

        } catch (error) {
            return errorResponses(res, 500, "Erro ao buscar usuário", error.message);
        }
    }
    async create(req, res, next) {
        try {
            const entity = await User.create(req.body)
            return sucessResponses(res, 201, "Usuário criado com sucesso", entity);
        } catch (error) {
            if (error.name && error.name.includes("SequelizeValidationError")) {
                return invalidResponses(res, 404, "Dados inválidos", error);

            }
            return res.status(500).json({
                status: 500,
                message: "Erro ao atualizar usuário",
                error: error.message,
            });
        }
    }
    async update(req, res, next) {
        try {
            const entityOld = await User.findByPk(req.params.id)
            const entityNew = await entityOld.update(req.body)
            return sucessResponses(res, 200, "Usuário atualizado com sucesso", entityNew);
        } catch (error) {
            if (error.name && error.name.includes("SequelizeValidationError")) {
                return invalidResponses(res, 404, "Dados inválidos", error({
                    errors: error.errors.map(e => {
                        return {
                            message: e.message,
                            field: e.path,
                            value: e.value,
                        }
                    }),
                }));

            }
            return errorResponses(res, 500, "Erro ao atualizar usuário", error.message);
        }
    }
    async destroy(req, res, next) {
        try {
            const entityOld = await User.findByPk(req.params.id)
            if (!entityOld) {
                return errorResponses(res, 404, "Usuário não encontrado", error.message);
            }
            const entity = await User.destroy({
                where: {
                    id: req.params.id,
                }
            })
            return sucessResponses(res, 200, "Usuário deletado com sucesso", entityOld);
        } catch (error) {
            return errorResponses(res, 500, "Erro ao deletar usuário", error.message);
        }
    }
}

export default new UserController();