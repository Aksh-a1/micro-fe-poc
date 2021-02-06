const getPort = require('get-port')

module.exports = () => getPort({port: getPort.makeRange(3000, 3100)})