const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const urlModel = require("./models/urlSchema");
const userModel = require("./models/userSchema");
const dotEnv = require("dotenv");
dotEnv.config();
const URI = process.env.URI;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const urlRoutes = require("./routes/urlRoutes");
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB Sucessfully connected."))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", urlRoutes);

// app.post("/api/shorten", async (req, res) => {
//   const originalURL = req.body.inputUrl;
//   // res.json({ posted: "True", inputUrl: originalURL });
//   try {
//     const urlModelEntry = new urlModel({
//       originUrl: originalURL,
//     });

//     const savedEntry = await urlModelEntry.save();
//     savedEntry.newUrl = savedEntry._id.toString().slice(-5);

//     await savedEntry.save();

//     res.json({
//       posted: "true",
//       inputUrl: originalURL,
//       newUrl: savedEntry.newUrl,
//     });
//   } catch (error) {
//     res.json({ posted: "false", error: error });
//   }
// });

// app.get("/api/shorten", (req, res) => {
//   res.send("Api Page here.");
// });

// app.get("/api/list", async (req, res) => {
//   const listed = await urlModel.find();
//   res.json({ list: listed });
//   console.log(listed);
// });

// app.delete("/api/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   const ok = await urlModel.findOne({ _id: id });
//   if (!ok) {
//     console.log("Could not find record");
//     res.status(404).send("Could not find record like that");
//   }
//   if (ok) {
//     const deleted = await urlModel.deleteOne({ _id: id });
//     res.json({ deleted: deleted.id });
//   }
// });

// app.post("/api/:url", async (req, res) => {
//   const url = req.params.url;
//   const result = await urlModel.findOne({ newUrl: url });
//   if (!result) {
//     return res.json({ redirect: "/error" });
//   }
//   result.clicks++;
//   await result.save();
//   res.json({ redirect: result.originUrl });
// });

app.post("/api/auth/signup/", async (req, res) => {
  console.log(req.body);
  const email = req.body.username;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(email, hashedPassword);

  try {
    const result = await userModel.findOne({ username: email });
    console.log("Result for finding MongoDB existing Email is:" + result);
    // console.log("is result not equal to null?"+result!=null)
    if (result != null) {
      return res.send({ message: false }).status(409);
    }
    const user = new userModel({ username: email, password: hashedPassword });
    await user.save();
    return res.send({ message: true });
  } catch (error) {
    res.send({ message: false });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const exists = await userModel.findOne({ username: username });
  if (!exists) {
    res.send({ message: "Email ID does not Exist!", authenticated: false });
    console.log("Email ID does not Exist!");
    return;
  }

  const hashed = exists.password;
  const truePass = await bcrypt.compare(password, hashed);
  if (!truePass) {
    res.send({ message: "Invalid Password", authenticated: false });
    return;
  }
  
  const token = jwt.sign({ userID: exists._id,
      username: exists.username,
      role:exists.role,
   }, process.env.JWT_SECRET,
  {expiresIn:"1h"});

  


  res.status(200).send({ message: "Success", authenticated: true,token:token });
});

app.listen(PORT, () => {
  console.log("Listening in port number", PORT);
});
