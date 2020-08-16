const { envSrc } = require('env-src');
const { checkenv } = require('lambda-checkenv');
const { wait } = require('task-waiter');
const { callbackify } = require('lambda-callbackify');

exports.env = (srcOptions, checkOptions) => {
  const then = wait(callback => {
    envSrc(srcOptions)
      .then(() => {
        if (!checkOptions) {
          return callback(null);
        }

        try {
          checkenv(checkOptions);
        } catch (err) {
          return callback(err);
        }

        callback(null);
      })
      .catch(callback);
  });

  return next => {
    next = callbackify(next);

    return (event, context, callback) => then(err => {
      if (err) {
        return callback(err);
      }

      next(event, context, callback);
    });
  };
};
