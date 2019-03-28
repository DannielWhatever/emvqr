const emvqr = require('../emvqr/emvqr');


const emvqrHelloWorldExample = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';


test('should return a valid object, when its called', () => {
    const emvObject = emvqr.decode(emvqrHelloWorldExample);
    expect(typeof emvObject).toBe('object');
});

test('valid expected output for emvqr string example', () => {
    const emvObject = emvqr.decode(emvqrHelloWorldExample);

    let item = null;

    // 01 - Point of initiation method
    item = emvObject['01'];
    expect(item).not.toBeNull();
    expect(item.name).toBe('Point of Initiation Method');
    expect(item.len).toBe(2);
    expect(item.data).toBe('12');


});

test('should throw an error, when its called with an invalid checksum', () => {
    const emvqrBadChecksumExample = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEZT TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';
    expect(() => {
        emvqr.decode(emvqrBadChecksumExample)
    }).toThrow(Error);
});
