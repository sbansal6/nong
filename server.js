'use strict'

// region Imports
const app = require('express')();
const mongoose = require('mongoose');
const httpErrors = require('httperrors');

// endregion

// region Init
/**
 * @function
 * @name init
 * @description Configures whole application
 * @param {Object} options - options parameter
 * @param {function} cb - callback function
 */
var init = function(options, cb) {

    // region Configure App
    require('./bootstrap/app')(app);
    // endregion

    //// region Configure Mongoose
    //require('./bootstrap/mongoose')(mongoose);
    //// endregion
    //
    //
    //// region Configure Winston Logger
    //require('./bootstrap/winstonLogger')(app, options);
    //// endregion

    // region Routes
    // admin routes
    app.use('/', require('./app/controllers'))


    // fire 404 for routes not mentioned above
    app.all('*', function(req, res, next) {
        next(new httpErrors.NotFound());
    });
    // endregion

    // region Configure Winston Error Logger
    require('./bootstrap/winstonErrorLogger')(app, options);
    // endregion

    // region Error Handler
    app.use(function(err, req, res, next) {
        var body = {
            error: {
                message: err.message || '',
                type: err.name || '',
                code: err.status || err.code || err.errorCode,
                error_subcode: err.subcode || err.status || err.code || err.errorCode,
            }
                };
        res.status(body.error.code).json(body);
      });
            // endregion
    cb(null, app)

    // endregion

}

// region Exports
if (require.main === module) {
    init({}, function(err, app) {
        app.listen(app.get('port'), function() {
            console.log('Express started on http://localhost:' +
                app.get('port') + '; press Ctrl-C to terminate.');
        });
    });
} else {
    module.exports.init = init;
}
// endregion