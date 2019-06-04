'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { app,ctx } = this;
    let reqbody = ctx.request.body;
    let user = await ctx.service.user.find({
      username:reqbody.username,
      password:reqbody.password
    }); 
    ctx.body = user;
  }
}

module.exports = UserController;
