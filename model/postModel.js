const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    description: String,
    category : String,
    image: String,
    location: String,
    postedAt: {
        type: Date,
        default: Date.now
    },
    price: Number
})

const PostModel = mongoose.model("post", schema);

module.exports = {
    PostModel
}