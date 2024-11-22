function errorHandler(error, req, res, next) {
    const message = `${req.method} ${req.url} - NOT FOUND` + (error.message || "API ERROR")
    const statusCode = error.statusCode || 500
    return res.statusCode(statusCode).json({message})
}

export default errorHandler