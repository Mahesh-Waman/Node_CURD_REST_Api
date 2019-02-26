var express=require('express');
const {check,validationResult,body}= require('express-validator/check');


 module.exports.loginvalidate= (req,res,next)=>{
  
    const errors = validationResult(req);
    console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  else{
      next()
  }
}

module.exports.saveuservalidate=function(req,res,next){
  
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  else if(!req.body){
    return res.status(400).send('Request body is missing')
}
  else{
      next()
  }
}

module.exports.updateuserValidate=function(req,res,next){
  // console.log(req.body.length);
  if(!req.query.email){
    return res.status(400).send('Missed URL parameter : email')
  }else if(!req.body){
    return res.status(400).send('Request body is missing')
  }
  else {
    next()
  }
}

module.exports.deleteUserValidate=function(req,res,next){
  if(!req.query.email){
    return res.status(400).send('Missed URL parameter : email')
}
else{
  next()
}
}


