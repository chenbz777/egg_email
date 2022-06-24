'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class ServiceEmail extends Service {
  async send(data) {

    const { app } = this;

    const { to, title, content, attachments } = data;

    const email_config = app.config.email;

    if (!email_config) {
      throw new Error('error_email_config');
    }

    // 封装发送者信息
    const transporter = nodemailer.createTransport(email_config);

    // 邮件参数及内容
    const mailOptions = {
      from: email_config.auth.user, // 发送者
      to, // 接收者,可以同时发送多个,以逗号隔开
      subject: title, // 标题
      html: content, // 内容
      attachments, // 附件
    };

    return await transporter.sendMail(mailOptions);
  }
}

module.exports = ServiceEmail;
