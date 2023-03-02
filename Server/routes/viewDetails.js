const express=require('express');
var router=express.Router();
const db=require('../database/database')
const format=require('date-format')

//information of upcoming bookings
router.get('/upcoming',(req,res)=>{
        startTime=new Date().getTime();
        var ans=[];
        db.execute(`select * from booking where end_time>${startTime}`).then((result)=>{
            console.log(result[0]);
            ans=result[0];
        }).catch((err)=>{
            console.log(err);
        })
        res.send(ans);
})


//information about passed bookings
router.get('/passed',(req,res)=>{
    startTime=new Date().getTime();
    var ans=[];
    db.exectue(`select * from booking where start_time<${startTime}`).then((result)=>{
        console.log(result[0]);
        ans=result[0];
    }).catch((err)=>{
        console.log(err);
    })
    res.send(ans);
})

module.exports=router;