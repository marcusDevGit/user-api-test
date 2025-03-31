//api-/controllers/responses/invalid.responses.js
export default (res, httpStatus, message, error) => {
    return res.status(httpStatus).json({
        status: INVALID,
        message: message,
        error: error.errors.map(e => {
            return {
                message: e.message,
                field: e.path,
                value: e.value,
            }
        }),

    });
}