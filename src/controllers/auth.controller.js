const User = require("../models/user.model");
const { Business, Sheet } = require("../models/business.model");
const { HTTP_STATUS } = require("../helpers/http-status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { USER_ROLES } = require("../constants/user-roles");

exports.login_user = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username && !email) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ msg: "username or email is required" });
    }

    if (!password) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ msg: "password is required" });
    }

    if (password.length <= 7) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ msg: "Password length must be atleast 8" });
    }

    let user;
    if (username) {
      user = await User.findOne({ username });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ msg: "User with this username not found" });
    }

    if (!user.password) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ msg: "User have no password" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ msg: "Given password is not valid" });
    }

    const token = await jwt.sign(
      {
        email: user.email,
        username: user.username,
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    res.status(HTTP_STATUS.OK).json({
      access_token: token,
      message: "Login successful!",
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Something wen't wrong" });
  }
};

// TODO: DELETE LATER (FOR TESTING)
exports.create_user_test = async (req, res) => {
  try {
    const { username, email, status, phone, businessName, role, password } =
      req.body;

    const rolesSet = new Set(Object.values(USER_ROLES));
    if (!rolesSet.has(role)) {
      return res.status(400).json({
        msg: "Invalid Role given",
        given_role: role,
        allowed_roles: rolesSet,
      });
    }
    if (!password) {
      return res.status(400).json({ msg: "Please provide a password" });
    }

    const user_name = await User.findOne({ username });
    if (user_name)
      return res.status(400).json({ msg: "This user name already exists." });

    const user_email = await User.findOne({ email });
    if (user_email)
      return res.status(400).json({ msg: "This email already exists." });

    let business = await Business.findOne({ name: businessName });
    if (!business) {
      business = new Business({ name: businessName });
      await business.save();
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      username,
      email,
      status,
      phone,
      role,
      password: hashedPass,
      business: business._id,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { ...newUser._doc },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TODO: DELETE LATER (FOR TESTING)
exports.delete_user_test = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  let delBusinessRes;
  if (user.business) {
    delBusinessRes = await Business.deleteOne({ _id: user.business });
  }
  const deluserRes = await User.deleteOne({ _id: user._id });

  res.status(HTTP_STATUS.OK).json({
    user,
    deleted_business: delBusinessRes,
    deleted_user: deluserRes,
  });

  res.json({ user });
};
