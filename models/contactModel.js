const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Add Contact Name"],
  },
  email: {
    type: String,
    required: [true, "Please Add Email Address"],
  },
  phone: {
    type: String,
    required: [true, "Please Add Contact Phone Number"],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
