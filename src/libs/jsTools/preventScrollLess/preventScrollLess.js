/**
 * @module preventScrollLess
 * @date 2016/11/19
 * @description 子元素滚动到底部\顶部的时候，阻止父元素的滚动触发
 * @author rihao.li
 * @email  rihao.li@renren-inc.com
 * @dependent jQuery 3+
 */

// 传入jQuery对象或者原生
function preventScrollLess($ele){

    if (!$){
        throw new Error("preventScrollLess must dependent jQuery(version 3+)");
    }

    if (!($ele instanceof $)){
        $ele = $(ele);
    }

    $ele.on("mousewheel", function(e){
        if (e.originalEvent.wheelDelta < 0 && $ele[0].scrollHeight - $ele.height() - $ele.scrollTop() < 5){
            return false;
        }
        else if (e.originalEvent.wheelDelta > 0 && $ele.scrollTop() == 0){
            return false;
        }
    })
}

module.exports = preventScrollLess;


