/**
 * @author kun.wang
 * @module toast提示，基于jQuery
 * @date 2016/10/31
 */

 /**
  * 示例: 
  * var toast = require('toast');
  * toast({text: '这是提示信息'});
  */


require('./toast.scss');
function Toast(options) {
    this.options = $.extend({}, Toast.DEFAULTS, options);
}

Toast.DEFAULTS = {
    'text': '提示信息',   // 提示信息
    'timer': 1500         // 显示时间
}
Toast.toastTimer = null;

Toast.prototype.init = function() {
    var self = this,
        template = '<div class="toast">'+this.options.text+'</div>'
    this.destroy();
    $(template).appendTo('body').fadeIn();
    clearTimeout(Toast.toastTimer);
    Toast.toastTimer = setTimeout(function() {
        self.destroy();
    },this.options.timer);
}

Toast.prototype.destroy = function() {
    var selector = $('.toast');
    selector.length && selector.fadeOut().remove();
}

function toast(options) {
    new Toast(options).init();
}

module.exports = toast;
