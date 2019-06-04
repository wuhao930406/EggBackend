const Service = require('egg').Service;

class UserService extends Service {
  async find(curuser) {
    const {app} = this;
    const user = await app.mysql.select("user",curuser);
    let res = user.filter((item)=>{return item.username==curuser.username}),result;
    if(res.length==0){
        result = {code:201,message:"没有该用户"}
    }else{
        res[0].password==curuser.password?
        result = {code:200,message:"登陆成功"}:
        result = {code:201,message:"密码不正确"}
    }

    return result;
  }
}

module.exports = UserService;