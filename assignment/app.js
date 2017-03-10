/**
 * Created by sumitbhanwala on 2/19/17.
 */
module.exports = function (app) {
    // further modules for the services of the each specific type
    // for keeping the modularity of the code

    var mongoose = require("mongoose");
    require('./services/user.service.server.js')(app);
    require('./services/website.service.server.js')(app);
    require('./services/page.service.server.js')(app);
    require('./services/widget.service.server.js')(app);

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);

};