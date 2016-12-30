
/**
 * @author ruimin.liu
 * @module nav交互逻辑
 * @date 2016/12/12
 */


require('./page.scss');

var page = {
            // 页码生成规则
        pageGroup: function( pageNum, pageCount ) {
             var pageEach = $('.page-count option:selected').val() || 20;
             pageCount = Math.ceil(pageCount/pageEach);
            if( pageCount > 5 ) {
                switch (pageNum) {
                    case 1:
                        this.pageIcon(1, 5, 0);
                        break;
                    case 2:
                        this.pageIcon(1, 5, 1);
                        break;
                    case pageCount - 1:
                        this.pageIcon(pageCount - 4, pageCount, 3);
                        break;
                    case pageCount:
                        this.pageIcon(pageCount - 4, pageCount, 4);
                        break;
                    default:
                        this.pageIcon(pageNum - 2, pageNum + 2, 2);
                        break;
                }
            } else {
                this.pageIcon( 1, pageCount, pageNum-1 );
            }
        },
        // 生成页码渲染到页面
        pageIcon: function ( page, total, eq ) {
            var myHtml = "";
            for( var i = page; i <= total; i++ ) {
                myHtml += "<li>" + i + "</li>";
            }
            $( '.con_page' + " ul").html( myHtml );
            $( '.con_page' + " ul li").eq(eq).addClass('on');
        },
        // 分页的点击事件：点击跳转/指定页跳转/上一页下一页/首页和尾页
        pageNav: function( now, pageCount, parUnion ) {
            this.pageGroup( now, pageCount );
            var self = this;
            // 点击跳转
            var eachNum = $('.page-count option:selected').val() || 20;
            $(document).off('click', parUnion + ' li');
            $(document).on('click', parUnion + ' li',function(){
                var pageNum = parseInt($(this).html());
                self.pageGroup( pageNum, pageCount );
                var page = $( parUnion + " li.on").html();
                var date={'page':page,'eachNum':eachNum};
                // self.anchorAjax( date );
            })
            // 跳转指定页
            $( parUnion + " .page-jump-button").off();
            $( parUnion + " .page-jump-button").on('click',function(){
                var num = parseInt($( parUnion + ' .page-jump-text').val());
                if( /^[1-9]\d*$/.test(num) && num<=pageCount ) {
                    self.pageGroup( num, pageCount );
                } else {
                    alert('请输入正确的数字');
                }
                var page = $( parUnion + " li.on").html();
                // 传入当前页数给页数处理函数
                var date={'page':page,'eachNum':eachNum};
                // self.anchorAjax( date );
            })
            //点击上一页/下一页触发
            $( parUnion + " .page-up").off();
            $( parUnion + " .page-up").on('click',function(){
                var page = parseInt( $( parUnion + " li.on").html() - 1 );
                self.pageGroup( page, pageCount );
                var date={'page':page,'eachNum':eachNum};
                // self.anchorAjax( date );
            });
            $( parUnion + " .page-down").off()
            $( parUnion + " .page-down").on('click',function(){
                var page = parseInt( $( parUnion + " li.on").html()) + 1;
                if( page > pageCount ) {
                    return;
                }
               self.pageGroup( page, pageCount );
                var date={'page':page,'eachNum':eachNum};
                // self.anchorAjax( date );
            });
            // 点击第一页/最后一页
            $( parUnion + " .page-first").off();
            $( parUnion + " .page-first").on('click',function(){
                if( pageCount > 5 ) {
                    self.pageIcon( 1, 5, 0 )
                } else {
                    self.pageIcon( 1, pageCount, 0 );
                }
                var page = $( parUnion + " li.on").html();
                var date={'page':page,'eachNum':eachNum};
                // self.anchorAjax( date )

            })
            $( parUnion + " .page-last").off();
            $( parUnion + " .page-last").on('click',function(){
                if( pageCount > 5 ) {
                    self.pageIcon( pageCount-4, pageCount, 4 );
                } else {
                    self.pageIcon( 1, pageCount, pageCount-1)
                }
                var page = $( parUnion + " li.on").html();
                var date={'page':page,'eachNum':eachNum};
                // self.anchorAjax( date )
            })
        },
        // 当前/总页数显示
        pageSet: function( now, alldata, parUnion ) {
            var myNow = now || 1;
             var pageEach = $('.page-count option:selected').val() || 20;
             pageCount = Math.ceil(25/pageEach);
            $( parUnion ).find('.page-number-now').html(myNow);
            $( parUnion ).find('.page-number-total').html(pageCount);
            $( parUnion ).find('.page-number-all').html(alldata);
        },
        // ajax
        anchorAjax: function(data) { 

            // var anchorData = {
            //     p: now,
            //     each: count,
            //     _rtk: postRtk,
            //     progress: $('.anchor-select-checkbox input:checked').parent().data('id')
            // }
            // var each=5;
            // var now = parseInt(data.page) || 1;
            // var anchorData = {
            //     p: now,
            //     each: data.eachNum,
            //     // _rtk: postRtk,
            //     progress:data.div
            // }
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     url: page.ajaxUrl,
            //     // data: anchorData,
            //     success: function(e) {
            //        data.func();
                    // this.pageNav( now, e.totalPage, data.div );
                    // this.pageSet( now,  e.totalPage,e.totalCount, data.div);
                    this.pageNav( data.page,25, data.div );
                    this.pageSet( data.page,25, data.div);
                // },
                // error: function(e) {
                //     console.log(e);
                // }
         // });
        },

   
        change: function(config) {  
            $('.page-count select').on('change',function(){
                var eachNum=Number($('.page-count option:selected').val()) || 20;
                var now= 1;
                config.page = now;
                config.eachNum =  eachNum;
                page.anchorAjax(config);
            });
        },
    	init: function(config) {
    		 var pageDom = Mustache.render(require('./page.html'));
             $('.con_page').append(pageDom);
             page.ajaxUrl = config.ajax;
             this.anchorAjax(config.data);
             this.change(config.data);
             console.log("22");
    	}

};	
module.exports = page;


