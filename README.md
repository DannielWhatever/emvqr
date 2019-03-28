# emvqr

[![Build Status](https://travis-ci.com/DannielWhatever/emvqr.svg?branch=master)](https://travis-ci.com/DannielWhatever/emvqr)

## how to use

```
const emvqr = require('emvqr');

const example = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';
const result = emvqr.decode(example);
console.log('result', result);
//result [ { id: '00', name: 'Payload Format Indicator', len: 2, data: '01' }, ...
```

---

## for personal use :mask:

##### toDo

- validate checksum

- valdiate mandatory items
- validate items, data

- model merchant category code , accord to ISO 18245
- model country code, accord to [ISO 3166-1 alpha 2]
- model transaction currency, accord to ISO 4217

