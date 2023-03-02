const express=require('express');
var router=express.Router();
const bk=require('./bookRoom');
const db=require('../database/database')

router.get('/updateRoom',(req,res)=>{
    const{userEmail,startTime,endTime,roomType,paymentMode,amount}=req.body;
    startTime=startTime.getTime();
    endTime=endTime.getTime();
    
    db.execute().then().catch((err)=>{
        console.log(err)
        res.status(400).json({updated:false})
        res.end()
    });

    res.status(200).json({updated:true})

})


module.exports=router;