var mongoose = require("mongoose");

var newSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
      },
});

// const admin = mongoose.model("admin1", newSchema);

// module.exports = admin;
module.exports = mongoose.model("admin1", newSchema);