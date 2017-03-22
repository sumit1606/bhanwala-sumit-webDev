/**
 * Created by sumitbhanwala on 3/22/17.
 */
module.exports = function () {
    var model = {
        UserModel : require("./user/user.model.server.js")(),
        PageModel : require("./page/page.model.server.js")(),
        WebsiteModel : require("./website/website.model.server.js")(),
        WidgetModel : require("./widget/widget.model.server.js")()
    }
    return model;
}
