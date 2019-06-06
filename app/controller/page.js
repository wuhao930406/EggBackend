'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');


class PageController extends Controller {
  async update() {
    const { ctx } = this;
    let picarr = await ctx.service.page.dealpic(ctx.request.files); 
    
    ctx.body = {
      code:"200",
      data:JSON.parse(ctx.request.body.data),
      message:"上传成功"
    }
 

  }
}

module.exports = PageController;
