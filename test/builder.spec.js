const emvqr = require('../src/emvqr');

test('should create a valid qrstring', () => {

    const qrString = emvqr.build({
        merchantAccountInformation: "asdasdasda",
        merchantName: "Isi",
        merchantCountry: "CL",
        merchantCity: "Santiago",
        merchantCategoryCode: "5732",
        currency: "CLP",
        amount: "12.990",
    });
    const emvObject = emvqr.decode(qrString);
    expect(typeof emvObject).toBe('object');
});
