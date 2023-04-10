const {verify} = require("jsonwebtoken")

const validateToken = (req,res,Next) => {
    const accessToken = req.header("accessToken")

    if(!accessToken) return res.json({error: "User not logged in"})

    try{
        const validToken = verify(accessToken, "importantsecret")

        req.user = validToken;
        if(validToken){
            return Next();
        }
    }catch(err){
        return res.json({error: err})
    }
}

module.exports = {validateToken}