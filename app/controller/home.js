'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { app,ctx } = this,
    {query} = ctx;
    ctx.body = query.username+"sb";
  }
}

module.exports = HomeController;
