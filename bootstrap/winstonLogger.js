"use strict";

const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = function(app, options) {

    expressWinston.requestWhitelist.push('body');
    // logs every incoming request
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                level: 'info',
                json: true,
                colorize: true
            })
        ],
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res}}',
        expressFormat: true,
        colorStatus: true,
        skip: function() {
            return (options.skip || true)
        }
    }));
    //endregion
}