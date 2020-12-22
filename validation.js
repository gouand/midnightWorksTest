const { body, validationResult } = require('express-validator');
// it is a fields validators. Call every time when request is send
const registerValidation = [
    // login must be min 3 chars long, not empty and full alphabetic
    body('name')
    .isLength({min: 3}).withMessage("name have minimum of 3 characters")
                .notEmpty().withMessage("name don't be empty")
                .isAlpha().withMessage("name be an alphabetical"),

    // login must be min 3 chars long and not empty
    body('login')
    .isLength({min: 3}).withMessage("login have minimum of 3 characters")
    .notEmpty().withMessage("login don't be empty"),

    // email must be an email and not empty
    body('email')
    .isEmail().withMessage("email field commit an errors")
    .notEmpty().withMessage("email don't be empty"),

    // password must be at least 5 chars long and not empty
    body('password')
    .isLength({ min: 5 }).withMessage("password have minimum of 5 characters")
    .notEmpty().withMessage("password don`t be empty")
  ];

  const loginValidation = [

    // email must be an email and not empty
    body('email')
    .isEmail().withMessage("email field commit an errors")
    .notEmpty().withMessage("email don't be empty"),

    // password must be at least 5 chars long and not empty
    body('password')
    .isLength({ min: 5 }).withMessage("password have minimum of 5 characters")
    .notEmpty().withMessage("password don`t be empty")
  ];

// get error if they exists
const errors = (req) =>  validationResult(req);




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.errors = errors;