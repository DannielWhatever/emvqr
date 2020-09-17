
const dataObjectsSchema = {
    '00': {
        name: 'Payload Format Indicator',
        presence: 'M',
    },
    '01': {
        name: 'Point of Initiation Method',
        presence: 'O',
    },
    '02-51': {
        name: 'Merchant Account Information',
        presence: 'M',
    },
    '52': {
        name: 'Merchant Category Code',
        presence: 'M',
    },
    '53': {
        name: 'Transaction Currency',
        presence: 'M',
    },
    '54': {
        name: 'Transaction Amount',
        presence: 'C',
    },
    '55': {
        name: 'Tip or Convenience Indicator',
        presence: 'O',
    },
    '56': {
        name: 'Value of Convenience Fee Fixed',
        presence: 'C',
    },
    '57': {
        name: 'Value of Convenience Fee Percentage',
        presence: 'C',
    },
    '58': {
        name: 'Country Code',
        presence: 'M',
    },
    '59': {
        name: 'Merchant Name',
        presence: 'M',
    },
    '60': {
        name: 'Merchant City',
        presence: 'M',
    },
    '61': {
        name: 'Postal Code',
        presence: 'O',
    },
    '62': {
        name: 'Additional Data Field Template',
        presence: 'O',
    },
    '63': {
        name: 'CRC',
        presence: 'M',
    },
    '64': {
        name: 'Merchant Information— Language Template',
        presence: 'O',
    },
    '65-79': {
        name: 'RFU for EMVCo',
        presence: 'O',
    },
    '80-99': {
        name: 'Unreserved Templates',
        presence: 'O',
    },
};
const dataObjectsSchemaSubData = {
    '00': {
        name: 'Global Unique Identifier',
        presence: 'M',
    },
    '01': {
        name: 'Merchat PAN',
        presence: 'O',
    },
    '02': {
        name: 'Merchant ID',
        presence: 'M',
    },
    '03': {
        name: 'Merchant Criteria',
        presence: 'M',
    },
};
const dataObjectsAdditiolanFields = {
    '01': {
        name: 'Bill Number',
        presence: 'O',
    },
    '02': {
        name: 'Mobile Number',
        presence: 'O',
    },
    '03': {
        name: 'Store Label',
        presence: 'O',
    },
    '04': {
        name: 'Loyalty Number',
        presence: 'O',
    },
    '05': {
        name: 'Reference Label',
        presence: 'O',
    },
    '06': {
        name: 'Customer Label',
        presence: 'O',
    },
    '07': {
        name: 'Terminal Label',
        presence: 'O',
    },
    '08': {
        name: 'Purpose of Transaction',
        presence: 'O',
    },
    '09': {
        name: 'Additional Consumer Data Request',
        presence: 'O',
    },
    '10-49': {
        name: 'RFU for EMVCo',
        presence: 'O',
    },
    '50-99': {
        name: 'Payment System specific templates.',
        presence: 'O',
    },
};
const dataObjectsPaymentSpecificTemplate = {
    '00': {
        name: 'Globally Unique Identifier',
        presence: 'O',
    },
    '01-99': {
        name: 'Payment System specific',
        presence: 'O',
    },

}

function getDataObject(stringId) {
    let dataObject = dataObjectsSchema[stringId];
    if (!dataObject) {
        const id = parseInt(stringId);
        (id >= 2 && id <= 51) && (dataObject = dataObjectsSchema['02-51']);
        (id >= 65 && id <= 79) && (dataObject = dataObjectsSchema['65-79']);
        (id >= 80 && id <= 99) && (dataObject = dataObjectsSchema['80-99']);
    }
    return dataObject;
}
function getDataObjectSubData(stringId) {
    let dataObject = dataObjectsSchemaSubData[stringId];
    if (!dataObject) {

    }
    return dataObject;
}
function getDataObjectAdditionalFields(stringId) {
    let dataObject = dataObjectsAdditiolanFields[stringId];
    if (!dataObject) {
        const id = parseInt(stringId);
        (id >= 10 && id <= 49) && (dataObject = dataObjectsAdditiolanFields['10-49']);
        (id >= 50 && id <= 99) && (dataObject = dataObjectsAdditiolanFields['50-99']);
    }
    return dataObject;
}
function getDataObjectPaymentSpecifi(stringId) {
    let dataObject = dataObjectsPaymentSpecificTemplate[stringId];
    if (!dataObject) {
        const id = parseInt(stringId);
        (id >= 1 && id <= 99) && (dataObject = dataObjectsPaymentSpecificTemplate['01-99']);
    }
    return dataObject;
}

function getDataObjectName(stringId) {
    const dataObject = getDataObject(stringId);
    return dataObject ? dataObject.name : undefined;
}
function getDataObjectNameSubData(stringId) {
    const dataObject = getDataObjectSubData(stringId);
    return dataObject ? dataObject.name : undefined;
}
function getDataObjectAdditionalFieldsName(stringId) {
    const dataObject = getDataObjectAdditionalFields(stringId);
    return dataObject ? dataObject.name : undefined;
}
function getDataObjectNamePaymentSpecific(stringId) {
    const dataObject = getDataObjectPaymentSpecifi(stringId);
    return dataObject ? dataObject.name : undefined;
}


module.exports = {
    getDataObjectName,
    getDataObjectNameSubData,
    getDataObjectAdditionalFieldsName,
    getDataObjectNamePaymentSpecific
};