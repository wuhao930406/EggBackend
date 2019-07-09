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
class ServiceService extends Service {

  async getcourse() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let coursedesc = await conn.select("service_all_desc");
      let cmodule = await conn.select("course_module");
      let cpro = await conn.select("course_pro");
      console.log(coursedesc);
      console.log(cmodule);
      console.log(cpro);
      return {
        code: 200,
        data: {
          coursedesc: coursedesc[0],
          cmodule,
          cpro
        },
        message: ``
      };
    }, ctx);
    return result;
  }

  async insertcourse(file,type) {
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
    let filePath = path.join(__dirname, '../public/course/'+type) + `/${filename}`,
      data = {
        url: `/public/course/${type}/${filename}`,
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







}

module.exports = ServiceService;