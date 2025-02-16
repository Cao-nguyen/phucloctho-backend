const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const Products = require("../models/products");
const Blog = require("../models/BlogModel");

const RegisterUser = async (req, res) => {
  const { fullName, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !fullName || !username || !password) {
    return res.json({
      EM: "Những thông tin bạn nhập là không đủ để đăng ký tài khoản",
      EC: -1,
      DT: "",
    });
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.json({
      EM: "Email này đã được đăng ký tài khoản trên hệ thống rồi",
      EC: -1,
      DT: "",
    });
  }

  const isUsername = await User.findOne({ username });
  if (isUsername) {
    return res.json({
      EM: "Đã có người dùng lựa chọn tên này, bạn vui lòng chọn tên khác",
      EC: -1,
      DT: "",
    });
  }

  const user = new User({
    email: email,
    fullName: fullName,
    username: username,
    password: hashedPassword,
  });

  await user.save();

  return res.json({
    EM: "Đã đăng ký tài khoản thành công!",
    EC: 0,
    DT: {
      fullName: user.fullName,
      tokenUser: user.tokenUser,
      role: user.role,
      id: user._id,
    },
  });
};

const LoginUser = async (req, res) => {
  const { fullName, username, password } = req.body;

  const user = await User.findOne({ fullName, username });

  if (!user) {
    return res.json({
      EM: "Họ tên hoặc tên đăng nhập không chính xác",
      EC: -1,
      DT: "",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      EM: "Mật khẩu không đúng",
      EC: -1,
      DT: "",
    });
  }

  return res.json({
    EM: "Đăng nhập thành công",
    EC: 0,
    DT: {
      fullName: user.fullName,
      tokenUser: user.tokenUser,
      role: user.role,
      id: user._id,
    },
  });
};

const Forgot = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return res.json({
      EM: "Những thông tin bạn nhập là không đủ để đăng ký tài khoản",
      EC: -1,
      DT: "",
    });
  }

  await User.updateOne({ email }, { $set: { password: hashedPassword } });

  return res.json({
    EM: "Đã thay đổi mật khẩu thành công!",
    EC: 0,
    DT: "",
  });
};

const ProductGet = async (req, res) => {
  try {
    const data = await Products.find({
      deleted: false,
    });

    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } catch {
    return res.json({
      EM: "Thông tin chưa được cập nhật",
      EC: -1,
      DT: "",
    });
  }
};

const blogGet = async (req, res) => {
  try {
    const data = await Blog.find({});

    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } catch {
    return res.json({
      EM: "Thông tin chưa được cập nhật",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  Forgot,
  ProductGet,
  blogGet,
};
