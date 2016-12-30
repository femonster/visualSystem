/**
 * @author kun.wang
 * @module 登录注册弹层
 * @date 2016/10/26
 */

require('./login.scss');
var toast = require('toast');

var Login = function(options) {
    this.options = $.extend({}, Login.DEFAULTS, options); 
}

// 图形验证码
var reg_code_shade = require('./tmp/regCode.html');

Login.DEFAULTS = {
	'type': 0    // 弹层类型  0.登录 1.注册
}
Login.keys = {};
// 加载弹层
Login.prototype.renderDom = function() {
	var furl = location.href.replace('http://zhibo.renren.com/','');
	var shade = Mustache.render(require('./tmp/login.html'),{furl:furl});
	$(shade).appendTo('body').fadeIn();
	// $('.layer-box-login').css('transform','translate3d(-50%, -50%, 0) scale(1)');
	$('.layer-box-login').css('transform','scale(1)');
	$('.tab-item:eq('+this.options.type+')').addClass('tab-active');
	$('.form-box:eq('+this.options.type+')').show();
	this.tabSwitch();
	this.close();
	this.getCode();
	this.logSubmit();
	this.regSubmit();
	this.clickCaptcha();
}

// 引入加密需要的js
Login.prototype.importRSA = function() {
	var RSA = $('<script type="text/javascript" src="http://s.xnimg.cn/a85738/wap/mobile/wechatLive/js/RSA.js"></script>'),
		BigInt = $('<script type="text/javascript" src="http://s.xnimg.cn/a85738/wap/mobile/wechatLive/js/BigInt.js"></script>'),
		Barrett = $('<script type="text/javascript" src="http://s.xnimg.cn/a85738/wap/mobile/wechatLive/js/Barrett.js"></script>');
	$('head').append(RSA).append(BigInt).append(Barrett);

}
// 登录注册切换
Login.prototype.tabSwitch = function() {
	$('.layer-tab-login').on('click',function(e) {
		var target = $(e.target),
			form = target.attr('data-form');
		if(target.hasClass('tab-item')) {
			target.addClass('tab-active').siblings().removeClass('tab-active');
			$('.form-box').hide();
			$('.'+form).show();
		}
	})
}
// 弹层关闭
Login.prototype.close = function() {
	$('.layer-close-login').on('click',function() {
		$('.layer-box-login').css('transform','scale(0.1)');
		setTimeout(function() {
			$('.layer-shade-login').fadeOut().remove();
		},250);
	});
	$(document).on('click',function(e) {
		if(e.target == $('.layer-shade-login')[0]) {
			$('.layer-box-login').css('transform','scale(0.1)');
			setTimeout(function() {
				$('.layer-shade-login').fadeOut().remove();
			},250);
		}
		e.stopPropagation();
	})
}
// 登录表单
Login.prototype.logForm = function() {
	var email,password, result,icode, autoLogin,
		origURL = window.location.href,
		f = encodeURIComponent(document.referrer),
		self = this;
	email = $('.l-uno').val();
	password = $('.l-password').val();
	icode = $('#icode').val();
	remember = $('#remember-me').prop('checked');
	(remember == true) ? (autoLogin = true) : (autoLogin = false);
	result = loginValidate(email,password);
	uts = uniqueTimestamp();
	if(result.flag) {
		if(!$.isEmptyObject(Login.keys)) {
			// 获取密钥成功，执行加密
			password = encryptedString(Login.keys.key,password);
		} 
		$.ajax({
		    type: 'post',
		    dataType: 'json',
		    url: 'http://www.renren.com/ajaxLogin/login?1=1'+ uts,
		    data: {
		    	email: email,
		    	password: password,
		    	autoLogin: autoLogin,
		    	f: f,
		    	origURL: origURL,
		    	captcha_type: 'web_login',
		    	icode: icode,
		    	domain: 'renren.com',
		    	key_id: 1,
		    	rkey: Login.keys.rkey || '',
		    	_rtk: _rtk
		    },
		    success: function(res) {
		        if(res.code == true) {
		        	window.location.href = res.homeUrl;
		        } else {
		        	toast({
		        		text: res.failDescription
		        	})
		        	if(res.catchaCount > 2) {
		        		$('.captcha-log').show();
		        		refreshCode(1);
		        	}
		        }
		    },
		    error: function() {
		    	toast({
		    		text: '网络开小差了,请稍后再试~'
		    	})
		    }
		});	
	} else {
		toast({
			text: result.msg
		});
	}	
}
// 鼠标和键盘触发登录提交
Login.prototype.logSubmit = function() {
	var self = this;
	$('.log-btn').on('click',function() {
		self.logForm();
	})
	$('.l-password').on('keydown',function(e) {
		e.keyCode == 13 && self.logForm();
	})
	$('#icode').on('keydown',function(e) {
		e.keyCode == 13 && self.logForm();
	})
}

// 注册表单
Login.prototype.regForm = function() {
	var email,password, result,icode,
		origURL = window.location.href;
	email = $('.r-phone').val();
	password = $('.r-password').val();
	icode = $('.r-code').val();
	result = loginValidate(email,password,icode);
	if(result.flag) {
		// 加密后验证不通过，所以暂时不加密(跟随主站的逻辑)
		// if(!$.isEmptyObject(Login.keys)) {
		// 	// 获取密钥成功，执行加密
		// 	password = encryptedString(Login.keys.key,password);
		// } 
		$.ajax({
		    type: 'post',
		    dataType: 'json',
		    url: 'http://reg.renren.com/m-v7reg.do',
		    data: {
		    	regEmail: email,
				pwd: password,
				icode: icode,
				ss: '10113',
				action_id: '206218',
				accType: '3',
				g: 'g',
				b: 'b',
				icode_type: 'web_reg',
				requestToken: '',
				_rtk: _rtk
		    },
		    success: function(res) {
		        if(res.code == 0) {
		        	// 注册成功后，刷新当前页面
		        	logRegisterOk(email);
		        	location.replace(location.href);
		        } else {
		        	toast({
		        		text: res.msg
		        	});
		        }
		    },
		    error: function() {
		    	toast({
		    		text: '网络开小差了,请稍后再试~'
		    	})
		    }
		});	
	} else {
		toast({
			text: result.msg
		});
	}	
}

