let express=require('express');
let bodyparser= require('body-parser');
let path=require('path');
let session=require('express-session');
let userRoute = require('./routes/user');
var cors = require('cors')
// const expressValidator = require('express-validator');

let app=express();
// app.use(expressValidator());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
app.use((req,res,next)=>{
    console.log(`${new Date().toString()}=>${req.originalUrl}`,req.body)
    next()
})
app.use(session({
    secret:'bfsdjfbsdkjfflsdflsl',resave: false,saveUninitialized:true
}));
app.use(cors());
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization");
//     if(req.method==='OPTIONS'){
//         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
//         return res.status(200).json({});
//     }
//     next();
// })

app.use(userRoute)

app.use(express.static('public'))
// Handles the error for 404- Resource not found
app.use((req,res,next)=>{
    res.status(404).send('we think you are lost!')
})
// Handles the error for 404- Resource not found
app.use((err,req,res,next)=>{
    // res.status(500).send('we think you are lost!')
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/error.html'))
})
const PORT=process.env.PORT || 5000
app.listen(PORT,()=> console.info(`Server has stared on ${PORT}`))