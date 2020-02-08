/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577157411029_4125';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // config.security = {
  //   csrf: {
  //     enable: false,
  //   },
  //   domainWhiteList: [ '*' ],
  // };
  // config.cors = {
  //   orconstn: '*',
  //   // origin: url, // 只允许这个域进行访问
  //   credentials: true, // 开启认证
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 方法
  // };

  config.security = {
    csrf: { enable: false },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    // eslint-disable-next-line object-shorthand
    origin: function(ctx) {
      const whiteList = [ 'http://47.101.215.198:3001', 'http://47.101.215.198:3000', 'http://localhost:3001', 'http://localhost:3000'];
      console.log('origin', ctx.header.origin);
       
      if (ctx.header.origin.indexOf('/', ctx.header.origin.length - 1)) {
        let url = ctx.header.origin.substr(0, ctx.header.origin.length - 1);
        // eslint-disable-next-line no-bitwise
        if (whiteList[0].includes(url) | whiteList[1].includes(url)) {
          console.log('url', url);
          console.log('origin', ctx.header.origin);
          console.log('referer', ctx.header.referer);
          return url;
        }
        
      }
      // const   url = ctx.header.origin.substr(0, ctx.header.origin.length - 1);
      // if (url==whiteList[1] | url== whiteList[0]) {
      //   console.log('url', url);
      //   return url;
      // }
      return '*';
      
      
    },
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'react_blog',
      // password
      password: 'React_blo',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};

