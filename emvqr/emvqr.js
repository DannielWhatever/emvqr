const checksumUtils = require('./utils/checksumUtils');
const emvDecoder = require('./emvDecoder');


function decode(emvString) {
    return _decode(emvString, 'data');
}

function decodeSubData(emvString) {
    return _decode(emvString, 'subData');
}

function decodeAdditionalFields(emvString) {
    return _decode(emvString, 'additionalFields');
}

function decodePaymentSpecific(emvString) {
    return _decode(emvString, 'paymentSpecific');
}

function _decode(emvString, spec) {
    if(!checksumUtils.validateChecksum(emvString)){
        throw new Error('checksum validation failed.');
    };

    const emvObject = emvDecoder.decode(emvString, spec);

    return emvObject;
}

module.exports = {
    decode,
    decodeSubData,
    decodeAdditionalFields,
    decodePaymentSpecific,
};