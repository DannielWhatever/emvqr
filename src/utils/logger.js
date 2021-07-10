let logger = { debug: o => o };

module.exports = {
    enableDebugLog: () => (logger = console),
    logger: { ...logger }
};