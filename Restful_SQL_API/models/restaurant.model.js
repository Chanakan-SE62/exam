const  sql = require("./db");   

//Create Constructor
const Restaurant = function(restaurant) {
    this.id = restaurant.id;
    this.name = restaurant.name; 
    this.type = restaurant.type; 
    this.imageurl = restaurant.imageurl; 
};

//Method
//Insert Data
Restaurant.create = (newRestaurant, result) => {
    
    sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res)=>{
        if(err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("create restaurant:", { id:res.insertId, ...newRestaurant });
        result(null, { id:res.insertId, ...newRestaurant })
    });
};

//Get Data By ID
Restaurant.getById = (restaurantId, result) => {
    
    sql.query(
        `SELECT * FROM restaurants WHERE id = ${restaurantId}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                result(null, res[0]);
                return;
            }
            
            result({ kind: "not_found" }, null);
        }
    );
};   

//Get all Restaurant
Restaurant.getAll = (result) => { //เอามาทั้งหมด
    
    sql.query("SELECT * FROM restaurants", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

//Update Restaurant by Id
Restaurant.updateById = (id, restaurant, result) => { 
    
    sql.query("UPDATE restaurants SET name=?, type=?, imageurl=? WHERE id=?", 
        [restaurant.name, restaurant.type, restaurant.imageurl, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" });
                return;
            }
            
            result(null, { id: id, ...restaurant });    
        }
    );
};

//Delete Restaurant by Id
Restaurant.removeById = (id, result) => {
    
    sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error : ", err)
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "noy_found"}, null);
            return;
        }
        console.log("Deleted restaurant with id: ", id);
        result(null , res);
    });
};   

Restaurant.removeAll = () => {}

module.exports = Restaurant;