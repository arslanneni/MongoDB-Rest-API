const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add User Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email Address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please Add User Password"],
    },
  },
  {
    timestamps: true, // This will automatically add 'createdAt' and 'updatedAt' fields
  }
);

module.exports = mongoose.model("User", userSchema);
