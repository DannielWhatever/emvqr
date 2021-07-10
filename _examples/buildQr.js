const emvqr = require("../src/emvqr");

const merchantAccountInformation = "asdasdasda";
const merchantName = "Isi";
const merchantCountry = "CL";
const merchantCity = "Santiago";
const merchantCategoryCode = "5732";
const currency = "CLP";
const amount = "12.990";

const qrString = emvqr.build(
    merchantAccountInformation,
    merchantName,
    merchantCountry,
    merchantCity,
    merchantCategoryCode,
    currency,
    amount
);
const emvObject = emvqr.decode(qrString);
console.log(emvObject);
