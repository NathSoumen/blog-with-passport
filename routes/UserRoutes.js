const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../models/User')
const ejs = require('ejs');
const passportLocalMongoose = require('passport-local-mongoose');
const PassportLocal  = require('passport-local')
const router = express.Router();
router.use(bodyParser.urlencoded({extended:false}));

router.get('/' , (req,res) => {
    res.send('connected')
})
router.get('/signup', (req,res)=> {
    res.render("register")
});
router.get("/login", (req,res) => {
    res.render("login")
})


router.post('/register' ,(req,res) => {
    User.register({username:req.body.username}, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.redirect('/')
        } else {
            passport.authenticate("local")(req,res, () => {
                res.redirect("/blog")
            })
        }
    })
});

router.post('/login', (req,res, next) => {
    const user = new User({
        username :req.body.username,
        password:req.body.password
    })
    req.login(user, (err) => {
        passport.authenticate("local")(req,res, ()=> {
            res.redirect('/blog')
        })
    })
})

router.get("/logout" ,(req,res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router