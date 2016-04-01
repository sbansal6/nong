var nconf = require('nconf');
nconf.file({ file: './config/default.json' });

// Exports configured nconf
module.exports = nconf;