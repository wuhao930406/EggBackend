'use strict';

const Controller = require('egg').Controller;

class ContactController extends Controller {
  async getcontact() {
    const { app, ctx } = this;
    let result = await ctx.service.contact.getcontact();
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  async insertqrcode() {
    const { ctx } = this;
    let result = await ctx.service.contact.insertqrcode(ctx.request.files[0]);
    ctx.body = result ? result : {
      code: 201,
      message: "服务器已断开"
    }
  }

  // async updatecontact () {
  //   const { ctx } = this;
  //   let result = await ctx.service.contact.updatecontact(ctx.request.body);
  //   ctx.body = result ? result : {
  //     code: 201,
  //     message: "服务器已断开"
  //   }
  // }


}

module.exports = ContactController;
