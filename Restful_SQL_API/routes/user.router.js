const express = require('express');
const router = express.Router();
const User = require("../models/user_model");

//http://localhost:5000/apis/restaurants
router.post("/user", (req, res) => { //สร้าง
    //Create a restaurant
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
    });

    //Save to Database
    User.create(newUser, (err, data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user"
            });
        else res.send(data);
    });
});

//Get restaurant by Id
//http://localhost:5000/apis/restaurants/1
router.get("/user/:id", (req, res) => { //เรียกดูจาก id
    //แปลงจาก string ไปเป็นเลข
    const userId = Number.parseInt(req.params.id); //แปลงให้เป็นจำนวนเต็ม
    User.getById(userId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message : `User not found with this id ${userId}`,
                });
            } else {
                res.sendStatus(500).send({
                    message : "User retrieving with this id " + userId,
                });
            }
        } else {
            res.send(data);
        }
    });    
});

//Get all restaurant 
//http://localhost:5000/apis/restaurants
router.get('/user', (req, res) => { //เรียกดูทั้งหมด
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Come error occurred while retrieving user",
            });
        } else {
            res.send(data);
        }
    });
});

//Updata restaurant Data
// http://localhost:5000/apis/restaurants/1
router.put("/user/:id",(req, res)=>{ //อัพเดต จาก id
    const userId = Number.parseInt(req.params.id);

    //เช็คค่าว่าง
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            message : "Content can not empty"
        });
    }
    User.updateById(userId, new User(req.body), (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User not found with this id ${userId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error updating user data with this id " + userId,
            });
            }
        }
        else
        {
            res.send(data);
        }
    });
});

//Delete restaurant data
//http://localhost:5000/apis/restaurants/1
router.delete("/user/:id", (req,res) => { //ลบ จาก id
    const userId = Number.parseInt(req.params.id);
    User.removeById(userId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message : `User not found with this id ${userId}`,
                });
            } else {
                res.status(500).send({
                    message : 
                        "Error deleting user data with this id " + userId,
                });
            }
        } else {
            res.send({ message : "User is deleted successfully" });
        }
    });  
});

module.exports = router;