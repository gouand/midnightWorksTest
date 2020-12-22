const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {loginValidation, registerValidation, errors} = require('../validation');
const {comparePasswords,emailExists, addCollection, bcryptPassword, getAllDataOfuser, getUserId} = require('../functions')

// user register route 
router.post('/register',registerValidation, async (req, res) => {
        // if fields have an errors 
    if (!errors(req).isEmpty())  return res
                                        .status(400)
                                        .json({ errors: errors(req)
                                                                .array() });
     // check if user exists                                                           
    const result = await emailExists(req.body.email)

    if(!result){
        return res
        .status(400)
        .json({ error: "User already exists", code: res.statusCode});
    }
    

    // client fields data
    const User = {
        name: req.body.name,
        login: req.body.login,
        password: await bcryptPassword(req.body.password),
        email: req.body.email
} 
try{
    // add user to db 
    const saveUser = await addCollection('Users', User);
    // and send response
    res.status(200).send({
        data: saveUser,
        code : res.statusCode
    });
 }catch(err){
     res.status(400).send({error: err, code:res.statusCode});
 }
})

// log in user
router.post('/login', loginValidation, async (req, res) => {
    try{
    if (!errors(req).isEmpty())  return res
                                        .status(400)
                                        .json({ errors: errors(req)
                                                                .array(), code:res.statusCode });
    // checks if the user exists
    const result = await emailExists(req.body.email)
           
    if(result){
        return res
        .status(400)
        .json({ error: "User not exists", code: res.statusCode });
    }

    // check password
const isValid = await comparePasswords(req.body.email, req.body.password)

if(isValid == false) {
    return res
    .status(400)
    .json({ error: "password error" });
}

    //create jwt token 
const token = jwt.sign({ id: getUserId}, process.env.SECRET);
return res
.status(200)
.send({ user: await getAllDataOfuser(), token: token, code: res.statusCode });
}catch(err) {
    res.status(400).send(err);
}
})


module.exports = router;