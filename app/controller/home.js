'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { app,ctx } = this;
    ctx.body = "Hello,welcome to edu backend";
  }
}

module.exports = HomeController;
