const globalErrorHandler = (err, req, res, next) => {

    // Setting status code and error status if not set before
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    // If the error is operational, it means that if we introduced it
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Else, it means that it is a programmatical error
    else {
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Internal Server Error.',
            error: err
        });
    }
}

module.exports = globalErrorHandler;