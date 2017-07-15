# babel-plugin-react-bootstrap

[![Build Status](https://travis-ci.org/ariesjia/babel-plugin-react-bootstrap.svg?branch=master)](https://travis-ci.org/ariesjia/babel-plugin-react-bootstrap)

## Install

```shell
$ npm i --save-dev babel-plugin-react-bootstrap
```

## Example

Transforms

```js
import { Button } from 'react-bootstrap';
```

roughly to

```js
import Button from 'react-bootstrap/lib/Button';
```

## Usage

### .babelrc

```json
{
  "plugins": ["react-bootstrap"],
  "presets": ["es2015"]
}
```

## Thanks

Heavily inspired by [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)
and [babel-plugin-date-fns](https://github.com/date-fns/babel-plugin-date-fns).