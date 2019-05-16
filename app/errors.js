const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(`Database Error: ${message}`, exports.DATABASE_ERROR);

exports.NOT_FOUND = 'not_found';
exports.notFound = internalError('Resource not found', exports.NOT_FOUND);
