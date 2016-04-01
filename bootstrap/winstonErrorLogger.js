"use strict";

const winston = require("winston");
const expressWinston = require("express-winston");

module.exports = function(app, options) {
    // region Winston Error Handler
    if (options.skip !== true) {
        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true
                })
            ],
            meta: false,
            msg: "HTTP {{req.method}} {{req.url}}",
            expressFormat: false,
            colorStatus: true
        }));
    }
    // endregion
}