/**
 * @module browserType
 * @date 2016/11/24
 * @description 获取浏览器的类型
 * @author kun.wang
 * @email  kun.wang5@renren-inc.com
 */
 
function browserType() {
    var ua = navigator.userAgent.toLowerCase();
    return {
        'opera': ua.indexOf('opera') > -1,
        'chrome': ua.indexOf('chrome') > -1,
        'firefox': ua.indexOf('firefox') > -1,
        'safari': ua.indexOf('safari') > -1,
        'ie': ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1,
        'ie11': ua.indexOf("trident") > -1 && ua.indexOf("rv:11") > -1
    }
}

module.exports = browserType;