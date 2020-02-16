
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('../models/Blogs')
const ejs = require('ejs');
const passport = require('passport');
const local = require('passport-local-mongoose')


router.use(bodyParser.urlencoded({extended:true}))

function auth(req,res, next){
    console.log(req.isAuthenticated)
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/user/login')
    }
}

router.route('/')
.get(auth, async(req,res,next) => {
    try {
        await Blog.find({}, function(err, foundBlog) {
            if(err){
                console.log(err)
            } else {
                // res.json({data:foundBlog})
                res.render('home',{
                     data:foundBlog                 
                    //  conLog:postsBlog
                    })
            }
        })
    } catch (error) {
        console.log(error)
    }
})
.post(auth,async(req,res,next) => {
try {
 await Blog.create(req.body.blog, function(err, foundBlog){
        if(err){
            console.log(err)
            res.redirect("/blog/new")
        } else {
            res.redirect("/blog")
        }
    })
} catch (error) {
    console.log(error)
}


});
///////////////////////////
router.route("/new")
.get(auth,function(req, res) {
    res.render('new_blog')
})
router.route("/about")
.get(function(req, res) {
    res.render("about")
})
router.route("/contact")
.get(function(req, res) {
    res.render("contact")
 })



/////////////////////////////////
router.route("/:id")
    .get(auth,(req,res,next) => {
        Blog.findById(req.params.id, function(err,data){
        
            if(err) {
                console.log(err)
            } else {
                res.render("show",{data:data})
            }
    
        })
    })
    .post(auth,(req,res, next) => {
        Blog.findByIdAndDelete(req.params.id, (err, record) => {
            if(err) {
                console.log(err)
            } else {
               
                res.redirect('/blog')
            }
        })
    })


router.get('*' ,(req,res) => {
    let error = new Error("ThIS URL IS NOT VAILD")
    res.send(error)
})


module.exports = router