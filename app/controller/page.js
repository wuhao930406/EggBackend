'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async update() {
    const { app,ctx } = this;
    let reqbody = ctx.request.body;
    let user = await ctx.service.page.update(); 
    ctx.body = user;
  }
}

module.exports = PageController;
