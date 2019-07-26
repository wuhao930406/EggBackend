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

class PubliceduService extends Service {
  async getpublic() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.select("all_banner");
      return {
        code: 200,
        data: res,
        message: null
      };
    }, ctx);
    return result;
  }


  async insertpublic(file) {
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
    let filePath = path.join(__dirname, '../public/publicedu/') + `/${filename}`,
      data = {
        url: `/public/publicedu/${filename}`,
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

  async updatepublic(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("all_banner");
      let res;
      if (data) {
        res = await conn.insert("all_banner", data);
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




module.exports = PubliceduService;