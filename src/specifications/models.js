
const dataObjectsSchema = require('./_schema.json');
const subDataObjectsSchema = require('./_schemaSubData.json');
const additionalFieldsObjectsSchema = require('./_schemaAdditionalFields.json');
const paymentSpecificObjectsSchema = require('./_schemaPaymentSpecific.json');

function getName(stringId) {
    let dataObject = dataObjectsSchema[stringId];
    if (!dataObject) {
        const id = parseInt(stringId);
        (id >= 2 && id <= 51) && (dataObject = dataObjectsSchema['02-51']);
        (id >= 65 && id <= 79) && (dataObject = dataObjectsSchema['65-79']);
        (id >= 80 && id <= 99) && (dataObject = dataObjectsSchema['80-99']);
    }
    return _getName(dataObject);
}

function getNameSubData(stringId) {
    let dataObject = subDataObjectsSchema[stringId];
    return _getName(dataObject);
}

function getNameAdditionalFields(stringId) {
    let dataObject = additionalFieldsObjectsSchema[stringId];
    if (!dataObject) {
        const id = parseInt(stringId);
        (id >= 10 && id <= 49) && (dataObject = additionalFieldsObjectsSchema['10-49']);
        (id >= 50 && id <= 99) && (dataObject = additionalFieldsObjectsSchema['50-99']);
    }
    return _getName(dataObject);
}

function getNamePaymentSpecific(stringId) {
    let dataObject = paymentSpecificObjectsSchema[stringId];
    if (!dataObject) {
        const id = parseInt(stringId);
        (id >= 1 && id <= 99) && (dataObject = paymentSpecificObjectsSchema['01-99']);
    }
    return _getName(dataObject);
}

function _getName(dataObject) {
    return dataObject ? dataObject.name : undefined;
}



module.exports = {
    getName,
    getNameSubData,
    getNameAdditionalFields,
    getNamePaymentSpecific,
};