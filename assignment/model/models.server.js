/**
 * Created by sumitbhanwala on 3/22/17.
 */
module.exports = function () {
    var model = {
        UserModel : require("./user/user.model.server")(),
      //  PageModel : require("./page/page.model.server")(),
        WebsiteModel : require("./website/website.model.server")(),
     //   WidgetModel : require("./widget/widget.model.server")()
    }
    return model;
}
