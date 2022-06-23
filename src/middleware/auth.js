const jwt = require('jsonwebtoken')
exports.authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-api-key"];
    if (!token) return res.send({status : false ,msg : "token is not present in the headers"});

    const decodedToken = jwt.verify(token,"functionup-radon")
    if (!decodedToken) return res.send({status : false , msg:"token is not valid"});

    next();
}


exports.authorise = function(req, res, next) {
    let token = req.headers["x-api-key"]
    const decodedToken = jwt.verify(token,"functionup-radon")
    let userToBeModified = req.params.blogId
   
    let userLoggedIn = decodedToken.userId

    
    if(userToBeModified != userLoggedIn) {res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
}
    next();
}