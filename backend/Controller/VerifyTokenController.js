import jwt from "jsonwebtoken";

const VerifyToken = (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(400).json({
        status: res.statusCode,
        message: 'Access Denied !'
    })
    

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)        
        req.user = verified
        next() 

    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Invalid Token !'
        })
    }
}

export default VerifyToken;