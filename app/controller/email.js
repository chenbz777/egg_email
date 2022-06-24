'use strict';

const Controller = require('egg').Controller;

class EmailController extends Controller {
  async send() {
    const { ctx, service } = this;

    /**
     * @param to {string} - 接收者
     * @param title {string} - 标题
     * @param content {string} - 内容
     * @param attachments {array} - 附件
    */
    const data = ctx.request.body;

    // 数据格式
    const rule = {
      to: [
        { required: true },
      ],
      title: [
        { required: true },
      ],
      content: [
        { required: true },
      ],
    };

    // 拿到验证结果
    const validateResult = await ctx.validate(rule, data);
    // 验证不通过时，阻止后面的代码执行
    if (!validateResult) return;

    const result = await service.email.send(data);

    ctx.result.success(result);
  }
}

module.exports = EmailController;
