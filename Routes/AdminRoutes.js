const express = require("express");
const AdminControllers = require("../controllers/AdminControllers");

const router = express.Router();

const adminRoutes = (app) => {
  router.post("/api/v1/bins/news/delete", AdminControllers.deleteNewsFunc);
  router.patch("/api/v1/bins/news/patch", AdminControllers.patchNewsFunc);
  router.get("/api/v1/bins/news", AdminControllers.showNewsFunc);

  router.patch("/api/v1/footer", AdminControllers.footer);
  router.get("/api/v1/footerShow", AdminControllers.footerShow);

  router.patch("/api/v1/infor", AdminControllers.Infor);
  router.get("/api/v1/infor", AdminControllers.getInfor);

  app.use(router);
};

module.exports = adminRoutes;
