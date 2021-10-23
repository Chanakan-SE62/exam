const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurant.model");


router.post("/restaurants", (req, res) => {
    //Create a restaurant
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        imageurl: req.body.imageurl,
    });

    //Save to Database
    Restaurant.create(newRestaurant, (err, data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the restaurant"
            });
        else res.send(data);
    });
});

//Get restaurant by Id
//http://localhost:5000/apis/restaurants/1
router.get("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.getById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message : `Restaurant not found with this id ${restaurantId}`,
                });
            } else {
                res.status(500).send({
                    message : "Error retrieving with this id " + restaurantId,
                });
            }
        } else {
            res.send(data);
        }
    });    
});

//Get all restaurant 
//http://localhost:5000/apis/restaurants
router.get('/restaurants', (req, res) => {
    Restaurant.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Come error occurred while retrieving restaurant",
            });
        } else {
            res.send(data);
        }
    });
});

//Updata restaurant Data
// http://localhost:5000/apis/restaurants/1
router.put("/restaurants/:id",(req, res)=>{
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){//เช็คค่าว่าง
        res.status(400).send({
            message : "Content can not empty"
        });
    }
    Restaurant.updateById(restaurantId, new Restaurant(req.body), (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Restaurant not found with this id ${restaurantId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error updating restaurant data with this id " + restaurantId,
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
router.delete("/restaurants/:id", (req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.removeById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message : `Restaurant not found with this id ${restaurantId}`,
                });
            } else {
                res.status(500).send({
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