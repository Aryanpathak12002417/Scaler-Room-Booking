const express=require('express');
var router=express.Router();
const db=require('../database/database')
const format=require('date-format')



router.post('/cancelRoom',async(req,res)=>{
    var {userEmail,startTime,endTime}=req.body;
    var date1=format(startTime);
    var date2=format(endTime);
    startTime=new Date(date1).getTime()
    endTime=new Date(date2).getTime()
    console.log(startTime)
    console.log(endTime)

    
    
})

module.exports=router;