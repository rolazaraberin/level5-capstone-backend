const express = require("express");
const urlHome = require("./routes/home");
const apiUpdate = require("./routes/update");
const apiRead = require("./routes/read");
const apiCreate = require("./routes/create");
const apiDelete = require("./routes/delete");
// const { urlQuery1, urlQuery2, urlQuery3 } = require("./routes/queries");

const URL = {
  home: "/",
  // test: "/test",
  // query1: "/query1",
  // query2: "/query2",
  // query3: "/query3",
};
const API = {
  url: "/api",
};

const router = express.Router();
router.get(URL.home, urlHome);
// router.get(URL.test, urlHome);
// router.get(URL.query1, urlQuery1);
// router.get(URL.query2, urlQuery2);
// router.get(URL.query3, urlQuery3);
router.post(API.url, apiCreate);
router.get(API.url, apiRead);
router.put(API.url, apiUpdate);
router.delete(API.url, apiDelete);

module.exports = router;
