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

class AboutusService extends Service {
  async insert(file, datas) {
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
    let filePath = path.join(__dirname, '../public/work_env/') + `/${filename}`,
      data = {
        ...datas,
        url: `/public/work_env/${filename}`,
        picname: ""
      };
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.insert("work_env", data);
      return {
        code: 200,
        data: data,
        message: `上传${datas.name}成功`
      };
    }, ctx);
    return result;
  }

  async getall() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.select("work_env");
      return {
        code: 200,
        data: res,
        message: null
      };
    }, ctx);
    return result;
  }

  async update(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.get("work_env", { uid: data.uid });
      let postdata = { ...res, picname: data.picname };
      await conn.update("work_env", postdata, {
        where: {
          uid: data.uid
        }
      });
      return {
        code: 200,
        data: postdata,
        message: `操作成功！`
      };
    }, ctx);
    return result;
  }

  async delete(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.get("work_env", { uid: data.uid });
      if (data.uid) {
        await conn.delete("work_env", {
          uid: data.uid
        });
        let filePath = path.join(__dirname, "../", res.url)
        fs.unlink(filePath, function (err) {
          if (err) {
            throw err;
          }
        })

      } else {
        await conn.delete("work_env");
        const dirpath = path.join(__dirname, "../public/work_env")
        delDir(dirpath);
      }

      return {
        code: 200,
        message: `删除成功！`
      };
    }, ctx);

    return result;
  }


  async insertdevlop(file) {
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
    let filePath = path.join(__dirname, '../public/develop/') + `/${filename}`,
      data = {
        url: `/public/develop/${filename}`,
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
  async updatedevlop(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("develop_us");
      let res;
      if (data) {
        res = await conn.insert("develop_us", data);
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

  async getdevlop() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.select("develop_us");
      return {
        code: 200,
        data: res,
        message: ``
      };
    }, ctx);
    return result;
  }

  async updateachieve(data) {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete("achieve_us");
      let res;
      if (data) {
        res = await conn.insert("achieve_us", data);
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

  async getachieve() {
    let { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.select("achieve_us");
      return {
        code: 200,
        data: res,
        message: ``
      };
    }, ctx);
    return result;
  }




}




module.exports = AboutusService;