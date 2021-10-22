const express = require('express'); //เรียกใช้ฟังก์ชัน express
const router = express.Router();   //เรียกใช้ฟังก์ชัน router
const Restaurant = require("../models/restaurant.model");

//http://localhost:5000/apis/restaurants    //แบบPOST
router.post("/restaurants", (req, res) => { //เรียกใช้ฟังก์ชันที่อยู่ในโมเดล
    //Create a restaurant
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        imageurl: req.body.imageurl,
    });

    //Save to Database
    Restaurant.create(newRestaurant, (err, data)=>{ //ถ้าสำเร็จจะส่งมาให้ 
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the restaurant"
            });
        else res.send(data);
    });
});

//Get restaurant by Id
//http://localhost:5000/apis/restaurants/1    //แบบGET
router.get("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.getById(restaurantId, (err, data) => {     //เรียกใช้ออบเจ็กต์
        if (err) {    //ถ้ามีerror
            if (err.kind === 'not_found') {   //ถ้าเจอnot_found ส่งข้อความนี้กลับมา
                res.status(404).send({
                    message : `Restaurant not found with this id ${restaurantId}`,
                });
            } else {
                res.sendStatus(500).send({  //ถ้าเกิดerror500 ส่งข้อความนี้กลับมา 
                    message : "Error retrieving with this id " + restaurantId,
                });
            }
        } else {
            res.send(data);
        }
    });    
});

//Get all restaurant 
//http://localhost:5000/apis/restaurants    //แบบGET
router.get('/restaurants', (req, res) => {
    Restaurant.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Come error occurred while retrieving restaurant",    //ถ้ามีจะเอามาโชว์ หรือ ถ้าระบบไม่บอกerrorอะไร จะขึ้นข้อความนี้
            });
        } else {
            res.send(data);
        }
    });
});

//Update restaurant data
//http://localhost:5000/apis/restaurants/1    //แบบPUT
router.put("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    //Check empty body
        if (req.body.constructor === Object && Object.keys(req.body).lenght === 0) {    //เช็คว่าbodyเป็นออบเจ็กต์มั้ย เช็คว่าเท่ากับ0มั้ย ถ้า0ไม่มีค่าข้างใน
            res.status(404).send({
                message : "Content can not be empty !",
            });
        }
        Restaurant.updateById(restaurantId, new Restaurant(req,body), (err, data) => {
            if (err) {    //ถ้ามีerror
                if (err.kind === "not_found") {   //ถ้าเจอnot_found ส่งข้อความนี้กลับมา
                    res.status(404).send({
                        message : `Restaurant not found with this id ${restaurantId}`,
                    });
                } else {
                    res.status(500).send({  //ถ้าเกิดerror500 ส่งข้อความนี้กลับมา 
                        message : 
                            "Error updating restaurant data with this id " + restaurantId,
                    });
                }
            } else {
                res.send(data);
            }
    });  
});

//Delete restaurant data
//http://localhost:5000/apis/restaurants/1    //แบบDELETE
router.delete("/restaurants/:id", (req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.removeById(restaurantId, (err, data) => {
        if (err) {    //ถ้ามีerror
            if (err.kind === 'not_found') {   //ถ้าเจอnot_found ส่งข้อความนี้กลับมา
                res.status(404).send({
                    message : `Restaurant not found with this id ${restaurantId}`,
                });
            } else {
                res.status(500).send({  //ถ้าเกิดerror500 ส่งข้อความนี้กลับมา 
                    message : 
                        "Error deleting restaurant data with this id " + restaurantId,
                });
            }
        } else {
            res.send({ message : "Restaurant is deleted successfully" });
        }
    });  
});

module.exports = router;