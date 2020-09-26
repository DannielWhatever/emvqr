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
console.log('result', result);
//result 
[ 
  { 
    id: '00', 
    name: 'Payload Format Indicator', 
    len: 2, 
    data: '01' }, ...
```

## Contributors  

- 
- 


