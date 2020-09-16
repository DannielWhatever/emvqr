
const crc = require('./crc');
const models = require('./models');
const fs = require('fs')
const mcc_codes = require('./mcc_codes.json')
const getDataObjectName = models.getDataObjectName;
const getDataObjectNameSubData = models.getDataObjectNameSubData;

// 
let debug = { log: o => o };

/**
 * decode (public|exported)
 *  receive a text and return a emv parsed object
 */
function decode(emvString) {
    const emvObject = {};
    // parse emv string
    let inputText = emvString;
    while (inputText.length > 0) {
        debug.log('inputText', inputText);
        let { emvItem, remainingText } = readNext(inputText);
        if (emvItem.id == 52) {
            let translateCode = getObjects(mcc_codes,'mcc',emvItem.data)
            emvItem.data = `${emvItem.data} (${translateCode[0].usda_description})`
        }
        if (emvItem.name == 'Merchant Account Information') {
            emvItem.data = decodeSubData(emvItem.data)
        }
        emvObject[emvItem.id] = emvItem;
        inputText = remainingText;
    }

    // validate checksum
    if (!validateChecksum(emvString)) {
        throw new Error('checksum validation failed.');
    };

    return emvObject;
}
function decodeSubData(emvString) {
    const emvObject = {};

    // parse emv string
    let inputText = emvString;
    while (inputText.length > 0) {
        debug.log('inputText', inputText);
        let { emvItem, remainingText } = readNextSubData(inputText);
        emvObject[emvItem.id] = emvItem;
        inputText = remainingText;
    }

    return emvObject;
}

/**
 * readNext (private use)
 *  read next emvItem, and return the remaining string
 */
function readNext(inputText) {
    const id = inputText.substring(0, 2);
    const len = parseInt(inputText.substring(2, 4));
    const data = inputText.substring(4, len + 4);
    const emvItem = {
        id,
        name: getDataObjectName(id),
        len,
        data
    };
    const remainingText = inputText.substring(len + 4);
    return {
        emvItem,
        remainingText
    };
}
function readNextSubData(inputText) {
    const id = inputText.substring(0, 2);
    const len = parseInt(inputText.substring(2, 4));
    const data = inputText.substring(4, len + 4);
    const emvItem = {
        id,
        name: getDataObjectNameSubData(id),
        len,
        data
    };
    const remainingText = inputText.substring(len + 4);
    return {
        emvItem,
        remainingText
    };
}

/**
 * validateChecksum (private use)
 *  you guess
 */
function validateChecksum(emvString) {
    const emvData = emvString.substring(0, emvString.length - 4);
    const checksum = emvString.substring(emvString.length - 4);
    debug.log('emvData', emvData);
    debug.log('checksum', checksum);

    const expectedCRC = crc.computeCRC(emvData);
    return expectedCRC === checksum;
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
    }
    return objects;
}

module.exports = {
    decode,
    enableDebugLog: () => (debug = console),
    decodeSubData
}