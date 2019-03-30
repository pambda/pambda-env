# pambda-env

Configure environment varibles.

## Installation

```
npm i pambda-env
```

## Usage

``` javascript
const { compose, createLambda } = require('pambda');
const { env } = require('pambda-env');

exports.handler = createLambda(
  compose(
    env({
      ssm: {
        path: '/my-app',
        withDecryption: true,
      },
    }, {
      DATABASE_URL: true,
    }),
  )
);

```

## env(srcOptions, checkOptions)

- `srcOptions`
  - Options that is passed to [envSrc()](https://github.com/nak2k/node-env-src#envsrcoptions-callback).
- `checkOptions`
  - Options that is passed to [checkenv()](https://github.com/nak2k/node-lambda-checkenv).
  - If this arg is omitted, do nothing.

## License

MIT
