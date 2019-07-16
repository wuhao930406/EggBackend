'use strict';

const wechat = require('co-wechat');


module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      const { app, ctx } = this;
      const result = await ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx60399ad3e55aebdf&secret=b22bfdeb20017e931fd6ffd1ef0dc23e', {
        method: "GET",
        dataType: "json",
        headers: this.app.config.headers
      });
      let url = encodeURI('http://257143q68a.zicp.vip:19556/public/WxHxd/html/index.html')
      let btn = {
        "button":[
        {    
             "type":"click",
             "name":"test",
             "key":"V1001_TODAY_MUSIC",
             "url":`https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo#wechat_redirect`,
         }
        ]
      }
      
      const res = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${result.data.access_token}`, {
        method: "POST",
        dataType: "json",
        data: JSON.stringify(btn),
        headers: this.app.config.headers
      });
  
      ctx.body = res;
    }
  }
  // 因为 Egg 需要用类的形式来组织，而 wechat 是通过 middleware 方法来生成中间件
  HomeController.prototype.wechat = wechat({
    token: 'tianyuantupo2.0',
    appid: 'wx60399ad3e55aebdf',
    encodingAESKey: ''
  }).middleware(async (message, ctx) => {
    return 'Hello world!';
  });

  return HomeController;
};



