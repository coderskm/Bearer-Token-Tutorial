const {UnauthenticatedError} = require("../errors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    //console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("No Token Provided");
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
      
    } catch (err) {
      throw new UnauthenticatedError("Not Authorized");
    }
  
};

module.exports = authentication;