// 鼠标和键盘触发注册提交
Login.prototype.regSubmit = function() {
	var self = this;
	$('.reg-btn').on('click',function() {
		self.regForm();
	})
	$('.r-code').on('keydown',function(e) {
		e.keyCode == 13 && self.regForm();
	})
	$('.r-password').on('keydown',function(e) {
		e.keyCode == 13 && self.regForm();
	})
}

// 获取验证码
Login.prototype.getCode = function() {
	var phone,isOk,
		self = this;
	$('.get-code').on('click',function() {
		phone = $('.r-phone').val();
		if(phone == '') {
			toast({
				text: '手机号不能为空'
			})
		} else if(!(/^1[34578]\d{9}$/.test(phone))) {
			toast({
				text: '请输入正确的手机号'
			})
		} else {
			// 显示图形验证码
			$('body').append(reg_code_shade);
			self.clickCaptcha();
			regCodeClose();
			regCodeCancle();
			regCodeOk(phone);
		}
	})
}

// 获取加密密钥
Login.prototype.getKeys = function() {
	$.ajax({
	    type: 'get',
	    dataType: 'json',
	    url: 'http://login.renren.com/ajax/getEncryptKey',
	    success: function(res) {
	        var data = res;
	        if(data.isEncrypt) {
	        	setMaxDigits(data.maxdigits * 2);
	        	key = new RSAKeyPair(data.e, "null", data.n);
	        	Login.keys.key = key;
	        	Login.keys.rkey = data.rkey;
	        }
	    },
	    error: function() {
	    }
	});
}

// 点击变换图形验证码
Login.prototype.clickCaptcha = function() {
	$('.verifyPic').on('click',function() {
		var type = $(this).attr('data-type');
		refreshCode(type);
	})
}
Login.prototype.init = function() {
	this.importRSA();
	this.renderDom();
	this.getKeys();
}

// 验证码60s倒计时
function secondsDown(count) {
	if(count == 1) {
		$('.get-code').attr('disabled',false).val('获取验证码');
	} else {
		count--;
		$('.get-code').val(count+'秒重新发送');
		setTimeout(function(){
			secondsDown(count);
		},1000);
	}
}

// form提交前的验证
function loginValidate(email,password,icode) {
	if(email == '') {
		return {
			flag: false,
			msg: '请输入手机号码'
		}
	} else if(password == '') {
		return {
			flag: false,
			msg: '密码不能为空'
		}
	} else if(icode == '') {
		return {
			flag: false,
			msg: '验证码不能为空'
		}
	} else {
		return {
			flag: true
		}
	}
}

// 图形验证码刷新
function refreshCode(type){
	if(type == 1) {
		var verifyPic_login = $('#verifyPic_login');
		verifyPic_login.attr('src',verifyPic_login.attr('src').split('&')[0] + '&rnd='+ Math.random());
	} else {
		var verifyPic_reg = $('#verifyPic_reg');
		verifyPic_reg.attr('src',verifyPic_reg.attr('src').split('&')[0] + '&rnd='+ Math.random());
	}

}
function regCodeClose() {
	$('.layer-close').on('click',function() {
		codeClose();
	})
}
function regCodeCancle() {
	$('.layer-cancle').on('click',function() {
		codeClose();
	})
}

function codeClose() {
	$('.layer-shade').fadeOut().remove();
}

// 图形验证码校验成功
function regCodeOk(phone) {
	$('.layer-ok').on('click',function() {
		var icode = $('#r_icode').val();
		$.ajax({
		    type: 'post',
		    dataType: 'json',
		    url: 'http://reg.renren.com/ajax-mobile-code-new.do',
		    data: {
		    	opt: 1,
		    	mn: phone,
		    	icode: icode,
		    	icode_type: 'web_reg',
		    	requestToken: '',
		    	_rtk: _rtk
		    },
		    success: function(res) {
		        if(res.code == "0") {
		        	codeClose();
		        	$('.get-code').val('60秒重新发送').attr('disabled',true);
					secondsDown(60);
		        } else if(res.code == '-1') {
		        	toast({
		        		text: '不可再发送验证码,手机号码已被机主屏蔽'
		        	});
	        	} else if(res.code == '-3') {
	        		toast({
		        		text: '发送次数过多'
		        	});
	        	} else if(res.code == '-4') {
	        		toast({
		        		text: '验证码输入错误'
		        	});
	        	}
	        	$('#r_icode').val('');
	        	refreshCode(0);
		    },
		    error: function() {
		    	toast({
		    		text: '网络开小差了,请稍后再试~'
		    	})
		    }
		});
	})
}


function uniqueTimestamp() {
	var mydate = new Date();
	return "&uniqueTimestamp=" + mydate.getFullYear()
	        + mydate.getMonth() + mydate.getDay() + mydate.getHours()
	        + mydate.getSeconds() + mydate.getUTCMilliseconds();
}

// 注册成功后的埋点
function logRegisterOk(phone) {
	$.ajax({
	    type: 'get',
	    dataType: 'json',
	    url: 'http://zhibo.renren.com/log/register?account'+ phone,
	    success: function(res) {
	    }
	});
}


/*************plugin入口***************/
function login(options) {
	new Login(options).init();
}
module.exports = login;


