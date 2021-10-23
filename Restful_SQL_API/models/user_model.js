const  sql = require("./db");   

//Create Constructor
const User = function(user) {
    this.id = user.id;
    this.username = user.username; 
    this.email = user.email;
    this.tel = user.tel;
};

//Method
//Insert Data
User.create = (newUser, result) => {
    
    sql.query("INSERT INTO user SET ?", newUser, (err, res)=>{
        if(err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("create user:", { id:res.insertId, ...newUser });
        result(null, { id:res.insertId, ...newUser })
    });
};

//Get Data By ID
User.getById = (userId, result) => {
    
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
    
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};   

User.updateById = (id, user, result) => {
    
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