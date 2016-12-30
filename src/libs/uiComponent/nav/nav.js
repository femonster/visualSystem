
/**
 * @author ruimin.liu
 * @module nav交互逻辑
 * @date 2016/12/12
 */


require('./nav.scss');
require('./nav.config.js');
// var config = navConfig;
var nav = {
	// 切换
	switchNav: function() {
		$('.nav-menu li').on('mouseenter', function(e) {
            e.stopPropagation();
            $(this).addClass('nav-active');
            $(this).addClass('nav-show');
            $(this).find('div').show();
            //$(this).addClass('nav-active').siblings().removeClass('nav-active').end().find('.nav-data-menu').toggle();
        }).on('mouseleave', function(e) {
            e.stopPropagation();
            $(this).removeClass('nav-active');
            $(this).removeClass('nav-show');
            $(this).find('div').hide();
        });
	},
	init: function(config) {
		 var navDom = Mustache.render(require('./nav.html'),{config:config});
         $('.con_nav').append(navDom);
         this.switchNav();
	}
};	
module.exports = nav;