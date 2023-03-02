const express=require('express');
const app=express();
var router=express.Router();
const db=require('../database/database');
const format=require('date-format')


function avlable(startTime,endTime,roomType){
    let check=true;

    //Checking into the database
    db.execute(`SELECT * FROM booking WHERE room_type="${roomType}" AND start_time<=${startTime} AND end_time>=${startTime}
    OR start_time>=${endTime} AND end_time<=${endTime}`).then((result)=>{

        let len=result[0].length;
        console.log(result[0]);
        if(roomType=='A' && len>3) check=false;
        if(roomType=='B' && len>2) check=false;

    }).catch((err)=>{
        console.log(err);
        check=false;
    })

    return check;

};

router.post('/bookRoom',(req,res)=>{
        console.log(req);
        var{email:userEmail,roomType,startTime,endTime,paymentMode}=req.body;

        var date1=format(startTime);
        var date2=format(endTime);
        startTime=new Date(date1).getTime()
        endTime=new Date(date2).getTime()
        console.log(startTime)
        console.log(endTime)


    
    if(avlable(startTime,endTime,roomType)){

        let amount=0;
        if(roomType=='Single room (50 Rs per hour)'){
            amount=(50*(endTime-startTime))/36000;
        }
        if(roomType=='Double room (100 Rs per hour)'){
            amount=(100*(endTime-startTime))/36000;
        }

        //Insert the value into the table
        let check=true;
        db.execute(`INSERT INTO booking VALUES (${0},"${userEmail}","${roomType}",${startTime},
        ${endTime},"${paymentMode}",${amount})`).then().catch((err)=>{
            console.log(err);
        })
        res.json({isAvl:true});

        }
        else{
            res.json({isAvl:false})
        }
    
})


module.exports=router;