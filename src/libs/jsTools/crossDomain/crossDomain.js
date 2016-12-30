    window.nx = window.nx || {};
    nx.user = nx.user || {};
    nx.stats = (function ($) {

    var $imgs = {};
    var $uuid = 0;
    var $getLimit = 2048;

    nx.log = nx.log || {};

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch( e ) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject( "Microsoft.XMLHTTP" );
        } catch( e ) {}
    }



    var defaults = {
        url: 'http://rcd.renren.com/ajaxHomeReconnectStat',
        forcePost: false,
        supportBatch: false,
        batch: function (key, value) {
            return 'key=' + key.join('|') + '&val=' + value.join('|');
        },
        delay: 60000,
        //scope: document,
        whitelist: false
    };

    var Stats = function (options) {
        this.options = $.extend({}, defaults, options);
        this.queue = [];
        //this.handler = this._autoAdd.bind(this);
        //$(this.options.scope).on('click', '[data-stats]', this.handler);
    };

    Stats.prototype = {

        destroy: function () {
            //$(this.options.scope).off('click', this.handler);
        },

        add: function (data) {
            if (arguments.length === 2) {
                data = arguments[0] + '=' + arguments[1];
            }
            //this._addToQueue(data);
        },

        send: function (data) {
            if (arguments.length === 2) {
                data = arguments[0] + '=' + arguments[1];
            }

            if (this.options.supportBatch) {
                data = data.split('=');
                data = this.options.batch([data[0]], [data[1]]);
            }

            if (this.options.forcePost) {
                this._advanceSend(data);
            }
            else {
                this._quickSend(data);
            }
        },

        push: function () {
            var data, key = [], value = [];
            /* eslint no-cond-assign: 0 */
            while (data = this.queue.shift()) {
                data = data.split('=');
                key.push(data[0]);
                value.push(data[1]);
                if (this._isReachGetLimit(key, value)) {
                    key.pop();
                    value.pop();
                    this.queue.unshift(data.join('='));
                    break;
                }
            }
            if (this.options.forcePost || this.queue.length) {
                while (data = this.queue.shift()) {
                    data = data.split('=');
                    key.push(data[0]);
                    value.push(data[1]);
                }
                this._advanceSend(this.options.batch(key, value));
            }
            else {
                this._quickSend(this.options.batch(key, value));
            }
        },

        _isReachGetLimit: function (key, value) {
            var param = encodeURIComponent(this.options.batch(key, value));
            return (this.options.url + '?' + param).length > $getLimit;
        },

        //_autoAdd: function (e) {
        //    var data = $(e.target).closest('[data-stats]').data('stats');
        //    this._addToQueue(data);
        //},

        // _addToQueue: function (data) {
        //     if (this.options.supportBatch) {
        //         this.queue.push(data);
        //         if (!this.timer) {
        //             this.timer = nx.timer.setTimeout(function () {
        //                 this.push();
        //                 this.timer = null;
        //             }.bind(this), this.options.delay);
        //         }
        //     }
        //     else {
        //         this.send(data);
        //     }
        // },

        _quickSend: function (data) {
            if (!this.options.whitelist || Number(nx.user.id.slice(-1)) === (new Date).getDate() % 10) {
                $uuid += 1;
                var img = new Image(), key = $uuid;
                $imgs[key] = img;
                img.onload = img.onerror = img.onabort = function () {delete $imgs[key];};
                if (data.indexOf('=') > -1) {
                    img.src = this.options.url + '?' + (data);
                }
                else {
                    img.src = this.options.url + '?param=' + (data);
                }
            }
        },

        _advanceSend: function (data) {
            if (!this.options.whitelist || Number(nx.user.id.slice(-1)) === (new Date).getDate() % 10) {
                $.ajax({
                    url: this.options.url,
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    stats: false
                });
            }
        }

    };

    var classicStats = new Stats();

    var performanceStats = new Stats({
        url: 'http://name.renren.com/log',
        supportBatch: true,
        delay: 30000,
        whitelist: false
    });

    var globalStats = new Stats({
        url: 'http://name.renren.com/log',
        supportBatch: true,
        delay: 30000,
        whitelist: false
    });


        return {
            sub: function (o) {
                return new Stats(o);
            },
            // add: function () {
            //     return classicStats.add.apply(classicStats, arguments);
            // },
            send: function () {
                return classicStats.send.apply(classicStats, arguments);
            },
            push: function () {
                return classicStats.push.apply(classicStats, arguments);
            },
            ps: performanceStats,
            biz: function (type, value) {
                return performanceStats.add.call(performanceStats, 'biz-' + type, value);
            },
            gs: globalStats,
            pv: function (page) {
                return globalStats.add.call(globalStats, 'pv-' + page, 1);
            }
        };

    })($);
    (function () {

    // 可以用于scheme的字符
    var scheme_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.';

    // 在字符串url中查找target字符后，利用result对象，返回截断后的前、后字符串
    // @param {Object} result 重复利用的用于返回结果的对象（避免太多内存垃圾产生）
    // @param {String} url 需要截取的url
    // @param {String} target 截断的字符组成的字符串
    // @param {Boolean} remainFirst 是否要保留匹配的字符
    //
    // @return {Object} 形如 {got:'', remained:''}的结果对象
    function splitUntil(result, url, target, remainFirst) {
        var min = url.length;
        for(var i=0, len = url.length; i < len; i++) {
            if (target.indexOf(url.charAt(i)) != -1) {
                if (i < min) {
                    min = i;
                    break;
                }
            }
        }
        result.got = url.substring(0, min);
        result.remained = (remainFirst? url.substring(min) : url.substring(min + 1));
        return result;
    }

    this.urllib = {
        // 解析一个url为 scheme / netloc / path / params / query / fragment 六个部分
        // @see http://docs.python.org/library/urlparse.html
        // @example 
        // http://www.renren.com:8080/home/home2;32131?id=31321321&a=1#//music/?from=homeleft#fdalfdjal
        // --> 
        // [http, www.renren.com:8080, /home/home2, 32131, id=31321321&a=1, //music/?from=homeleft#fdalfdjal]
        //
        parse: function (url, default_scheme) {
            if (typeof url != 'string') {
                return ['', '', '', '', '', ''];
            }
            var scheme = '', netloc='', path = '', params = '', query = '', fragment = '', i = 0;
            i = url.indexOf(':');
            if (i > 0) {
                if (url.substring(0, i) == 'http') {
                    scheme = url.substring(0, i).toLowerCase();
                    url = url.substring(i+1);
                } else {
                    for (i = 0, len = url.length; i < len; i++) {
                        if (scheme_chars.indexOf(url.charAt(i)) == -1) {
                            break;
                        }
                    }
                    scheme = url.substring(0, i);
                    url = url.substring(i + 1);
                }
            }
            if (!scheme && default_scheme) {
                scheme = default_scheme;
            }
            var splited = {};
            if (url.substring(0, 2) == '//') {
                splitUntil(splited, url.substring(2), '/?#', true);
                netloc = splited.got;
                url = splited.remained;
            }

            if (url.indexOf('#') != -1) {
                splitUntil(splited, url, '#');
                url = splited.got;
                fragment = splited.remained;
            }
            if (url.indexOf('?') != -1) {
                splitUntil(splited, url, '?');
                url = splited.got;
                query = splited.remained;
            }
            if (url.indexOf(';') != -1) {
                splitUntil(splited, url, ';');
                path = splited.got;
                params = splited.remained;
            }

            if (!path) {
                path = url;
            }
            return [scheme, netloc, path, params, query, fragment];
        },
        // parse 的反操作。
        unparse: function (parts) {
            if (!parts) {
                return '';
            }
            var url = '';
            if (parts[0]) url += parts[0] + '://' + parts[1];
            if (parts[1] && parts[2] && parts[2].indexOf('/') != 0) url += '/';
            url += parts[2];
            if (parts[3]) url += ';' + parts[3];
            if (parts[4]) url += '?' + parts[4];
            if (parts[5]) url += '#' + parts[5];

            return url;
        },
        // 
        // 合并两段url
        // 
        // 合并规则：
        // 以url为基础，分为scheme、netloc、path、params、query和fragment六个部分，
        // 如果前N个部分完全不存在，取base的相关部分，返回base的前N个部分+url的后6-N个部分
        // 如果path和params部分有一个存在，取base的path上一层目录为父目录，返回base的path之前的部分+新path+url的path之后6的部分
        // +操作为urlunparse
        // 
        // @see unparse
        // 
        join: function (base, url) {
            // 逻辑完全照抄python的urlparse.py

            if (!base) {
                return url;
            }

            if (!url) {
                return base;
            }

            url = String(url);
            base = String(base);

            var bparts = this.parse(base);
            var parts = this.parse(url, bparts[0]);

            // scheme
            if (parts[0] != bparts[0]) {
                return url;
            }

            // netloc
            if (parts[1]) {
                return this.unparse(parts);
            }

            parts[1] = bparts[1];

            // path
            if (parts[2].charAt(0) == '/') {
                return this.unparse(parts);
            }

            // params
            if (!parts[2] && !parts[3]) {
                parts[2] = bparts[2];
                parts[3] = bparts[3];
                if (!parts[4]) {
                    parts[4] = bparts[4];
                }
                return this.unparse(parts);
            }

            var segments = bparts[2].split('/').slice(0, -1).concat(parts[2].split('/'));
            var i;

            // 确保能够生成最后的斜线
            if (segments[segments.length - 1] == '.') {
                segments[segments.length - 1] = '';
            }

            // 去掉所有'.'当前目录
            for (i = 0, l = segments.length; i < l; i++) {
                if (segments[i] == '.') {
                    segments.splice(i, 1);
                    i--;
                }
            }

            // 合并所有'..'
            while (true) {
                i = 1;
                n = segments.length - 1;
                while (i < n) {
                    if (segments[i] == '..' && ['', '..'].indexOf(segments[i - 1]) == -1) {
                        segments.splice(i - 1, 2);
                        break;
                    }
                    i++;
                }
                if (i >= n) {
                    break;
                }
            }

            if (segments.length == 2 && segments[0] == '' && segments[1] == '..') {
                segments[segments.length - 1] = '';
            }
            else if (segments.length >= 2 && segments[segments.length - 1] == '..') {
                segments.pop();
                segments.pop();
                segments.push('');
            }

            parts[2] = segments.join('/');

            return this.unparse(parts);
        }
    };

}).call(nx);


