import errorResponses from "../../../controllers/responses/error.responses.js"


export default async (req, res, next) => {
    const userId = parseInt(req.params.id)

    if (userId !== req.body.user.id) {
        console.log(userId)
        return errorResponses(res, 400, "Você não tem permição de acesso para esse recurso!")
    }
    next()
}