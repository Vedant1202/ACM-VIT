    //
    // Official Website of ACM Student Chapter of Vidyalankar Institute of Technology
    // Copyright (C) 2018  VEDANT NANDOSKAR
    //
    // This program is free software: you can redistribute it and/or modify
    // it under the terms of the GNU Affero General Public License as published by
    // the Free Software Foundation, either version 3 of the License, or
    // (at your option) any later version.
    //
    // This program is distributed in the hope that it will be useful,
    // but WITHOUT ANY WARRANTY; without even the implied warranty of
    // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    // GNU Affero General Public License for more details.
    //
    // You should have received a copy of the GNU Affero General Public License
    // along with this program.  If not, see <https://www.gnu.org/licenses/>.
    //
    // Contact: vedant.nandoskar@gmail.com
    // Source Code: https://github.com/Vedant1202/ACM-VIT
    //
    //===================================================================================================================//
    //===================================================================================================================//


                        //===========================================================================//
                        //                             ACM-VIT Official Website
                        //                                   Backend Setup                           //
                        //===========================================================================//

//***********************************************************************************************************************//

//===========================================================================//
//------------------------------ Initialisation------------------------------//
//===========================================================================//
var express             = require('express'),
    app                 = express(),
    methodOverride      = require("method-override"),
    bodyParser          = require('body-parser'),
    queryMail           = require('./models/queryMail.js'),
    blogs               = require('./models/blogSchema.js')
    mongoose            = require('mongoose'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local'),
    admin               = require('./models/admin.js'),
    javareg             = require('./models/java_reg.js'),
    router              = express.Router();


//set default files to ejs only
app.set('view engine', 'ejs');

// setup bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setup express
app.use(express.static('/app/views'));
app.use(methodOverride('_method'));

// setup mongo database for questions, comments, etc
var url = process.env.DATABASEURL;
mongoose.connect(url, { useNewUrlParser: true });
// Handle the promise deprecation warning
mongoose.Promise = global.Promise;


//=====================================================================//
//--------------------------PASSPORT CONFIG----------------------------//
//=====================================================================//

app.use(require('express-session')({
  secret: process.env.SALTHASHSECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(admin.authenticate()));
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentAdmin = req.user;
  next();
});


//=========================================================================//
//---------------------------------Routes---------------------------------//
//========================================================================//

//Landing page
app.get('/', function (req, res) {
  res.render('landing');
});

//About Us page
app.get('/aboutUs', function (req, res) {
  res.render('aboutUs');
});

//Cirle Pics Page
app.get('/pics', function (req, res) {
  res.render('circlePics');
});

//--------------------------Events page--------------------------//
app.get('/events', function (req, res) {
  res.render('events');
});
//Post to Db for java event page
app.post('/events', function (req, res) {
  var javarreg = {
    name: req.body.name,
    email: req.body.email,
    phoneno: req.body.phoneno,
    rollno: req.body.rollno,
    year:  req.body.year,
    branch:  req.body.branch,
    division:  req.body.division
  }
  // console.log(javarreg);
  //Create a new post and save to Db
  javareg.create(javarreg, function (err, newreg) {
    if(err){
      console.log(err);
    } else {
      console.log("Registered succesfully");
      console.log(newreg);
    }
  });
});



//-------------------Contact Us page------------------------//
app.get('/contactUs', function (req, res) {
  res.render('contactUs');
});

//Post Query to Db for Contact us page
app.post('/contactUs', function (req, res) {
  //Create a new post and save to Db
  queryMail.create(req.body.queryMail, function (err, newQuery) {
      if(err){
        console.log(err);
      } else {
        //redirect to comments page
        console.log("Message added succesfully");
        res.redirect("/contactUs");
      }
  });
});

//======================================================================//
//-------------------------------MiddleWare-----------------------------//
//======================================================================//

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/signinAdmin");
}

//-----------------------------MiddleWare Ends---------------------------//


//---------------------------------Blogs page------------------------------//

//Retrieve blogs from Db and send to Blogs Page
app.get('/blogs', function (req, res) {
  //get data from DB
  blogs.find({}, function (err, allblogs) {
    if(err){
      console.log(err);
    } else {
      console.log("Blogs retrieved from DB successfully");
      res.render("blogs", {blogs: allblogs});
    };
  }).sort({_id: -1});
});

// Create a new blog
app.get('/blogs/new',isLoggedIn, function (req, res) {
  res.render('newBlog');
});

//Show a Blog
app.get('/blogs/:id', function (req, res) {
  // Find the campground with provided _id
  blogs.findById(req.params.id, function (err, fullBlog) {
    if(err){
      console.log(err);
    } else {
      //then render the page with data belonging to that _id
      res.render('fullBlog', {fullBlog: fullBlog});
    }
  });
});

//Post Blog to Db
app.post('/blogs/new', function (req, res) {
  //Create a new post and save to Db
  blogs.create(req.body.blog, function (err, newBlog) {
      if(err){
        console.log(err);
      } else {
        //redirect to comments page
        console.log("Blog added succesfully");
        res.redirect("/blogs/new");
      }
  });
});

//Delete blogs route
app.delete("/blogs/:id", isLoggedIn, function (req, res) {
   blogs.findByIdAndRemove(req.params.id, function (err) {
     if(err){
       res.redirect("/blogs");
       console.log("error in deleting comment: ", err);
     } else {
       res.redirect("/blogs");
     }
   });
});

//---------------------------Admin login page---------------------------//
app.get('/signinAdmin', function (req, res) {
  res.render('signInAdmin');
});

//Admin login
app.post("/signinAdmin", passport.authenticate("local",
    {
      successRedirect: "/blogs/new",
      failureRedirect: "/signinAdmin"
    }), function (req, res) {
      //Meant to be left blank
});

// logout route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/signinAdmin");
});

//One-time Admin Register Page
app.get('/register', function (req, res) {
  res. render('register');
});

//Register admin for one time only
app.post("/register", function (req, res) {
  var newAdmin = new admin({username: req.body.username});
  admin.register(newAdmin, req.body.password, function (err, admin) {
    if(err){
      console.log("Error in admin: ", err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function (){
      res.redirect("/");
      console.log("Admin added successfully");
    });
  });
});

//----------------------------- Login  Ends -------------------------------//


//Error Page
app.get('*', function (req, res) {
  res.send('Error! Page not found!!');
});

//=======================================================================//
//------------------------------ Setup Server---------------------------//
//======================================================================//

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("ACM-VIT server has started!");
});


//********************************* END *********************************//
