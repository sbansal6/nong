/** Configure mongoose */

"use strict";

var config = require("../config");

module.exports = function(mongoose) {
    (function() {
        var connection = "mongodb://" + config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.database;
        if (!mongoose.connection.db) {
            mongoose.connect(connection);
        }
    })();
    mongoose.connection.on("error", function(err) {
        throw err;
    });
};