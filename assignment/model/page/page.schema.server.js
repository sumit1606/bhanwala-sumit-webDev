/**
 * Created by sumitbhanwala on 3/22/17.
 */


module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        name : {type: String, required: true},
        title : String,
        description : String,
        _website : { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' },
        widgets : [{ type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel' }],
        dateCreated: {type: Date , default: Date.now()}
    }, {collection: 'page'});

    return PageSchema;
};