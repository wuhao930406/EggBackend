'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');


class HomeController extends Controller {
  async index() {
    const { app,ctx } = this,
    {query} = ctx;
    ctx.body = query.username+"sb";
  }
}

HomeController.prototype.wechat = wechat({
  token: 'tianyuantupo2.0',
  appid: 'wx60399ad3e55aebdf',
  encodingAESKey: ''
}).middleware(async (message, ctx) => {
  // TODO
});

module.exports = HomeController;
