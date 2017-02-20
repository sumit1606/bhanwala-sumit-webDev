/**
 * Created by sumitbhanwala on 2/19/17.
 */
module.exports = function (app) {
    app.get("/api/user" ,function (req ,res) {
        console.log("from the server side");
        res.send(200);
    })
}