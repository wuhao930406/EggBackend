'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);

  router.get('/page/getall', controller.page.getall);//banner图
  router.post('/page/bannerinsert', controller.page.insert);//banner图insert
  router.post('/page/bannerupdate', controller.page.update);//banner图update
  router.post('/page/bannerdelete', controller.page.delete);//banner图delete
  
  router.get('/page/getadv', controller.page.getadv);//index优势
  router.post('/page/updateadv', controller.page.updateadv);//index优势 update

  router.get('/page/getaboutus', controller.page.getaboutus);//关于我们查找
  router.post('/page/updateaboutus', controller.page.updateaboutus);//更新我们

  router.get('/page/getservice', controller.page.getservice);//服务
  router.post('/page/updateservice', controller.page.updateservice);//服务更新

  router.get('/about/getenv', controller.aboutus.getall);//banner图
  router.post('/about/envinsert', controller.aboutus.insert);//banner图insert
  router.post('/about/envupdate', controller.aboutus.update);//banner图update
  router.post('/about/envdelete', controller.aboutus.delete);//banner图delete

  router.post('/about/insertdevlop', controller.aboutus.insertdevlop);//banner图
  router.post('/about/updatedevlop', controller.aboutus.updatedevlop);//banner图
  router.get('/about/getdevlop', controller.aboutus.getdevlop);//banner图

  router.post('/about/updateachieve', controller.aboutus.updateachieve);//banner图
  router.get('/about/getachieve', controller.aboutus.getachieve);//banner图
  

};
