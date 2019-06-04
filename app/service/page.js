const Service = require('egg').Service;

class PageService extends Service {
  async update(curuser) {
    const {app} = this;
    const result = "1";
    return result;
  }
}

module.exports = PageService;