var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/myDatabase',{ useNewUrlParser: true, useUnifiedTopology: true} )
var db = mongoose.connection;
db.on('err', console.error.bind(console, '数据库链接错误'));
db.once('open', (ok)=>{
  console.log('数据库链接成功');
});
// 创建数据库操作对象
var userSchema = new mongoose.Schema({
  username: String,
  password: String
})
// 创建集合
var Coluser = mongoose.model('userDate', userSchema);
module.exports = Coluser;