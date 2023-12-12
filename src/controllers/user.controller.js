const User = require("../models/user.model");
const { Business, Sheet } = require("../models/business.model");
const { USER_ROLES } = require("../constants/user-roles");
const { HTTP_STATUS } = require("../helpers/http-status");

exports.create_user = async (req, res) => {
  try {
    const { username, email, status, phone, businessName } = req.body;

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

    // Create the user
    const newUser = new User({
      username,
      email,
      status,
      phone,
      role: USER_ROLES.PAID,
      business: business._id,
    });

    // Save the user to the database
    await newUser.save();

    // Send Email

    res.status(201).json({
      message: "User created successfully",
      user: { ...newUser._doc },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_user_accounts = async (req, res) => {
  try {
    const users = await User.find({ role: USER_ROLES.PAID });

    // Extract business IDs from the fetched users
    const businessIds = users.map((user) => user.business);

    // Fetch businesses using the extracted business IDs
    const businesses = await Business.find({ _id: { $in: businessIds } });

    // Create a map of business IDs to businesses for easy lookup
    const businessMap = businesses.reduce((map, business) => {
      map[business._id] = business;
      return map;
    }, {});

    // Combine user data with corresponding business data
    const usersWithBusiness = users.map((user) => ({
      ...user.toObject(), // Convert Mongoose document to plain JavaScript object
      business: businessMap[user.business], // Add business information to the user
    }));

    return res.json({ accounts: usersWithBusiness });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update_user = async (req, res) => {
  try {
    const form = req.body;

    if (!form.userId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        msg: "userId is required",
        form: req.body,
      });
    }

    const user = await User.findById(form.userId);
    const userUpdateRes = await User.updateOne({ _id: form.userId }, form);

    if (form.username && user.username !== form.username) {
      const userExists = await User.findOne({ username: form.username });
      if (userExists) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ msg: "User with username already exists" });
      }
    }

    if (form.email && user.email !== form.email) {
      const emailExists = await User.findOne({ email: form.email });
      if (emailExists) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ msg: "User with email already exists" });
      }
    }

    // Add as we go
    const businessForm = {};
    if (form.businessName) businessForm.name = form.businessName;
    const updateBusinessRes = await Business.updateOne(
      { _id: user.business },
      businessForm
    );

    res.status(HTTP_STATUS.OK).json({ updateBusinessRes, userUpdateRes });
  } catch (error) {
    res
      .status(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .json({ msg: error?.message || "Something wen't wrong" });
  }
};

// const form = {
//   status: status || USER_STATUS.ACTIVE,
//   email,
//   businessName: bname,
//   phone: conNum,
//   username: conName,
// };
