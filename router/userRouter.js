var express = require("express");
var router = express.Router();

// 引入封装的连接数据库创建集合
var Coluser = require('./db');

// 引入加密
var crypto = require('crypto');

// 引入post请求需要的插件
var bodyParser = require("body-parser");
var uE = bodyParser.urlencoded({extended: false});

// token
var JWT = require('jsonwebtoken');

router.post('/login', uE, (req,res) => {
 
  // 加密后的密码
  var newPass = crypto.createHash('md5').update(req.body.password).digest('hex');
  // 这里写后端数据库连接和对数据的处理
  if(req.body.username && req.body.password){
    Coluser.find({"username": req.body.username, "password": newPass}).then((ok)=>{
      console.log(ok)
      if(ok.length>0) {
        // 登录成功是给一个token
        var userObj = {
          loginok: true
        }
        var mi = 'wertbdkdfidskfk';
        var token = JWT.sign(userObj, mi)
        res.send({state:200, msg:'登录成功！', data: {status: 1}, token});
      } else {
        res.send({state:200, msg:'用户名或密码不正确！！', data: {status: 0}});
      }
    }).catch((err)=>{
      console.log(err)
      res.send({state:203, msg:'登录失败！'})
    })
  }
})
router.post('/register', uE, (req,res) => {
  // 这里写后端数据库连接和对数据的处理
  // 加密
  var newPass = crypto.createHash('md5').update(req.body.password).digest('hex');
  if(req.body.username && req.body.password){
    var demoUser = new Coluser({
      username: req.body.username,
      password: newPass
    })
    // 向数据库注册数据
    demoUser.save().then((ok)=>{
      console.log(ok)
      res.send({state:200, msg:'注册成功！'})
    }).catch((err)=>{
      console.log(err)
      res.send({state:203, msg:'注册失败！'})
    })
  }
})
router.post('/home', uE, (req,res) => {
  var token = req.body.token;
  // 拿到前端传入token后进行解密
  var mi = 'wertbdkdfidskfk';
  JWT.verify(token, mi, (err, data)=>{
    console.log(data)
    if(!data){
      res.send({state:200, msg:'用户未登录', islogin: 0})
    }
    if(data.loginok) {
      res.send({state:200, msg:'用户已经登录', islogin: 1})
    } else {
      res.send({state:200, msg:'用户未登录', islogin: 0})
    }
  })
})
router.get('/logout',(req, res) => {
  var userObj = {
    loginok: false
  }
  var mi = 'wertbdkdfidskfk';
  var token = JWT.sign(userObj, mi)
  res.send({msg: "退出成功", data:token})
})
module.exports = router;