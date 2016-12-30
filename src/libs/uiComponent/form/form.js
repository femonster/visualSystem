require('./form.scss');
form={
	        // 点击页面关闭弹层
	closePop:function() {
        $(".popUp-layer").on('click', function(e) {
            e.stopPropagation();
           $(this).hide();
        })
    },
    init:function (title,content,h,w) {
        var form = Mustache.render(require('./form.html'),{title:title,content:content});
        $('body').append(form);
        $('.anchor-add').css("height",h);
        $('.anchor-add').css("width",w);
        this.closePop();
    }
};
module.exports=form;