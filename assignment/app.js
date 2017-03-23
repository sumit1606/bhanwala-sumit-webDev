/**
 * Created by sumitbhanwala on 2/19/17.*/
module.exports = function (app) {
    // further modules for the services of the each specific type
    // for keeping the modularity of the code
    var modelList = require('./model/models.server.js')();
    require('./services/user.service.server.js')(app,modelList);
    require('./services/website.service.server.js')(app,modelList);
    require('./services/page.service.server.js')(app,modelList);
    require('./services/widget.service.server.js')(app,modelList);
};