/**
 * Created by sumitbhanwala on 2/19/17.
 */
module.exports = function (app) {
    // further modules for the services of the each specific type
    // for keeping the modularity of the code
    var userModel = require('./model/user/user.model.server.js')();
    var websiteModel = require('./model/user/user.model.server.js')();
    var pageModel = require('./model/user/user.model.server.js')();
    var widgetModel = require('./model/user/user.model.server.js')();
    require('./services/user.service.server.js')(app,userModel);
    require('./services/website.service.server.js')(app,websiteModel);
    require('./services/page.service.server.js')(app,pageModel);
    require('./services/widget.service.server.js')(app,widgetModel);

};