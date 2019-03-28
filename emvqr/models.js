
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

function getDataObject(stringId) {
    let dataObject = dataObjectsSchema[stringId];
    if(!dataObject) {
        const id = parseInt(stringId);
        (id >=  2 && id <= 51) && (dataObject = dataObjectsSchema['02-51']);
        (id >= 65 && id <= 79) && (dataObject = dataObjectsSchema['65-79']);
        (id >= 80 && id <= 99) && (dataObject = dataObjectsSchema['80-99']);
    }
    return dataObject;
}

function getDataObjectName(stringId) {
    const dataObject = getDataObject(stringId);
    return dataObject ? dataObject.name : undefined;
}


module.exports = {
    getDataObjectName
};