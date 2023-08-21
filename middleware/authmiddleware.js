const express = require("express");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklistModel");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if(token){
    const decoded = jwt.verify(token, "school");
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.status(200).json({ msg: "Please Login!" });
      }
  }else{
    res.status(200).json({ msg: "Please Login!" });
  }
//   try {
//     let user = await BlacklistModel.find({
//       blacklist: { $in: token },
//     });
//     if (user) {
//       res.status(200).json({ msg: "Please Login!" });
//     } else {
//       const decoded = jwt.verify(token, "school");
//       if (decoded) {
//         req.body.userID = decoded.userID;
//         next();
//       } else {
//         res.status(200).json({ msg: "Please Login!" });
//       }
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
};

module.exports = { auth };
