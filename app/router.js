'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.group({ prefix: '/email' }, router => {
    router.post('/send', controller.email.send);
  });
};
