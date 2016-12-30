require('../scss/header.scss');
var header = {
	renderDom: function() {
		var temp,header;
		userInfo.userTokensAmount = parseInt(userInfo.userTokensAmount);
		header = Mustache.render(require('../tmp/header.html'));
		$('body').prepend(header);
	},
	init: function() {
		this.renderDom();
	}
}
module.exports = header;
