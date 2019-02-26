const { check } = require('express-validator/check');
module.exports.userRequiredData = {
  login: [
    check('email').isEmail().withMessage('Invalid email'),
    check('password','Password does not exists').exists(),
    check('password','Password Minimum at least 5 character').isLength({min : 5})
  ],
  saveUser:[
    check('email','Invalid mail Id').isEmail(),
    check('password','Password Minimum at least 5 character').isLength({min : 5}),
    check('name','Name is not parsent').isAlpha().withMessage('Must be only alphabetical chars').isLength({min:3}).withMessage('Must be at least 3 chars long'),
    check('mobileNo').isNumeric().withMessage("Mobile Number should be numeric").isLength({min:10}).withMessage("Mobile Number not valid").isLength({max:10}).withMessage("Mobile Number Shouldn not be more than 10"),
    check('userName','User Name is not parsent').isLength({min:3}).withMessage('Must be at least 3 chars long')
  ],

}