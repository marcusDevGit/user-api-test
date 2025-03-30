//api-/controllers/userController.js
import { Sequelize } from "sequelize";
import db from "../src/models/index.js"; // Importa o banco de dados
import e from "express";

const { Op } = Sequelize; // Importa os operadores do Sequelize
const { User } = db; // Desestrutura o modelo de usuário do banco de dados

class UserController {
    async index(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 20;
            const offset = req.query.offset ? parseInt(req.query.offset) : 0;
            let where = {};
            if (req.query.name) where.name = {
                [Op.like]: `%${req.query.name}%`,
            }
            if (req.query.email) where.email = q.query.email;

            const entity = await User.findAndCountAll({
                where,
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']],
            });

            return res.status(200).json({
                status: 200,
                message: "Lista de usuários",
                data: entity.rows,
                count: entity.count,
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({
                status: 500,
                message: "Erro ao buscar usuários",
                error: error.message,
            });
        }
    }
    async show(req, res, next) {
        try {
            const entity = await User.findByPk(req.params.id)
            return res.status(200).json({
                status: 200,
                message: "Usuário encontrado",
                data: entity,
            });

        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({
                status: 500,
                message: "Erro ao buscar usuários",
                error: error.message,
            });
        }
    }
    async create(req, res, next) {
        try {
            const entity = await User.create(req.body)
            return res.status(201).json({
                status: 201,
                message: "Usuário criado com sucesso",
                data: entity,
            });
        } catch (error) {
            if (error.name && error.name.includes("SequelizeValidationError")) {
                return res.status(404).json({
                    status: INVALID,
                    message: "Dados inválidos",
                    error: error.errors.map(e => {
                        return {
                            message: e.message,
                            field: e.path,
                            value: e.value,
                        }
                    }),
                });

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
            return res.status(201).json({
                status: 201,
                message: "Usuário atualizado com sucesso",
                data: entityNew,
            });
        } catch (error) {
            if (error.name && error.name.includes("SequelizeValidationError")) {
                return res.status(404).json({
                    status: INVALID,
                    message: "Dados inválidos",
                    error: error.errors.map(e => {
                        return {
                            message: e.message,
                            field: e.path,
                            value: e.value,
                        }
                    }),
                });

            }
            return res.status(500).json({
                status: 500,
                message: "Erro ao atualizar usuário",
                error: error.message,
            });
        }
    }
    async destroy(req, res, next) {
        try {
            const entityOld = await User.findByPk(req.params.id)
            if (!entityOld) {
                return res.status(404).json({
                    status: 404,
                    message: "Usuário não encontrado",
                });
            }
            const entity = await User.destroy({
                where: {
                    id: req.params.id,
                }
            })
            return res.status(200).json({
                status: 200,
                message: "Usuário deletado com sucesso",
                data: entity,
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({
                status: 500,
                message: "Erro ao buscar usuários",
                error: error.message,
            });
        }
    }
}

export default new UserController();