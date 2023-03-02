const mysql=require('mysql2');

const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"coli@12345",
    database:"hotel"
})

module.exports=pool.promise();