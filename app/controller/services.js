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

  async updatecourse() {
    const { ctx } = this;
    let result = await ctx.service.services.updatecourse(ctx.request.body);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }


  async getschool() {
    const { app,ctx } = this;
    let result = await ctx.service.services.getschool(); 
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async updateschool() {
    const { ctx } = this;
    let result = await ctx.service.services.updateschool(ctx.request.body);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async getedu() {
    const { app,ctx } = this;
    let result = await ctx.service.services.getedu(); 
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async insertedu() {
    const { ctx } = this;
    let result = await ctx.service.services.insertedu( ctx.request.files[0] );
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async deletedu() {
    const { ctx } = this;
    let result = await ctx.service.services.deletedu( ctx.request.body );
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }
  
}

module.exports = ServiceController;
