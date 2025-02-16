const InforModel = require("../models/InforModel");
const News = require("../models/NewsModel");
const Footer = require("../models/footerModel");
const Products = require("../models/products");

const deleteNewsFunc = async (req, res) => {
  try {
    const { id } = req.body;

    await Products.deleteOne({ _id: id });

    return res.json({
      EM: "Đã xoá vĩnh viễn thành công!",
      EC: 0,
      DT: "",
    });
  } catch {
    return res.json({
      EM: "Đã có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

const patchNewsFunc = async (req, res) => {
  try {
    const { id } = req.body;

    await Products.updateOne({ _id: id }, { deleted: false });

    return res.json({
      EM: "Đã khôi phục thành công!",
      EC: 0,
      DT: "",
    });
  } catch {
    return res.json({
      EM: "Đã có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

const showNewsFunc = async (req, res) => {
  try {
    const data = await Products.find({ deleted: true }).sort({ createdAt: -1 });

    return res.json({
      EM: "Lấy thông tin thành công!",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      EM: "Không thành công",
      EC: -1,
      DT: "",
    });
  }
};

const footer = async (req, res) => {
  try {
    const { name, content } = req.body;

    await Footer.updateOne({
      name: name,
      content: content,
    });

    return res.json({
      EM: "Đã cập nhật thông tin thành công!",
      EC: 0,
      DT: "data",
    });
  } catch {
    return res.json({
      EM: "Thông tin chưa được cập nhật",
      EC: -1,
      DT: "",
    });
  }
};

const footerShow = async (req, res) => {
  try {
    const data = await Footer.findOne();

    return res.json({
      EM: "Đã cập nhật thông tin thành công!",
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

const Infor = async (req, res) => {
  try {
    const infor = req.body.Infor;

    await InforModel.updateOne({ infor: infor });

    return res.json({
      EM: "Đã cập nhật thông tin thành công!",
      EC: 0,
      DT: "",
    });
  } catch {
    return res.json({
      EM: "Thông tin chưa được cập nhật",
      EC: -1,
      DT: "",
    });
  }
};

const getInfor = async (req, res) => {
  try {
    const getInforDB = await InforModel.findOne().sort({ _id: -1 });

    return res.json({
      EM: "Lấy thông tin thành công!",
      EC: 0,
      DT: getInforDB ? getInforDB.infor : "",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      EM: "Không thành công",
      EC: -1,
      DT: "",
    });
  }
};

const productPost = async (req, res) => {
  try {
    const { name, price, img, content } = req.body;

    const data = new Products({
      name: name,
      price: price,
      img: img,
      content: content,
    });

    await data.save();

    return res.json({
      EM: "Đã tạo sản phẩm thành công!",
      EC: 0,
      DT: "",
    });
  } catch {
    return res.json({
      EM: "Thông tin chưa được cập nhật",
      EC: -1,
      DT: "",
    });
  }
};

const productGet = async (req, res) => {
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

const productDelete = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await Products.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
      }
    );

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
  deleteNewsFunc,
  patchNewsFunc,
  showNewsFunc,
  footer,
  footerShow,
  Infor,
  getInfor,
  productPost,
  productGet,
  productDelete,
};
