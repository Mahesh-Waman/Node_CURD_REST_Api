
let express= require('express');
let router=express.Router();
let validate=require('../middleware/validate');
let commonController=require('../controller/userController')
let schemacheck=require('../Schema/userSchema')
router.get('/api',(req,res)=>{
    res.json({
        message:"Welcome to node api"
    });
});

router.post('/api/login',schemacheck.userRequiredData.login,validate.loginvalidate,commonController.loginApiFunction)


// create a new User
//post localhost:5000/api/saveUserDetails
router.post('/api/saveUserDetails',schemacheck.userRequiredData.saveUser,validate.saveuservalidate,commonController.saveUserData)

// get specific user details
router.get('/api/getUserDetails',verifyToken,commonController.getUserData)

// update userDetails
router.put('/api/updateUserDetails',validate.updateuserValidate,verifyToken,commonController.updateUserData)

// delate user Details
router.delete('/api/deleteUserDetails',validate.deleteUserValidate,verifyToken,commonController.deletUserData)

// Format of Token
// Authorization : Bearer <access_token>

// Verify Token Funtion
function verifyToken(req,res,next){
    // get auth header value
    console.log(req.headers);
    const bearerHeader=req.headers['authorization'];
    console.log(bearerHeader);
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken=bearer[1];
        // set the token
        req.token=bearerToken
        // next middleware
        next();

    }
    else{
        res.status(403).send("Authentication token not passed")
    }
}

module.exports =router