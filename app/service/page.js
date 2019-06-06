const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class PageService extends Service {
  async dealpic(fileList) {
    const {app} = this;
    fileList.map((file)=>{
      let timestr  = new Date().getTime(),
      filename = file.filename; 
      fs.writeFile(filename, file, (err)=>{
         console.log(error) 
      })

    })


    const result = "1";
    return result;
  }
}

module.exports = PageService;