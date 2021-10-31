const  sql = require("./db");

//Create Constructor
const User = function(user) { //กำหนดค่าเริ่มต้น
    this.id = user.id; //
    this.username = user.username;
    this.email = user.email;
    this.tel = user.tel;
};

//Method
//Insert Data
User.create = (newUser, result) => {
    ////INSERT INTO user SET id, name, type, imageurl Values ("1", "KFC", "Fastfood", "url")
    sql.query("INSERT INTO user SET ?", newUser, (err, res)=>{
        if(err) { //ถ้าเจอ error 
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("create user:", { id:res.insertId, ...newUser }); //เป็นค่าที่ส่งขึ้น database
        result(null, { id:res.insertId, ...newUser })
    });
};

//Get Data By ID
User.getById = (userId, result) => {
    //SELECT * FROM restaurants WHERE id = restaurantId
    sql.query(
        `SELECT * FROM user WHERE id = ${userId}`,
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
User.getAll = (result) => {
    //SELECT * FROM restaurants
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};   

//Update by id
User.updateById = (id, user, result) => {
    //UPDATE restaurants SET name = "name", type = "type", imageurl = "imageurl" WHERE id = "id"
    sql.query("UPDATE user SET username=?, email=?, tel=? WHERE id=?", 
        [user.username, user.email, user.tel, id],
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
            
            result(null, { id: id, ...user });    
        }
    );
};   

//Delete Restaurant by Id
User.removeById = (id, result) => {
    //DELETE FROM restaurants WHERE id = ?
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error : ", err)
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "noy_found"}, null);
            return;
        }
        console.log("Deleted user with id: ", id);
        result(null , res);
    });
};   

User.removeAll = () => {}

module.exports = User;