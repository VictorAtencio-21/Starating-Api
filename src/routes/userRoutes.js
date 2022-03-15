const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const session = require('express-session')
const verifyToken = require('../middleware/auth')
require("../../database").connect();


const SECRET = process.env.SECRET || "No tiene variable de entorno, uh? ☺"

const User = require("../models/User");

router.use(express.json());

router.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))
router.use(passport.initialize())
router.use(passport.session())
require("../passport/passportConfig")(passport);

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

router.post("/login", async (req, res, next) => {

    //Using Jwt to authenticate the user 
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('incorrect email address or password');
    //Aqui deberia ir la comparacion de password con bcrypt

    const token = jwt.sign({_id: user._id}, 'secretkey');
    res.json({token});


    //Commented password Auth for now
    /*Aunthenticate*/ 
    /*passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(401).send("Correo o Contraseña incorrecto, por favor inténtelo de nuevo");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Autenticado exitosamente!");
            console.log(req.user);
          });
        }
      })(req, res, next);*/
});

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

//Profile
router.get('/profile', verifyToken, async (req, res) =>{
    //Profile Data
    res.json({"User Data": "data"})
});

//Keeping a log of user requests:
router.use(async (req, res, next) => {
    if(req.body){
        console.table(req.body);
    }
    next();
})

module.exports = router;