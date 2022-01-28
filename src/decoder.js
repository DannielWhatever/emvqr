const { logger } = require('./utils/logger');
const models = require('./specifications/models');

const countries = require('./specifications/countries.json');
const currencies = require('./specifications/currencies.json');
const mcc_codes = require('./specifications/mcc_codes.json');

function decode(emvString, spec = 'data') {
    const emvObject = {};

    let inputText = emvString;
    while(inputText.length > 0){
        logger.debug('inputText', inputText);
        let { emvItem, remainingText } = _readNext(inputText, spec);

        if (spec === 'data') {
            emvItem = _addMetaData(emvItem);
        
        } 
        else if (spec == 'additionalFields') {
            emvItem = _addMetaDataForAdditionalFields(emvItem);
        }

        emvObject[emvItem.id] = emvItem;
        inputText = remainingText;
    }

    return emvObject;
}


function _readNext(inputText, spec) {
    console.log(inputText)
    const id = inputText.substring(0, 2);
    const strLen = inputText.substring(2, 4);
    console.log(strLen)
    const len = parseInt(strLen);
    if (isNaN(len)) {
        throw new Error(`Length definition expect a number. Incorrect length definition for value: ${inputText}.`);
    }
    const data = inputText.substring(4, len + 4);
    const emvItem = {
        id,
        name: _getName(spec, id),
        len,
        data,
        rawData: data,
    };
    const remainingText = inputText.substring(len + 4);
    return {
        emvItem,
        remainingText
    };
}

const fnGetName = {
    data: models.getName,
    subData: models.getNameSubData,
    additionalFields: models.getNameAdditionalFields,
    paymentSpecific: models.getNamePaymentSpecific,
};

function _getName(spec, id) {
    return (fnGetName[spec])(id);
}

function _addMetaData(emvItem) {
    if (emvItem.name == 'Merchant Account Information') {
        emvItem.data = decode(emvItem.data, 'subData');
    }
    if (emvItem.id == 52) {
        const mcc_code = mcc_codes.find(item => item['mcc'] === emvItem.data);
        mcc_code && (emvItem.data = `${emvItem.data} (${mcc_code.usda_description})`);
    }
    if (emvItem.id == 53) {
        const currency = currencies.find(item => item['number'] === emvItem.data);
        currency && (emvItem.data = `${emvItem.data} (${currency.code})`);
    }
    if(emvItem.id == 58){
        const country = countries.find(item => item['Code'] === emvItem.data);
        country && (emvItem.data = `${emvItem.data} (${country.Name})`);
    }
    return emvItem;
}

function _addMetaDataForAdditionalFields(emvItem) {
    if (emvItem.id == '60') {
        emvItem.data = decode(emvItem.data, 'paymentSpecific')
    }
    return emvItem;
}

module.exports = {
    decode
};