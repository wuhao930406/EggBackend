const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

function delDir(path,fn){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          fs.unlinkSync(curPath);
      });
  }
  fn?fn():null
}

class PageService extends Service {
  async insert(file,datas){
    let {app,ctx} = this;
    //写入单个文件并insert到数据库

    //创建读取流
    const reader = fs.createReadStream(file.filepath);
    //获取后缀
    const ext = file.filename.split('.').pop(),
    time = new Date().getTime();
    //重命名
    const filename = `${time}.${ext}`;
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, '../public/banner/') + `/${filename}`,
        data = {
          ...datas,
          url:`/public/banner/${filename}`,
          jumpurl:""
        };
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.insert("banner",data);
      return {
        code:200,
        data:data,
        message:`上传${datas.name}成功`
      };
    }, ctx);
    return result;
  }

  async getall (){
    let {app,ctx} = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.select("banner");
      return {
        code:200,
        data:res,
        message:null
      };
    }, ctx);
    return result;
  }

  async update(data) {
    let {app,ctx} = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.get("banner",{uid:data.uid});
      let postdata = { ...res,jumpurl:data.jumpurl };
      await conn.update("banner",postdata,{
        where: {
          uid:data.uid
        }
      });
      return {
        code:200,
        data:postdata,
        message:`变更${res.name}的跳转地址成功！`
      };
    }, ctx);

    return result;
  }

  async delete(data) {
    let {app,ctx} = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      let res = await conn.get("banner",{uid:data.uid});
      if(data.uid){
        await conn.delete("banner",{
          uid:data.uid
        });
        let filePath = path.join(__dirname,"../",res.url)
        fs.unlink(filePath, function(err){
          if(err){
               throw err;
          }
            console.log('文件:'+filePath+'删除成功！');
          })
        
      }else{
        await conn.delete("banner");
        const dirpath = path.join(__dirname,"../public/banner")
        delDir(dirpath);
      }
      
      return {
        code:200,
        message:`删除成功！`
      };
    }, ctx);

    return result;
  }

}

module.exports = PageService;