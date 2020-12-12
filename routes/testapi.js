// var url = "mongodb+srv://anirudh:angel%4012345@cluster0.u1vja.mongodb.net/test?authSource=admin&replicaSet=atlas-q0xuph-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://anirudh:angel%4012345@cluster0.u1vja.mongodb.net/test?authSource=admin&replicaSet=atlas-q0xuph-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

var express = require('express');
var router = express.Router();

router.post("/testapi", async function(req, res, next) {
    const { name } = req.body;
    try {
        if (name!=null) {
            res.status(200).json({
                Message: "User Entered Name!",
                IsSuccess: true,
            });
        } else {
            res.status(200).json({
                Message: "User Name Empty!",
                IsSuccess: false,
            });
        }
    } catch (err) {
        res.status(500).json({ Message: err.message, Data: 0, IsSuccess: false });
    }
    finally{
        if(name!=null){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("firstdatabase");
            var myobj = { name: name};
            dbo.collection("Topics").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
        }
    }
});

  

module.exports = router;
