const jwt = require("jsonwebtoken")

// this is router midleware with jwt
// hi is check jwt token and send error if this isn`t correct or empty 
module.exports = (req,res,next) => {
    // get header Bareer
    const token = req.header('Bareer');
        // if token not exist, this send a error message to client else exist, will skip and go to next 
     !token ? res.status(401).send({error : "Access dined!", code: res.statusCode}) : next();

    try{
        // if verified go to next 
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified;
        next();
    }catch(err){
        // else will catch the error
        res.status(400).send({error : "Invalid token!", code: res.statusCode})
    }


}