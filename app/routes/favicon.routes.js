module.exports = app => {
  const favicon = require("../controllers/favicon.controller.js");

  var router = require("express").Router();

  router.get("/:url", favicon.getFavIcon);

  app.use('/favicon', router);
};
