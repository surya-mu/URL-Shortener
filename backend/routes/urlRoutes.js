const express = require("express");

const router = express.Router();

const { postShorten, getShorten,getList,deleteURL,postURL } = require("../controllers/urlControllers");


router.post("/shorten",postShorten);
router.get("/shorten",getShorten);
router.get("/list",getList);
router.delete("/delete/:id",deleteURL);
router.post("/:url",postURL);


module.exports = router;