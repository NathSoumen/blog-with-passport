//======variables=======

const express =  require('express');
const app =  express();
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const session = require('express-session');
const passport = require('passport');
const passportmongoose = require('passport-local-mongoose')

//Routes Mounted

const test = require('./routes/test');
const UserRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes')


//===========Express middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
//==========express session middleware

app.use(session({
    secret:"This is my first blog",
    saveUninitialized:true,
    resave:false
}))


//Express Passport Middle ware

app.use(passport.initialize());
app.use(passport.session());

//======Connect to DB=======
// mongoose.connect("mongodb://localhost:27017/localBlog_test",
//  { useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex:true} )
 mongoose.connect("mongodb+srv://admin-suman:test123@data-tmp4s.mongodb.net/Blog_post",{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true });


//// Models Mounted
const Blog = require('./models/Blogs');
const User = require('./models/User');
 

//Passport Stretegy for Authentification

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

////======routes=======
app.get("/",(req,res, next) => {
   
    if(req.isAuthenticated()){
        res.redirect('/blog')
    } else {
        res.render("main")
    }

});

app.use("/blog", test);
app.use('/user', UserRoutes);
app.use('/admin', adminRoutes)

//==================Error ROUTE ====================
app.get("*", function(req,res){
    res.render("error")
})
////======routes=======
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log('Server has Started Succesfully!!!!!!!!')
})



