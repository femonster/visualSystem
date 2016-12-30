/**
 * @author kun.wang
 * @module 各种排行榜（人气榜和贡献榜）交互逻辑
 * @date 2016/10/25
 */

// 占位元素
/*<div class="aside">
    <div class="fixed-aside">
        <div class="popular">
            <div class="title">
                <h3 style="background-image:url()">粉丝贡献榜</h3>
            </div>
            <div class="rank-cont">
                <ul class="anchor-list">
                </ul>
                <div class="pager">
                    <span class="pager-pre" title="上一页">＜</span>
                    <div class="pager-num">
                        <span class="pager-current">1</span> / <span class="pager-total">3</span>
                    </div>
                    <span class="pager-next" title="下一页">＞</span>
                </div>
            </div>
        </div>
    </div>
    <div class="back-top" title="返回顶部">返回顶部</div>
</div>*/

require('./rankList.scss');
var browserType = require('browserType');

var RankList = function(options) {
    this.options = $.extend({}, RankList.DEFAULTS, options); 
}

RankList.DEFAULTS = {
    'type': 1,              // 榜单类型 1.人气榜 2.粉丝榜
    'rankType': 0,          // 分类类型 人气榜有日,月,周
    'totalCount': 0,        // 总条数（分页用）
    'data': {},             // 榜单数据
    'offset': 0,            // 偏移量
    'limit': 10,            // 每页条数
    'callback': function() {return 0},      // 分页回调函数
}

// 构建榜单数据
RankList.prototype.buildList = function() {
    var arr = [],
        level,
        self = this;
    $.each(this.options.data,function(index,item) {
        // 第1页有前3皇冠
        if(self.options.offset==0 && index<3) {
            level = '<span class="level level-'+(index+1)+'"></span>';
        } else {
            level = '<span class="level">'+(self.options.offset+index+1)+'</span>';
        }
        if(self.options.type == 1) {
            var li = Mustache.render(require('./tmp/hotRankItem.html'),{item:item,level:level});
        } else {
            var li = Mustache.render(require('./tmp/fansRankItem.html'),{item:item,level:level});
        }
        arr.push(li);
    });
    $('.anchor-list').empty().append(arr.join(''));
    $('.anchor-list name').emoji();
    this.pagerPre();
    this.pagerNext();
}

// 上一页
RankList.prototype.pagerPre = function() {
    var curr = parseInt($('.pager-current').html()),
        self = this;
    $('.pager-pre').off('click');
    $('.pager-pre').on('click',function() {
        curr = $('.pager-current').html();
        if(curr > 1) {
            if(typeof(self.options.callback) == 'function') {
                self.options.callback((curr-2)*self.options.limit,self.options.rankType);
            }
            $('.pager-current').html(--curr);
        }
    });
}

// 下一页
RankList.prototype.pagerNext = function() {
    var curr = parseInt($('.pager-current').html()),
        total = parseInt($('.pager-total').html()),
        self = this;
    $('.pager-next').off('click');
    $('.pager-next').on('click',function() {
        if(curr < total) {
            if(typeof(self.options.callback == 'function')) {
                self.options.callback(curr*self.options.limit,self.options.rankType);
            }
            $('.pager-current').html(++curr);
        }
    })
}

// 侧边栏滚动固定
RankList.prototype.asideFixed = function() {
    var fixAside = $('.fixed-aside'),
        backTop = $('.back-top'),
        a_offsetTop = fixAside.offset().top,
        a_height = fixAside.height(),
        w_scrollTop,w_height,
        f_height = $('.footer').height();
        h_height = $('.header').height();
        self = this;
    $(window).on('scroll',function() {
        w_scrollTop = $(window).scrollTop();
        w_height = $(window).height();
        // 前提条件：列表的高 > 侧边栏的高
        if($('.rooms-box').height() > $('.aside').height()) {
            if(a_height >= w_height-f_height-h_height-80) {
                // 吸底
                if(w_scrollTop+w_height > a_offsetTop+a_height+f_height+30) {
                    fixAside.addClass('bottom-fixed');
                    backTop.show();
                } else {
                    fixAside.removeClass('bottom-fixed');
                    backTop.hide();
                }
            } else {
                // 吸顶
                 if(w_scrollTop > a_offsetTop) {
                    fixAside.addClass('top-fixed');
                    backTop.show();
                } else {
                    fixAside.removeClass('top-fixed');
                    backTop.hide();
                }
            }
        }
    })
    // 返回顶部
    $('.back-top').on('click',function() {
        var b = browserType();
        // scrollTop()的兼容性问题
        selector = (b.firefox || b.ie || b.ie11) ? 'html' : 'body';
        // selector = (b == 'firefox' || b == 'ie') ? 'html' : 'body';
        $(selector).animate({scrollTop: 0},300);
    })
}

RankList.prototype.init = function() {
    // 设置总页数
    var pagerNum = Math.ceil(this.options.totalCount/this.options.limit);
    $('.pager-total').html(pagerNum);
    this.buildList();
    setTimeout(this.asideFixed,1500);
}

/*************组件入口***************/
function rankList(options) {
    new RankList(options).init();
}

module.exports = rankList;
