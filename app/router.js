'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.all('/', controller.home.wechat);
  router.get('/index', controller.home.index);

  router.get('/getwx', controller.home.getwx);
  router.post('/postwx', controller.home.postwx);
  router.post('/deletewx', controller.home.deletewx);


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

  router.get('/service/getcourse', controller.services.getcourse);
  router.post('/service/insertcourse', controller.services.insertcourse);
  router.post('/service/updatecourse', controller.services.updatecourse);

  router.get('/service/getschool', controller.services.getschool);
  router.post('/service/updateschool', controller.services.updateschool);

  router.get('/service/getedu', controller.services.getedu);
  router.post('/service/insertedu', controller.services.insertedu);
  router.post('/service/deletedu', controller.services.deletedu);
  router.post('/service/updatedu', controller.services.updatedu);

  router.get('/cooperate/getcooperate', controller.cooperate.getcooperate);
  router.post('/cooperate/updatecooperate', controller.cooperate.updatecooperate);

  router.get('/contact/getcontact', controller.contact.getcontact);
  router.post('/contact/insertqrcode', controller.contact.insertqrcode);
  router.post('/contact/updatecontact', controller.contact.updatecontact);

  router.get('/public/getpublic', controller.publicedu.getpublic);
  router.post('/public/insertpublic', controller.publicedu.insertpublic);
  router.post('/public/updatepublic', controller.publicedu.updatepublic);
};
