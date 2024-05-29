const jwt = require('jsonwebtoken');



const genreratetoken = ( userId ,res)=>{
const token =   jwt.sign({ userId },process.env.JWT_SECRET,{
    expiresIn:'12d'
});

 res.cookie('jwt',token,{
    httpOnly:true,
    maxAge: 12 * 24 * 60 * 60 * 1000

 })
};

module.exports = genreratetoken;