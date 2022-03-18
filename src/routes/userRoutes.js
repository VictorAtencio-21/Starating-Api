const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')
require("../utils/database").connect();

const User = require("../models/User");

router.use(express.json());

router.post("/register", async (req, res) => {
    var error = []; // <- string array that determines which error there is **NOT-FINAL**
    const {name: nam, lastname: last, username: usernam, email: emaill, password: pass} = req.body;

    //Verifying logic
        /*Verify username (unique)*/
    try {
       let newUsern = await User.findOne({username: usernam});
       if(!(newUsern == null)){
           error.push("Ese nombre de usuario ya existe. Por favor ingrese un nombre de usuario diferente.")
       }
    } catch (error) {
        console.log(error.message);
    }
    
        /*Verify email (unique)*/
    try {
       let newEmail = await User.findOne({email: emaill});
       if(!(newEmail == null)){
           error.push("Ese correo ya está registrado con otro usuario. Por favor ingrese un correo diferente.")
       }
    } catch (error) {
        console.log(error.message);
    }
    
    if(error.length == 0){
        try {
            /*Register logic to the mongo database*/ 
            const newUser = new User({name: nam, lastname: last, username: usernam, email: emaill, password: pass});
            newUser.password = await newUser.encryptPassword(newUser.password);
            
            await newUser.save();

            const token = jwt.sign({_id: newUser._id}, 'secretkey')

            res.status(200).json({token});
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.status(400).json({errors: error});
    }
});

router.post("/login", async (req, res) => {

    //Using Jwt to authenticate the user 
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('incorrect email address. Please try again');
    //Aqui deberia ir la comparacion de password con bcrypt
    // aquí esta pibe v
   const match = await bcrypt.compare(password, user.password);

    if(!(match)){
        return res.status(401).send('incorrect password for that email address. Please try again');
    }

    const token = jwt.sign({_id: user._id}, 'secretkey');
    res.json({token})
});

//User Page
router.get("/user/:username", verifyToken ,async (req, res) => {
    const username = req.params.username;
    /*Obtain info from user = username*/
    const user = await User.findOne({username});
    /*Show said info */
    
    if(username) return res.json(user);
    else return res.status(400).send("No user was found though... It's not in our database.");
})

//Testing route NONFINAL
router.get('/getUsers', verifyToken, async (req, res) =>{
    try {
        const x = await User.find();
        console.log(x);
        res.send(x);
    } catch (error) {
        console.log(error.message);
    }
});

//Keeping a log of user requests:
router.use(async (req, res, next) => {
    if(req.body){
        console.table(req.body);
    }
    next();
})


module.exports = router;