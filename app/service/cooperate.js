const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

function delDir(path, fn) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      fs.unlinkSync(curPath);
    });
  }
  fn ? fn() : null
}
class CooperateService extends Service {

  async getcooperate() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let adv = await conn.select("cooperate_adv");
      let model = await conn.select("cooperate_model");
      return {
        code: 200,
        data: {
          adv,
          model
        },
        message: ``
      };
    }, ctx);
    return result;
  }

  async updatecooperate(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("cooperate_adv");
      await conn.delete("cooperate_model");
      let res;
      if (data) {
        await conn.insert("cooperate_adv", data.adv);
        await conn.insert("cooperate_model", data.model);
        res = "操作成功"
      } else {
        res = "暂无数据"
      }
      return {
        code: 200,
        data: res,
        message: `操作成功！`
      };
    }, ctx);
    return result;
  }



}

module.exports = CooperateService;