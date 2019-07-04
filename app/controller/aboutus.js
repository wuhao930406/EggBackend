'use strict';

const Controller = require('egg').Controller;

class AboutusController extends Controller {
  async getall(){
    const { ctx } = this;
    let result = await ctx.service.aboutus.getall(); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }
  }

  async insert(){
    const { ctx } = this;
    let jumpurl = ctx.request.body;
    let result = await ctx.service.aboutus.insert(ctx.request.files[0],jumpurl); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }
  }

  async delete(){
    const { ctx } = this;
    let result = await ctx.service.aboutus.delete(ctx.request.body); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }

  }

  async update() {
    const { ctx } = this;
    let result = await ctx.service.aboutus.update(ctx.request.body); 
    ctx.body = result?result:{
      code:201,
      message:"服务器已断开"
    }
  }
}

module.exports = AboutusController;
