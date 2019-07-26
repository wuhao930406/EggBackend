'use strict';

const Controller = require('egg').Controller;

class PubliceduController extends Controller {
  async getpublic() {
    const { ctx } = this;
    let result = await ctx.service.publicedu.getpublic();
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async insertpublic() {
    const { ctx } = this;
    let result = await ctx.service.publicedu.insertpublic(ctx.request.files[0]);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

    async updatepublic() {
    const { ctx } = this;
    let result = await ctx.service.publicedu.updatepublic(ctx.request.body);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }
}

module.exports = PubliceduController;
