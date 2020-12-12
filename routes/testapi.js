// var url = "mongodb+srv://anirudh:angel%4012345@cluster0.u1vja.mongodb.net/test?authSource=admin&replicaSet=atlas-q0xuph-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
var MongoClient = require('mongodb').MongoClient;

var express = require('express');
var router = express.Router();
var model = require("../model/test");
var url = "mongodb+srv://anirudh:angel%4012345@cluster0.u1vja.mongodb.net/test?authSource=admin&replicaSet=atlas-q0xuph-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

router.post("/testapi", async function(req, res, next) {
    const { name } = req.body;
    try {
        var record = await new model({
            name : name,
        });
        if(record){
            await record.save();
            res.status(200).json({ IsSuccess: true , Data: record });
        }else{
            res.status(200).json({ IsSuccess: true , Message: "Not Added" });
        }
    } catch (error) {
        res.status(500).json({ Message: error.message, Data: 0, IsSuccess: false });
    }
});

  

module.exports = router;
