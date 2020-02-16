
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('../models/Blogs')
const ejs = require('ejs');
const passport = require('passport');
const local = require('passport-local-mongoose')
const User = require('../models/User')


router.use(bodyParser.urlencoded({extended:true}))


function auth(req,res, next){
    console.log(req.isAuthenticated)
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/user/login')
    }
}

function verifyAdmin(req,res,next){
    User.findOne({_id:req.user._id}, (err, user) => {
        // console.log(req.user)
        if(err) {
            var err = new Error("You are not authorised to this !!!");
            err.statusCode = 403;
            next(err);
        } else if(user.admin === true) {
                return next()        
        } else {
            var err = new Error("You are not authorised to this !!!");
            err.statusCode = 403;
            next(err);
        }
    })
}


router.get('/user',auth, verifyAdmin, async(req,res) => {
   try {
       User.find({}, (err, data) => {
          if(err) {
              console.log(err)
          } else {
            res.render('admin.ejs',{data:data})
          }
       })
   } catch (error) {
       console.log(error)
   }
})







module.exports = router