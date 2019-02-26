let mongoose = require('mongoose')
let schema= mongoose.Schema
mongoose.connect('mongodb://localhost:27017/firstapp', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
let UserSchema=new schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true,
        unique:true
    },
    mobileNo : {
        type :Number,
        required:true,
        unique:true
    }
})

module.exports=mongoose.model('User',UserSchema)