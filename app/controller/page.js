'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');


class PageController extends Controller {

  async getall(){
    const { ctx } = this;
    let result = await ctx.service.page.getall(); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }
  }

  async insert(){
    const { ctx } = this;
    let jumpurl = ctx.request.body;
    let result = await ctx.service.page.insert(ctx.request.files[0],jumpurl); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }
  }

  async delete(){
    const { ctx } = this;
    let result = await ctx.service.page.delete(ctx.request.body); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }

  }

  async update() {
    const { ctx } = this;
    let result = await ctx.service.page.update(ctx.request.body); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }

  }
}

module.exports = PageController;
