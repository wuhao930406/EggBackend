const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');


class HomeService extends Service {
  async postwx(data){
    let {app,ctx} = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.insert("wxmsg",data);
      return {
        code:200,
        data:res,
        message:`操作成功`
      };
    }, ctx);
    return result;
  }

  async getwx (){
    let {app,ctx} = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.select("wxmsg");
      return {
        code:200,
        data:res,
        message:null
      };
    }, ctx);
    return result;
  }

}




module.exports = HomeService;