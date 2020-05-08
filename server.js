var express = require("express");
var userRouter = require('./router/userRouter');
var app = express();
app.use('/', (req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
  next();
})
app.use('/user', userRouter);
app.listen(3000);