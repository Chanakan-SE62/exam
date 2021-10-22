const express = require('express'); //เรียกใช้ฟังก์ชัน express
const router = express.Router();   //เรียกใช้ฟังก์ชัน router
const User = require("../models/user_model");

//http://localhost:5000/apis/restaurants    //แบบPOST
router.post("/user", (req, res) => { //เรียกใช้ฟังก์ชันที่อยู่ในโมเดล
    //Create a restaurant
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
    });

    //Save to Database
    User.create(newUser, (err, data)=>{ //ถ้าสำเร็จจะส่งมาให้ 
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user"
            });
        else res.send(data);
    });
});

//Get restaurant by Id
//http://localhost:5000/apis/restaurants/1    //แบบGET
router.get("/user/:id", (req, res) => {
    const userId = Number.parseInt(req.params.id);
    User.getById(userId, (err, data) => {     //เรียกใช้ออบเจ็กต์
        if (err) {    //ถ้ามีerror
            if (err.kind === 'not_found') {   //ถ้าเจอnot_found ส่งข้อความนี้กลับมา
                res.status(404).send({
                    message : `User not found with this id ${userId}`,
                });
            } else {
                res.sendStatus(500).send({  //ถ้าเกิดerror500 ส่งข้อความนี้กลับมา 
                    message : "User retrieving with this id " + userId,
                });
            }
        } else {
            res.send(data);
        }
    });    
});

//Get all restaurant 
//http://localhost:5000/apis/restaurants    //แบบGET
router.get('/user', (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Come error occurred while retrieving user",    //ถ้ามีจะเอามาโชว์ หรือ ถ้าระบบไม่บอกerrorอะไร จะขึ้นข้อความนี้
            });
        } else {
            res.send(data);
        }
    });
});

//Update restaurant data
//http://localhost:5000/apis/restaurants/1    //แบบPUT
router.put("/user/:id", (req, res) => {
    const userId = Number.parseInt(req.params.id);
    //Check empty body
        if (req.body.constructor === Object && Object.keys(req.body).lenght === 0) {    //เช็คว่าbodyเป็นออบเจ็กต์มั้ย เช็คว่าเท่ากับ0มั้ย ถ้า0ไม่มีค่าข้างใน
            res.status(404).send({
                message : "Content can not be empty !",
            });
        }
        User.updateById(userId, new User(req,body), (err, data) => {
            if (err) {    //ถ้ามีerror
                if (err.kind === "not_found") {   //ถ้าเจอnot_found ส่งข้อความนี้กลับมา
                    res.status(404).send({
                        message : `User not found with this id ${userId}`,
                    });
                } else {
                    res.status(500).send({  //ถ้าเกิดerror500 ส่งข้อความนี้กลับมา 
                        message : 
                            "Error updating user data with this id " + userId,
                    });
                }
            } else {
                res.send(data);
            }
    });  
});

//Delete restaurant data
//http://localhost:5000/apis/restaurants/1    //แบบDELETE
router.delete("/user/:id", (req,res) => {
    const userId = Number.parseInt(req.params.id);
    User.removeById(userId, (err, data) => {
        if (err) {    //ถ้ามีerror
            if (err.kind === 'not_found') {   //ถ้าเจอnot_found ส่งข้อความนี้กลับมา
                res.status(404).send({
                    message : `User not found with this id ${userId}`,
                });
            } else {
                res.status(500).send({  //ถ้าเกิดerror500 ส่งข้อความนี้กลับมา 
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