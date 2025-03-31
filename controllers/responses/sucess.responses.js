//api-/controllers/responses/sucess.responses.js
export default (res, httpStatus, message, data, meta, count) => {
    return res.status(httpStatus).json({
        status: "SUCCESS",
        message: message,
        data: data,
        meta: meta,
        count: count,
    });
}