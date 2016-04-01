'use strict'

// region Imports
const app = require('express')();
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

    // region Configure Mongoose
    require('./bootstrap/mongoose')(mongoose);
    // endregion

    // region Configure Winston Logger
    require('./bootstrap/winstonLogger')(app, options);
    // endregion

    // region Routes
    // admin routes
    app.use('/admin', require('./app/controllers/admin'))

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
