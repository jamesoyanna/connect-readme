const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require("../models/UserModel");

// Register a user
const Register = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user with the given email already exists
    UserModel.findOne({ email }).then(async (exist) => {
      if (exist) {
        // Return an error if user already exists
        errors.email = "user already exist";
        res.status(404).json(errors);
      } else {
        // Hash the password and create a new user
        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash;
        const result = await UserModel.create(req.body);

        // Generate a JWT token with the user's email and id
        const token = jwt.sign(
          { email: result.email, id: result._id },
          process.env.PRIVATE_KEY,
          { expiresIn: "1h" }
        );

        // Return the user and the token in the response
        res.status(200).json({ result, token });
      }
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// Login a user
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      // Return an error if user doesn't exist
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      // Return an error if the password is incorrect
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Generate a JWT token with the user's id, name, and email
    const token = jwt.sign(
      { id: existingUser._id, name: existingUser.name, email: existingUser.email },
      process.env.PRIVATE_KEY,
      { expiresIn: "24h" }
    );

    // Return the user and the token in the response
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  Register,
  Login,
};
