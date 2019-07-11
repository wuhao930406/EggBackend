'use strict';

const Controller = require('egg').Controller;

class CooperateController extends Controller {
  async getcooperate() {
    const { app, ctx } = this;
    let result = await ctx.service.cooperate.getcooperate();
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async updatecooperate () {
    const { ctx } = this;
    let result = await ctx.service.cooperate.updatecooperate(ctx.request.body);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }


}

module.exports = CooperateController;
