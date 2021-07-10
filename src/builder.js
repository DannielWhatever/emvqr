const checksumUtils = require('./utils/checksumUtils');
const currencies = require('./specifications/currencies.json');


const PREFIX = "0002010102122930";

function build(
  merchantAccountInformation,
  merchantName,
  merchantCountry,
  merchantCity,
  merchantCategoryCode,
  currency,
  amount
) {
  let emvString = "";
  emvString += PREFIX;
  emvString += _getStringDynamicLength("29", merchantAccountInformation);
  emvString += _getStringDynamicLength("58", merchantCountry);
  emvString += _getStringDynamicLength("59", merchantName);
  emvString += _getStringDynamicLength("60", merchantCity);
  emvString += _getStringDynamicLength("52", merchantCategoryCode);
  emvString += _getStringDynamicLength("53", _getCurrencyNumber(currency));
  emvString += _getStringDynamicLength("54", amount);
  emvString += checksumUtils.computeCRC(emvString);
  console.log(`emvString`, emvString)
  return emvString;
}

function _getStringDynamicLength(code, value) {
  if (value === undefined || value.length === 0 || value.length > 99) {
    throw new Error(`Invalid length for code: ${code} with value: ${value}`);
  }
  const length = `${value.length < 10 ? "0" : ""}${value.length}`;
  return `${code}${length}${value}`;
}

function _getCurrencyNumber(currencyInput) {
    const selectedCurrency = currencies.find(item => item.code === currencyInput);
    return selectedCurrency?.number ?? currencyInput;
}

module.exports = {
  build,
}