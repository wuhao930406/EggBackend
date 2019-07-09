'use strict';

const Controller = require('egg').Controller;

class ServiceController extends Controller {
  async getcourse() {
    const { app,ctx } = this;
    let result = await ctx.service.services.getcourse(); 
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }


  async insertcourse() {
    const { ctx } = this;
    let result = await ctx.service.services.insertcourse(ctx.request.files[0],ctx.request.body.type);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }



}

module.exports = ServiceController;
