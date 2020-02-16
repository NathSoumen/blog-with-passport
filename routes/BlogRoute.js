
const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('../models/Blogs')
app.use(bodyParser.urlencoded({extended:true}))

app.get("/blog", function(req, res) {
    Blog.find({}, function(err, foundBlog) {
        if(err){
            console.log(err)
        } else {
            
            res.render('home',{
                 data:foundBlog                 
                //  conLog:postsBlog
                })
        }
    })
   
})
app.get("/blog/new", function(req, res) {
    res.render('new_blog')
})

app.get("/blog/about", function(req, res) {
    res.render("about", {foundAbout:aboutContent})
})

app.get("/blog/contact", function(req, res) {
   res.render("contact", {contactContent:contactContent})
})



//==================GET ROUTE ====================

//==================POST/CREATE ROUTE ====================
app.post("/blog", function(req, res) {  
    // const post = {
    //     title:req.body.blog.title,
    //     doc:req.body.blog.doc
    // };
    
    // postsBlog.push(post);
    // res.redirect("/blog")

    Blog.create(req.body.blog, function(err, foundBlog){
        if(err){
            console.log(err)
            res.redirect("/blog/new")
        } else {
            res.redirect("/blog")
        }
    })
})
//==================POST/SHOW ROUTE ====================
app.get("/blog/:id",function(req,res){

    Blog.findById(req.params.id, function(err,data){
        
        if(err) {
            console.log(err)
        } else {
            res.render("show",{data:data})
        }

    })


    // for(let match of postsBlog){
    //     const storeData =  _.lowerCase(match.title);
    //     const requestedData = _.lowerCase(req.params.id);
    //      if(storeData === requestedData){
    //         res.render('show',{data:match})
    //     } 
    // }

})
//==================POST/Delete ROUTE ====================
app.post('/blog/:id',function(req,res){
    Blog.findByIdAndDelete(req.params.id, (err, record) => {
        if(err) {
            console.log(err)
        } else {
           
            res.redirect('/blog')
        }
    })
})




module.exports = app