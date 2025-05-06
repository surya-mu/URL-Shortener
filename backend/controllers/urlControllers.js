const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const urlModel = require("../models/urlSchema");

const postShorten = async (req, res) => {
  const originalURL = req.body.inputUrl;
  // res.json({ posted: "True", inputUrl: originalURL });
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.send({ posted: "false", error: "Error Occurred" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userID;
    const newUrl = new mongoose.Types.ObjectId().toString().slice(-5);

    const urlModelEntry = new urlModel({
      originUrl: originalURL,
      userid:userid,
      newUrl: newUrl
    });

    const savedEntry = await urlModelEntry.save();
    // savedEntry.newUrl = savedEntry._id.toString().slice(-5);

    // await savedEntry.save()
    res.json({
      posted: "true",
      inputUrl: originalURL,
      newUrl: savedEntry.newUrl,
      userid: userid,
    });


  } catch(error) {
    res.json({ posted: "false", error: error });
    console.log(error)
  }
};

const getShorten = async (req, res) => {
  res.send("API Page Here");
};

const getList = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if(!token){
    res.status(404).send('User Not Authenticated');
    console.log('user not Authenticated...')
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  const userid = decoded.userID
  const listed = await urlModel.find({userid:userid});
  res.json({ list: listed });
  console.log(listed);
};

const postURL = async (req, res) => {
  const url = req.params.url;
  const result = await urlModel.findOne({ newUrl: url });
  if (!result) {
    return res.json({ redirect: "/error" });
  }
  result.clicks++;
  await result.save();
  res.json({ redirect: result.originUrl });
};

const deleteURL = async (req, res) => {
  const id = req.params.id;
  const ok = await urlModel.findOne({ _id: id });
  if (!ok) {
    console.log("Could not find record");
    res.status(404).send("Could not find record like that");
  }
  if (ok) {
    const deleted = await urlModel.deleteOne({ _id: id });
    res.json({ deleted: deleted.id });
  }
};

module.exports = { getShorten, postShorten, postURL, deleteURL, getList };
