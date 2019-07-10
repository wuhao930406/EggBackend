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
      return {
        code: 200,
        data: {
          coursedesc: coursedesc[0].coursedesc,
          cmodule,
          cpro
        },
        message: ``
      };
    }, ctx);
    return result;
  }

  async getschool() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let schooldesc = await conn.select("service_all_desc");
      let spro = await conn.select("school_pro");
      return {
        code: 200,
        data: {
          schooldesc: schooldesc[0].schooldesc,
          spro
        },
        message: ``
      };
    }, ctx);
    return result;
  }

  async getedu() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let edudesc = await conn.select("service_all_desc");
      let epro = await conn.select("edu_pro");
      return {
        code: 200,
        data: {
          edudesc: edudesc[0].edudesc,
          epro
        },
        message: ``
      };
    }, ctx);
    return result;
  }

  async insertcourse(file, type) {
    let { app, ctx } = this;
    //创建读取流
    const reader = fs.createReadStream(file.filepath);
    //获取后缀
    const ext = file.filename.split('.').pop(),
      time = new Date().getTime();
    //重命名
    const filename = `${time}.${ext}`;
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, '../public/course/' + type) + `/${filename}`,
      data = {
        url: `/public/course/${type}/${filename}`,
      };
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    console.log(upStream)
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return {
      code: 200,
      data: data,
      message: `上传成功`
    };
  }

  async insertedu(file) {
    let { app, ctx } = this;
    //创建读取流
    const reader = fs.createReadStream(file.filepath);
    //获取后缀
    const ext = file.filename.split('.').pop(),
      time = new Date().getTime();
    //重命名
    const filename = `${time}.${ext}`;
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, '../public/edu/') + `/${filename}`,
      data = {
        url: `/public/edu/${filename}`,
      };
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    console.log(upStream)
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return {
      code: 200,
      data: data,
      message: `上传成功`
    };
  }

  async deletedu(data) {
    let { app, ctx } = this;
    console.log()
    let filePath = path.join(__dirname, "..", data.url), 
    result = await fs.unlink(filePath, function (err) {
      if (err) {
        return result = {
          code: 201,
          data: err,
          message: `删除失败`
        };
      }
      return result = {
        code: 200,
        data: filePath,
        message: `删除成功`
      };
    })

    return result;
  }



  async updatecourse(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("course_module");
      await conn.delete("course_pro");
      await conn.update("service_all_desc", { coursedesc: data.coursedesc }, {
        where: {
          id: 1
        }
      });
      let res;
      if (data) {
        await conn.insert("course_module", data.cmodule);
        await conn.insert("course_pro", data.cpro);
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

  async updateschool(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("school_pro");
      await conn.update("service_all_desc", { schooldesc: data.schooldesc }, {
        where: {
          id: 1
        }
      });
      let res;
      if (data) {
        await conn.insert("school_pro", data.spro);
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

module.exports = ServiceService;