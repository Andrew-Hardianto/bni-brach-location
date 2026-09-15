import ErrorResponse from '../utils/errorResponse';

const notFound = (req, res, next) => {
  const error = new ErrorResponse(`Not Found - ${req.originalUrl}`, 404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  // console.log(err);

  // Sequelize Unique Constraint Error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Sequelize Validation Error
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(val => val.message).join(', ');
    error = new ErrorResponse(message, 400);
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Server Error'
  });
}

export {  notFound, errorHandler  };
