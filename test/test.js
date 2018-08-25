const test = require('tape');
const { env } = require('..');

test('test', t => {
  t.plan(3);

  const pambda = env({
    json: {
      path: __dirname + '/env.json',
    },
  }, {
    JSON_FOO: true,
  });

  const lambda = pambda((event, context, callback) => {
    const { env } = process;

    t.equal(env.JSON_FOO, 'foo');

    callback(null, 123);
  });

  lambda({}, {}, (err, result) => {
    t.error(err);
    t.equal(result, 123);
  });
});

test('test error handling', t => {
  t.plan(1);

  const pambda = env({
    json: {
      path: __dirname + '/env.json',
    },
  }, {
    JSON_FOO: true,
    JSON_BAR: true,
  });

  const lambda = pambda((event, context, callback) => {
    t.fail();
  });

  lambda({}, {}, (err, result) => {
    t.ok(err instanceof Error);
  });
});
