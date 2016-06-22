var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Sample');
var fun_login=require('../config/login_handle');
var fun_signup=require('../config/signup_handle');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("request found");
});
router.get('/login_options',function(req,res,next){
  res.render('login_options',{title : 'Login Options'});
});
router.get('/login',function(req,res,next){
  res.render('login',{title : 'Login', error: ''});
});
router.post('/login',function(req,res,next){
console.log("Login post worked\n");
  fun_login(req,res);
});
router.get('/signup_options',function(req,res,next){
  res.render('signup_options',{title : 'Signup Options'});
});
router.get('/signup',function(req,res,next){
  res.render('signup',{title : 'Signup'});
});
router.post('/signup',function(req,res,next){
  console.log("signup post worked\n");
  fun_signup(req,res);
});
module.exports = router;
