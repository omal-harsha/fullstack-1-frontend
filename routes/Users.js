const express = require('express');
const router = express.Router();
const {Users} = require("../models")
const bcrypt =  require("bcrypt")

const { sign } = require('jsonwebtoken')


router.post("/", async (req,res) =>{
    const {username, password} = req.body;
    bcrypt.hash(password,10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json("sucess");
    })
});

// router.post('/login', async(req,res) =>{
//     const{username, password} = req.body;

//     const user = await Users.findOne( {where: {username: username}})

//     if (!user) res.json({error: "user Doesn't Exist"});
//     bcrypt.compare(password, user.password).then((match) => {
//         if(!match) res.json({error: "Worng password"})

//         res.json("You logged in..!!")
//     })
// })

router.post("/login", async (request, response) => {
    const { username, password } = request.body;
    const user = await Users.findOne( { where: { username: username }});

    if (user) {
        bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
                return response.json({ error: "Wrong username or password" });
            }else{
            
            const accesToken = sign( 
                {username: user.username, id: user.id}, 
                "importantsecret"
                )
            return response.json(accesToken);
            }
            

        });
    } else {
        return response.json({ error: "User does not exist" });
    }
});

module.exports =  router;