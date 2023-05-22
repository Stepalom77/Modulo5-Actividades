const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('There is not SECRET KEY');
}

const authorizationMiddleware = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({
            code: 'auth/missing-auth-token',
            message: 'There is no token'
        })
    }

    const [prefix, token] = authorization.split(' ');
    if(!token) {
        return res.status(401).json({
            code: 'auth/missing-auth-token',
            message: 'Token invalid'
        })
    }
    if(prefix !== 'Bearer') {
        return res.status(401).json({
            code: 'auth/missing-auth-token',
            message: 'Token invalid'
        })
    }
    
    let decoded = null;
    try{
         decoded = jwt.verify(token, SECRET_KEY);
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message:'Error token'
        })
    }
    
    console.log({decoded});
    const usersLogged = User.findById(decoded.id);
    req.usersLogged = usersLogged;

    next();
}

module.exports = authorizationMiddleware;