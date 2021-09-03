const mongoose = require("mongoose");
const errorMessage = "title and url can't be not defined at the same time";

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: {
    type: String,
    required: [
      function () {
        return !this.title != null;
      },
      errorMessage
    ]
  },
  likes: { type: Number, default: 0 }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
