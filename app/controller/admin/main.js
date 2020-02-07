'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async login() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }

  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
                  "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { 'openId': openId };
      this.ctx.body = {'data':'登录成功', 'openId': openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {

    let tmpArticle= this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isScuccess:insertSuccess,
      insertId:insertId
    };
  }
  async updateArticle() {
    let tempArticle = this.ctx.request.body
    
    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;
    // console.log(updateSuccess);
    this.ctx.body={
      isScuccess: updateSuccess
    }
  }
 //获得文章列表
  async getArticleList() {

    let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.view_count as view_count,'+
                'article.part_count as part_count,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '

    const resList = await this.app.mysql.query(sql)
    this.ctx.body={list:resList}

  }
  
  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article',{'id':id})
    this.ctx.body = {
      data:res
    }
  }
  
  async getArticleById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.article_content as article_content,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
              'article.view_count as view_count,' +
              'type.typeName as typeName,' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.ID = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  async Registered() {
    let tempUser = this.ctx.request.body;
    let userName = tempUser.userName;
    let sql = "SELECT userName = '" + userName + "' FROM admin_user";
    const res = await this.app.mysql.query(sql);
    console.log('result', res)
    const result = await this.app.mysql.insert('admin_user', tempUser);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    console.log('user:', tempUser);
    this.ctx.body ={
      isScuccess:insertSuccess,
      insertId:insertId,
      data: '注册成功'
    }
  }
}

module.exports = MainController;
