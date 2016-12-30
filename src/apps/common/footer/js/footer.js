/**
 * @author kun.wang
 * @module footer交互逻辑
 * @date 2016/10/26
 */


require('../scss/footer.scss');
var footerDom = require('../tmp/footer.html');
var copyDom = require('../tmp/copy.html');
var legelDom = require('../tmp/legal.html');
var footer = {
	// 渲染footer
	renderDom: function() {
		$('body').append(footerDom);
		this.legalInfo();
	},
	// 法律信息
	legalInfo: function() {
		var self = this;
		$('.legal').on('click',function() {
			$(legelDom).appendTo('body').fadeIn();
			$('.layer-box-footer').css('transform','translate3d(-50%, -50%, 0) scale(1)');
			self.copyInfo();
			self.close();
		})
	},
	// 版权信息
	copyInfo: function() {
		var self = this;
		$('.copyright').on('click',function() {
			$('.layer-shade-footer').empty().append(copyDom);
			$('.layer-box-footer').css('transform','translate3d(-50%, -50%, 0) scale(1)');
			self.close();
		})
	},
	// 弹层关闭
	close: function() {
		$('.layer-close-footer').on('click',function() {
			$('.layer-box-footer').css('transform','translate3d(-50%, -50%, 0) scale(0.1)');
			setTimeout(function() {
				$('.layer-shade-footer').fadeOut().remove();
			},300);
		})
		$(document).on('click',function(e) {
			if($(e.target).hasClass('layer-shade-footer')) {
				$('.layer-box-footer').css('transform','translate3d(-50%, -50%, 0) scale(0.1)');
				setTimeout(function() {
					$('.layer-shade-footer').fadeOut().remove();
				},300);
			}
			e.stopPropagation();
		})
	},
	init: function() {
		this.renderDom();
	}
}	
module.exports = footer;