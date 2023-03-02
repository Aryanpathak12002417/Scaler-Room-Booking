const express=require('express');
const app=express();
const db=require('./database/database');
const bkRoute=require('./routes/bookRoom');//booking details route
const crRoute=require('./routes/cancelRoom');//cancel room route
const upRoute=require('./routes/updateRoom');//update details route
const vdRoute=require('./routes/viewDetails');//view Details Route
const cros=require('cors')
//Some important Routes
app.use(cros())
app.use(express.json());
app.use(express.urlencoded());



//Routes MiddleWare
app.use('/bk',bkRoute);
app.use('/cr',crRoute);
app.use('/up',upRoute);
app.use('/vd',vdRoute);




// db.execute('SELECT * FROM Booking').then((result)=>{
//     console.log(result[0]);
// }).catch((err)=>{
//     console.log(err)
// })





app.listen(4000,(req,res)=>{
    console.log('Server is up and running at port 4000')
})