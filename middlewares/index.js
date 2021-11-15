const admin = require('../config/firebase-config');

class Middleware {
  async decodeToken(req, res, next){
    
    const token = await req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if(decodeValue){
        req.user = decodeValue;
        return next();
      }
      return res.status(401).json({message: "You are not authorized to access this resource"})

    } catch (err) {
      return res.status(500).json(err)
    }  
    }
  }

  module.exports = new Middleware();