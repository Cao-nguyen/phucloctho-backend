const express = require("express");
const AdminControllers = require("../controllers/AdminControllers");

const router = express.Router();

const adminRoutes = (app) => {
  router.post("/api/v1/blog/post", AdminControllers.blogPost);
  router.get("/api/v1/blog/get", AdminControllers.blogGet);
  router.post("/api/v1/blog/delete", AdminControllers.blogDelete);

  router.post("/api/v1/bins/news/delete", AdminControllers.deleteNewsFunc);
  router.patch("/api/v1/bins/news/patch", AdminControllers.patchNewsFunc);
  router.get("/api/v1/bins/news", AdminControllers.showNewsFunc);

  router.post("/api/v1/products/post", AdminControllers.productPost);
  router.get("/api/v1/products/get", AdminControllers.productGet);
  router.patch("/api/v1/products/delete", AdminControllers.productDelete);

  router.patch("/api/v1/footer", AdminControllers.footer);
  router.get("/api/v1/footerShow", AdminControllers.footerShow);

  router.patch("/api/v1/infor", AdminControllers.Infor);
  router.get("/api/v1/infor", AdminControllers.getInfor);

  app.use(router);
};

module.exports = adminRoutes;
