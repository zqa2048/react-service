'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_content', {});
    console.log('result', result);
    this.ctx.body = result;
  }
  async getArticleList() {
    const sql = 'SELECT article.ID as ID, ' +
              'article.addTime as addTime, ' +
              'article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.view_count as view_count,' +
              '.type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.ID';
    // sql语句采用字符串拼接的方法，在用query的方式去请求
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }
}
module.exports = HomeController;