(function ($) {

    'use strict';

    try {
        document.domain = 'renren.com';
    }
    catch (e) {}

    var renrendomain = /(?:^|\.?)renren\.com$/;
    var rtk = /(?:(?:requestToken)|(?:_rtk))=[^&=]+/;

    $.ajaxPrefilter(function(options) {
        /* eslint no-underscore-dangle: 0 */
        if (!renrendomain.test(window.location.hostname)) { return; }
        if (rtk.test(options.url)) { return; }
        var data = options.data;
        if (typeof data === 'undefined') {
            data = 'requestToken=' + nx.user.requestToken + '&_rtk=' + nx.user._rtk;
        }
        else if (Object.prototype.toString.call(data) === '[object FormData]') {
            data.append('requestToken', nx.user.requestToken);
            data.append('_rtk', nx.user._rtk);
        }
        else if (!rtk.test(data)){
            data += '&requestToken=' + nx.user.requestToken + '&_rtk=' + nx.user._rtk;
        }
        options.data = data;
    });

    var corsxhrs = {},
    corssend = function (iframe, options, complete) {
        var s = $.extend({}, options);

        try {
            var corsxhr = iframe.contentWindow.getTransport();
        }
        catch (e) {
            return complete(-1, e);
        }

        s.xhr = function () { return corsxhr; };
        s.xhr.cors = 'ajaxproxy';
        s.success = null;
        s.error = null;
        s.beforeSend = null;
        s.crossDomain = false;
        s.complete = function (jqXHR, statusText) {
            if (jqXHR.statusTex !== 'abort') {
                var responses = {};
                if (typeof jqXHR.responseText === 'string') {
                    responses.text = jqXHR.responseText;
                }
                complete(jqXHR.status, statusText, responses, jqXHR.getAllResponseHeaders());
            }
            var parts = nx.urllib.parse(s.url);
            var tag = parts[1].split('.')[0];
            corsxhr = null;
            if (tag !== 'wpi' || tag !== 'ark') {
                corsxhrs[tag].counter -= 1;
                if (corsxhrs[tag].counter === 0) {
                    delete corsxhrs[tag];
                    setTimeout(function () {
                        $(iframe).attr('src', 'javascript:;').remove();
                    }, 1000);
                }
            }
        };

        return $.ajax(s);
    },
    transport = function (options, originalOptions, originalJQXHR) {
        // console.log(options);
        // console.log(originalOptions);
        // console.log(originalJQXHR);

        if (options.url.charAt(0) === '/') {
            options.url = 'http://' + window.location.hostname + options.url;
        }
        var parts = nx.urllib.parse(options.url), tag = parts[1].split('.')[0];
        if (options.stats && options.startTime === undefined) {
            options.startTime = +new Date;
        }
        if ($.support.cors && parts[1] === 'ark.renren.com') {
            originalJQXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            options.xhrFields = {withCredentials: true};
            options.xhr = function () {
                return new window.XMLHttpRequest();
            };
            options.xhr.cors = 'preflight';
        }

        if (window.location.hostname !== parts[1] && !options.xhr.cors) {
            var jqXHR;
            // console.log(jqXHR);
            return {
                send: function (headers, complete) {
                    if ($.isArray(corsxhrs[tag])) {
                        corsxhrs[tag].push({originalOptions: options, complete: complete});
                    }
                    else if (corsxhrs[tag]) {
                        corsxhrs[tag].counter += 1;
                        jqXHR = corssend(corsxhrs[tag], options, complete);
                        corsxhrs[tag].counter += 1;
                    }
                    else {
                        corsxhrs[tag] = [{originalOptions: options, complete: complete}];
                        var $iframe = $('<iframe>')
                        .hide()
                        .attr('src', nx.urllib.unparse([parts[0], parts[1], 'ajaxproxy.htm']))
                        .appendTo(document.body);
                        $iframe.on('load', function(){
                            if (jqXHR === 'abort') {
                                setTimeout(function () {
                                    $(this).attr('src', 'javascript:;').remove();
                                }, 1000);
                                return;
                            }
                            var xhrContext = this, counter = corsxhrs[tag].length;
                            corsxhrs[tag].forEach(function (item) {
                                jqXHR = corssend(xhrContext, item.originalOptions, item.complete);
                            });
                            corsxhrs[tag] = xhrContext;
                            corsxhrs[tag].counter = counter;
                        })

                    }
                },
                abort: function () {
                    if (jqXHR) {
                        jqXHR.abort();
                    }
                    jqXHR = 'abort';
                }
            };
        }
        else {
            var t = +new Date;
            originalJQXHR.always(function (responses, statusText) {
                if (statusText === 'error') {
                    nx.stats.ps.add('err-' + parts[1] + parts[2] + '//' + (options.type || 'get'), 1);
                }
                else {
                    if (options.stats) {
                        nx.stats.ps.add('ajax-' + parts[1] + parts[2] + '//' + (options.type || 'get'), new Date - t);
                        nx.stats.ps.add('ajax-' + parts[1] + parts[2] + '//' + (options.type || 'get') + '//withproxy', new Date - options.startTime);
                    }
                }
            });
        }
    };

    $.ajaxTransport('json', transport);
    $.ajaxTransport('html', transport);
    $.ajaxTransport('xml', transport);
    $.ajaxTransport('text', transport);
})($);
