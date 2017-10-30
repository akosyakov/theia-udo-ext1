 // @ts-check
const serverPath = require('path').resolve(__dirname, 'server');
module.exports = require('@theia/core/lib/node/cluster/main').default(serverPath);
