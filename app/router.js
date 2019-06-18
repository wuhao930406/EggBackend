'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);

  router.get('/page/getall', controller.page.getall);//banner图insert
  router.post('/page/bannerinsert', controller.page.insert);//banner图insert
  router.post('/page/bannerupdate', controller.page.update);//banner图update
  router.post('/page/bannerdelete', controller.page.delete);//banner图delete
  


};
