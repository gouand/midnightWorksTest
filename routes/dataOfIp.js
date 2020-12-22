const router = require('express').Router();
const verifyMidleware = require('./tokenVerifyMiddleware')
const {getData} = require('../functions');
// get ip of client 
router.post('/dataOfIp',verifyMidleware, async (req, res) => {
    const ip = await getData; // function who get data from https://api.ipify.org

    return res.status(200).send({data: "My ip is " + ip, code: res.statusCode});
});



module.exports = router;