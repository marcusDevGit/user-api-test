//api-/controllers/resource.controller.js
import sucessResponses from "./responses/sucess.responses.js";
import invalidResponses from "./responses/invalid.responses.js";
import errorResponses from "./responses/error.responses.js";


class ResourseController {
    constructor() {
        this.model = null; // Inicializa o modelo como nulo
    }
    setModel(model) {
        this.model = model; // Define o modelo a ser usado
    }

    bindMethod(method) {
        return this[method].bind(this); // Retorna o método vinculado ao contexto atual
    }

    async index(req, res, next) {
        try {
            const { entity, meta } = await this.model.search(req.query)
            return sucessResponses(res, 200, "Lista de usuários", entity, meta);
        } catch (error) {
            console.log(error)
            return errorResponses(res, 500, "Erro ao buscar usuários", error.message);
        }
    }
    async show(req, res, next) {
        try {
            const entity = await this.model.getId(req.params.id)
            return sucessResponses(res, 200, "Usuário encontrado", entity);

        } catch (error) {
            return errorResponses(res, 500, `Erro ao buscar usuário ${this.model.getTableName()}`, error.message);
        }
    }
    async create(req, res, next) {
        try {
            const entity = await this.model.create(req.body)
            return sucessResponses(res, 201, `Usuário criado com sucesso ${this.model.getTableName()}`, entity);
        } catch (error) {
            if (error.name && error.name.includes("SequelizeValidationError")) {
                return invalidResponses(res, 404, "Dados inválidos ", error);

            }
            return errorResponses(res, 500, `Erro ao atualizar usuário ${this.model.getTableName()}`, error.message);
        }
    }
    async update(req, res, next) {
        try {
            const entityOld = await this.model.findByPk(req.params.id)
            const entityNew = await entityOld.update(req.body)
            return sucessResponses(res, 200, `Usuário atualizado com sucesso ${this.model.getTableName()}`, entityNew);
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
            return errorResponses(res, 500, `Erro ao atualizar usuário ${this.model.getTableName()}`, error.message);
        }
    }
    async destroy(req, res, next) {
        try {
            const entityOld = await this.model.findByPk(req.params.id)
            if (!entityOld) {
                return errorResponses(res, 404, `Usuário não encontrado ${this.model.getTableName()}`, error.message);
            }
            const entity = await this.model.destroy({
                where: {
                    id: req.params.id,
                }
            })
            return sucessResponses(res, 200, `Usuário deletado com sucesso ${this.model.getTableName()}`, entityOld);
        } catch (error) {
            return errorResponses(res, 500, `Erro ao deletar usuário ${this.model.getTableName()}`, error.message);
        }
    }
}

export default ResourseController;