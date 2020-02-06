'use strict';

module.exports = options => {
  return async function adminauth(ctx, next) {
    console.log(ctx);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  };
};
