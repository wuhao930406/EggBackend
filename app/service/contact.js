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
class ContactService extends Service {

  async getcontact() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let contact = await conn.select("contact");
      let model = await conn.select("contact_model");
      return {
        code: 200,
        data: {
          contact:contact[0],
          model
        },
        message: ``
      };
    }, ctx);
    return result;

  }

  async insertqrcode(file) {
    let { app, ctx } = this;
    //写入单个文件并insert到数据库
    //创建读取流
    const reader = fs.createReadStream(file.filepath);
    //获取后缀
    const ext = file.filename.split('.').pop(),
      time = new Date().getTime();
    //重命名
    const filename = `${time}.${ext}`;
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, '../public/qrcode/') + `/${filename}`,
      data = {
        url: `/public/qrcode/${filename}`,
      };
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return {
      code: 200,
      data: data,
      message: `上传成功`
    };
  }

  async updatecontact(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("contact");
      await conn.delete("contact_model");
      let res;
      if (data) {
        await conn.insert("contact", data.contact);
        await conn.insert("contact_model", data.model);
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

module.exports = ContactService;