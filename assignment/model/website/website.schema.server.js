/**
 * Created by sumitbhanwala on 3/22/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        name : {type: String, required: true},
        description : String,
        _user : { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
        pages : [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageModel' }],
        dateCreated: {type: Date , default: Date.now()}
    }, {collection: 'website'});

    return WebsiteSchema;
};