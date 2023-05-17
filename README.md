[![NPM](https://nodei.co/npm/lottie-tiny.png)](https://nodei.co/npm/lottie-tiny/)

# lottie tiny

## Install

```bash
# use pngquant
npx lottie-tiny input.json output.json

# use tinypng
npx lottie-tiny input.json output.json -t "tinypng"
```

## Usage

```js
import lottieTiny from 'lottie-tiny';

(async () => {
  // tinypng
  const out = await lottieTiny(data);

  // pngquant
  const out = await lottieTiny(data, {
    type: 'tinypng',
  });
  console.log(out);
})();
```

## Options

- `lottieJson` Lottie file json data, Support the json data and string.
- `options` not support.
