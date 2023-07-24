const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "All Fields are Mendotary" });
  } else {
    try {
      const availableUser = await User.findOne({ email });

      console.log(availableUser);
      if (availableUser) {
        res.status(400).json({ message: "User Already Register" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const registeredUser = await User.create({
          username,
          email,
          password: hashedPassword, // Save the hashed password in the database
        });
        res.status(200).json({ message: "User Registered Successfully" });
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All Fields are Mandatory" });
    return; // End the function here to avoid further processing
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            _id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      res.status(200).json({ accessToken, message: "Login User" });
    } else {
      res.status(401).json({ message: "Email Or Password Is Not Valid" });
    }
  } catch (error) {
    // Handle any errors that might occur during the login process
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const currentUser = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
