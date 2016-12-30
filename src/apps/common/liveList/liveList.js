/**
 * @author kun.wang
 * @module 直播列表（正在直播和历史直播）交互逻辑
 * @date 2016/10/24
 */

// DOM占位元素（标题+列表+loading加载）
/*示例：
<div class="now-live">
    <div class="title">
        <h3 style="background-image:url()">正在直播</h3>
    </div>
    <div class="live-cont">
        <ul class="list js-list">
        </ul>
        <div class="loading">
            <a href="javascript:void(0);" class="loading-text">加载更多</a>
            <div class="loading-ball">加载中 
                <div></div><div></div><div></div>
            </div>
        </div>
    </div>
</div>*/

require('./liveList.scss');

var LiveList = function(options) {
    this.options = $.extend({}, LiveList.DEFAULTS, options); 
}

LiveList.DEFAULTS = {
    'type': 1,                  // 直播类型：1.正在直播 0.历史回放
    'limit': 15,                // 分页的条数
    'data': {},                 // 列表数据（json）
    'isLoading': true,          // 是否展示loading加载
    'scrollLoading': false,     // 是否滚动加载,在isloading为true的基础上
    'delay': 1200,               // loading加载时间
    'fatherCont': '.js-list',   // 列表父元素选择器(默认class为js-list)
    'callback': function() {return 0;}   //加载完之后的回调，没loading时不存在
}
// 渲染直播列表
LiveList.prototype.buildList = function() {
    var arr = [],
        date,year,month,day,dateString;
    if(this.options.type == 0) {
        $.each(this.options.data,function(index,item) {
            date = new Date(item.startTime);
            year = date.getFullYear();
            month = date.getMonth()+1;
            day = date.getDate();
            dateString = year+'-'+month+'-'+day;
            var li = Mustache.render(require('./tmp/history.html'),{item:item,dateString:dateString});
            arr.push(li);
        });   
    } else {
        $.each(this.options.data,function(index,item) {
            if(item.liveState == 0) {
                liveState = '正在直播';
                type = 1;
            } else {
                liveState = '回 放';
                type = 2;
            }
            var li = Mustache.render(require('./tmp/living.html'),{item:item,liveState:liveState,type:type});
            arr.push(li);
        });
    }
    $(this.options.fatherCont).append(arr.join(''));
    $('.loading-text').show();
    $('.loading-ball').hide();
    $('.live-title').emoji();
    $('.anchor-name').emoji();
    this.posterHover();
    this.gotoLiveroom();
    // 加载完毕的处理
    if(this.options.data.length < this.options.limit) {
        this.options.isLoading && $('.loading-text').html('没有更多了').off('click');
        this.options.scrollLoading &&  $(document).off('scroll');
    }
}
// 鼠标hover放大效果
LiveList.prototype.posterHover = function() {
    $('.live-item').mouseover(function() {
        $(this).find('.poster').addClass('posterHover');
        $(this).parent().find('.anchor-info').addClass('anchorHover');
    }).mouseout(function() {
        $(this).find('.poster').removeClass('posterHover');
        $(this).parent().find('.anchor-info').removeClass('anchorHover');
    })
}
// 进入直播间
LiveList.prototype.gotoLiveroom = function() {
    $('.live-item').off('click');
    $('.live-item').on('click',function() {
        var id = $(this).attr('data-id');
        // location.href = 'http://zhibo.renren.com/liveroom/'+id;
        window.open('http://zhibo.renren.com/liveroom/'+id);
    })
}
// 加载更多
LiveList.prototype.loadingMore = function(callback) {
    var self = this;
    // 如果设置滚动加载优先使用
    if(this.options.scrollLoading) {
        $(document).off('scroll');
        $(document).on('scroll',function() {
            if($(window).scrollTop()+$(window).height() >= $(document).height()) {
                $('.loading-text').hide();
                $('.loading-ball').show();
                if(typeof(callback) === 'function') {
                    setTimeout(callback,self.options.delay);
                }
            }
        })
    } else {
        $('.loading-text').off('click');
        $('.loading-text').on('click',function() {
            $(this).hide();
            $('.loading-ball').show();
            if(typeof(callback) === 'function') {
                setTimeout(callback,self.options.delay); 
            }
        })
    }
}

// 滚动加载事件
// LiveList.prototype.scrollLoading = function(callback) {
//     var self = this;
//     $(window).on('scroll',function() {
//         if($(window).scrollTop()+$(window).height() >= $(document).height()-100) {
//             if(typeof(callback) === 'function') {
//                 setTimeout(callback,self.options.delay);
//             }
//         }
//     })
// }

LiveList.prototype.init = function() {
    if(this.options.isLoading) {
        this.loadingMore(this.options.callback);
    } else {
        $('.loading').remove();
    }
    this.buildList();
}

/*************plugin入口***************/
function liveList(options) {
    new LiveList(options).init();
}
module.exports = liveList;

