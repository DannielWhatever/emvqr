# emvqr

[![Build Status](https://travis-ci.com/DannielWhatever/emvqr.svg?branch=master)](https://travis-ci.com/DannielWhatever/emvqr)

Javascript library to parse EMV QR codes.
This project intend to help in your work with the EMV specification for digital payments.

## How to Use

### First install in your project. 

```
npm install -S emvqr
```


### Then, import the library 

```javascript
const emvqr = require('emvqr');
```

### Obtain your emvqr string 

*This is out of the scope of this library.*
For example, you could use a QR scanner lib in your front end and send the result to your backend.
Or if you need test your functionallity, just use a dummy string, like in our example.

```javascript
const example = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';
```

### And finally, decode it!  

```javascript
const result = emvqr.decode(example);
cconsole.log(result);
```

*Result:*


```javascript
{
  '29': {
    id: '29',
    name: 'Merchant Account Information',
    len: 30,
    data: { '00': [Object], '05': [Object] }
  },
  '31': {
    id: '31',
    name: 'Merchant Account Information',
    len: 28,
    data: { '00': [Object], '03': [Object] }
  },
  '52': {
    id: '52',
    name: 'Merchant Category Code',
    len: 4,
    data: '4111 (Local/Suburban Commuter Passenger Transportation – Railroads, Feries, Local Water Transportation.)'
  },
  '53': { id: '53', name: 'Transaction Currency', len: 3, data: '156 (CNY)' },
  '54': { id: '54', name: 'Transaction Amount', len: 5, data: '23.72' },
  '55': {
    id: '55',
    name: 'Tip or Convenience Indicator',
    len: 2,
    data: '01'
  },
  '58': { id: '58', name: 'Country Code', len: 2, data: 'CN (China)' },
  '59': { id: '59', name: 'Merchant Name', len: 14, data: 'BEST TRANSPORT' },
  '60': { id: '60', name: 'Merchant City', len: 7, data: 'BEIJING' },
  '62': {
    id: '62',
    name: 'Additional Data Field Template',
    len: 33,
    data: { '03': [Object], '06': [Object], '07': [Object], '09': [Object] }
  },
  '63': { id: '63', name: 'CRC', len: 4, data: 'A13A' },
  '64': {
    id: '64',
    name: 'Merchant Information— Language Template',
    len: 20,
    data: '0002ZH0104最佳运输0202北京'
  },
  '91': {
    id: '91',
    name: 'Unreserved Templates',
    len: 32,
    data: '0016A011223344998877070812345678'
  },
  '00': { id: '00', name: 'Payload Format Indicator', len: 2, data: '01' },
  '01': { id: '01', name: 'Point of Initiation Method', len: 2, data: '12' }
}
```

## Contributors  

- [@gandol](https://github.com/gandol)
- [@dannielwhatever](https://github.com/dannielwhatever)


