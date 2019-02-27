var express=require('express')
let jwt=require('jsonwebtoken');
let UserModel=require('../models/user.model');
const querystring = require('querystring');
module.exports.loginApiFunction=function(req,res,next){
    console.log('Login api calling');
    console.log(req.body);
    jwt.sign(req.body,'abbbfdfkjfghkjghkjgkgh',{expiresIn:'5h'},(err,token)=>{
        if(err){
            res.status(403).send("Failed to create token");
        }
        else{
            UserModel.findOne({
                // email : req.query.email
                email :  req.body.email
            })
            .then(doc => {
                // req.session.user=doc;

                
                res.json({
                    token,
                    doc
                })
                // next()
            })
            .catch(err =>{
                res.status(500).json(err)
                // next()
            })
          
        }
      
    });
}


module.exports.getUserData=function (req,res,next){
    // console.log(querystring.unescape(req.query.email)) for encoding query parameter value
    jwt.verify(req.token,'abbbfdfkjfghkjghkjgkgh',(err,authData)=>{
        console.log("JWT",req.token);
        if(err){
            res.status(401).send("Unauthorized user");
        }
        else{
            UserModel.findOne({
                email : req.query.email
            })
            .then(doc => {
                res.json(doc)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
        }
    })
}


module.exports.saveUserData=function(req,res,next){
    let model=new UserModel(req.body)
            model.save()
            .then(doc=>{
                console.log(doc);
                if(!doc || doc.length ===0){
                    return res.status(500).send(doc)
                }
                // res.status(200).send(doc,authData)
                res.status(200).json({userDetail:doc,Success:true,message:'User Saved Sucessfully...!!!'})
            })
            .catch(err =>{
                res.status(500).json(err)
            })
}


module.exports.updateUserData= function(req,res,next){
    jwt.verify(req.token,'abbbfdfkjfghkjghkjgkgh',(err,authData)=>{
        if(err){
            res.status(401).send("Unauthorized user");
        }
        else{
            UserModel.findOneAndUpdate({
                email:req.query.email
            },req.body,{
                new:true
            })
            .then(doc =>{
                res.send({userDerail:doc,message:'User Updated Sucessfully...!!!'})
            })
            .catch(err =>{
                res.status(500).json(error)
            })
        }
    })
}


module.exports.deletUserData=function(req,res,next){
    jwt.verify(req.token,'abbbfdfkjfghkjghkjgkgh',(err,authData)=>{
        if(err){
            res.status(401).send("Unauthorized user");
        }
        else{
            UserModel.findOneAndRemove({
                email:req.query.email
            })
            .then(doc =>{
                res.json({userDetails:doc,message:'User Deleted Sucessfully...!!!'})
            })
            .catch(err =>{
                res.status(500).json(error)
            })
        }
    })
}
