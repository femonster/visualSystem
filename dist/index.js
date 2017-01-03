/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	    __webpack_require__(2);
	    var tableTmp=__webpack_require__(6);

	    //布局设置（宽，高）
	    $('.g-wrap').height($(document).height()-45);
	    $(window).resize(function() {
	        $('.g-wrap').height($(document).height()-45);
	    });

	    //拖拽组件
	    $('.m-drag-list').sortable({
	        animation:150,
	        sort: false,
	        setData: function (dataTransfer,dragEl){
	            dataTransfer.setData('dname',dragEl.dataset.dname); 
	        }
	        
	    });

	    var oAimWrap = document.querySelector('.g-section');
	    var aAimBox = oAimWrap.querySelectorAll('.m-demo-item');


	    //事件委托 布局拖拽
	    EventUtil.addHandler(oAimWrap,"dragover",function(ev){
	        var ev = ev||window.event;
	        var target = EventUtil.getTarget(ev);
	        EventUtil.preventDefault(ev);
	        if(target.classList[1]=="m-demo-item"){
	            target.style.borderColor="red";

	        }
	    });
	    EventUtil.addHandler(oAimWrap,"dragenter",function(ev){
	         var ev = ev||window.event;
	        var target = EventUtil.getTarget(ev);
	        if(target.classList[1]=="m-demo-item"){
	            target.style.borderColor="red";
	        }
	    });
	    EventUtil.addHandler(oAimWrap,"dragleave",function(ev){
	         var ev = ev||window.event;
	        var target = EventUtil.getTarget(ev);
	        if(target.classList[1]=="m-demo-item"){
	            target.style.borderColor="#999";
	        }
	    });

	    EventUtil.addHandler(oAimWrap,"drop",function(ev){
	        var ev = ev||window.event;
	        var target = EventUtil.getTarget(ev);
	        if(target.classList[1]=="m-demo-item"){
	            var stext = ev.dataTransfer.getData("dname");
	            target.style.borderColor="#999";
	            if(stext==target.dataset.aname && $(target).find('div').length==0){
	                eval("create"+stext+"(target)");
	            }
	        }
	    });

	    //删除布局组件
	    $(oAimWrap).on('click','.m-demo-del-handler',function(){
	        $(this).parent().remove();
	    });

	    //编辑布局组件
	    $(oAimWrap).on('click','.m-demo-update-handler',function(ev){
	        var oBoxParNam = this.parentElement.dataset.aname;
	        if(oBoxParNam=="header"){
	            updateHeader(this.parentElement);
	        }
	        if(oBoxParNam=="nav"){
	            updateNav(this.parentElement);
	        }
	        if(oBoxParNam=="table"){
	            updateTable(this.parentElement);
	        }
	        if(oBoxParNam=="fpage"){
	            updateFpage(this.parentElement);
	        }
	        if(oBoxParNam=="riqi"){
	            updateRiqi(this.parentElement);
	        }
	    });


	    //克隆布局框
	    $('.g-gide-box').sortable({
	        group:{name:"gide",pull:"clone"},
	        sort:false,
	        animation:150
	    });

	    $('.g-section').sortable({
	        group:{name:"gide",pull:false},
	        handle: ".m-demo-drag-handler",
	        animation: 150
	    });


	    //清除布局
	    $('#btn-empty').on('click',function(){
	        $('.g-section').empty();
	    });

	    //预览布局
	    $('#btn-look').on('click',function(){
	        // $('.g-aside').stop().animate({'width':'0px'});
	        if($(this).hasClass('btn-success')){return;}
	        $('.u-toolbar').find('button').addClass('btn-default').removeClass('btn-success');
	        $(this).addClass('btn-success').removeClass('btn-default');

	        $('.g-section').stop().animate({'width':'100%'}).css('background-color','#fff').find('.m-demo-item').css('border','none');
	        $('.g-aside').stop().animate({'width':'0'},function(){
	            $('.g-aside').hide();
	        });
	        $('.g-section').find('span').hide();
	        $('#btn-empty').attr('disabled','disabled');
	    });

	    //编辑布局
	    $('#btn-edit').on('click',function(){
	        if($(this).hasClass('btn-success')){return;}
	         $('.u-toolbar').find('button').addClass('btn-default').removeClass('btn-success');
	         $(this).addClass('btn-success').removeClass('btn-default');
	         $('.g-aside').width(0);
	         $('.g-aside').show();
	         $('.g-section').find('span').show();
	         $('.g-section').stop().animate({'width':'80%'}).css('background-color','#c0c0c0').find('.m-demo-item').css('border','2px dotted #999');
	         $('.g-aside').stop().animate({'width':'20%'});

	          $('#btn-empty').attr('disabled',false);
	    });





	    //生成代码
	    $("#create-code").on('click',function(){
	        if($(this).hasClass('btn-success')){return;}
	        $('.u-toolbar').find('button').addClass('btn-default').removeClass('btn-success');
	        $(this).addClass('btn-success').removeClass('btn-default');
	    });



	    //生成组件(obj是指当前组件的DOM元素,需要jq元素时需要用$(obj))
	    function createtable(obj) {
	        tableTmp.init(obj);
	        tableTmp.update(obj);
	    }
	    function createnav(obj) {
	        $(obj).removeClass('m-nav-content');
	        var $tmp = $("<div><h1>nav拖进来了</h1></div>");
	        $(obj).append($tmp);
	    }
	    function createheader(obj) {
	        $(obj).removeClass('m-header-content');
	        var $tmp = $("<div><h1>header拖进来了</h1></div>");
	        $(obj).append($tmp);
	    }
	    function createfpage(obj) {
	        $(obj).removeClass('m-fpage-content');
	        var $tmp = $("<div><h1>fpage拖进来了</h1></div>");
	        $(obj).append($tmp);
	    }
	    function createform(obj) {
	        $(obj).removeClass('m-form-content');
	        var $tmp = $("<div><h1>form拖进来了</h1></div>");
	        $(obj).append($tmp);
	    }
	    function createriqi(obj) {
	        $(obj).removeClass('m-riqi-content');
	        var $tmp = $("<div><h1>datepicker拖进来了</h1></div>");
	        $(obj).append($tmp);
	    }


	    //编辑组件(obj是指当前组件的DOM元素,需要jq元素时需要用$(obj))
	    function updateHeader(obj) {
	        $('.u-edit-box').html("wahaha");
	    }
	    function updateTable(obj) {
	        if($('.u-input-group').length<=0){
	             tableTmp.edit(obj);
	         }
	       
	    }
	    function updateNav(obj) {
	        
	    }
	    function updateFpage(obj) {
	        
	    }
	    function updateRiqi(obj) {
	        
	    }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/.0.26.1@css-loader/index.js!./../../../../node_modules/.4.1.1@sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../../../node_modules/.0.26.1@css-loader/index.js!./../../../../node_modules/.4.1.1@sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody {\n  position: relative; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0; }\n\nul li {\n  list-style: none; }\n\nlabel {\n  font-weight: 500; }\n\n.g-header, .g-wrap, .g-section, .g-aside {\n  position: absolute; }\n\n.g-header {\n  width: 100%;\n  height: 43px;\n  background-color: lightblue;\n  top: 0; }\n\n.g-wrap {\n  width: 100%;\n  background-color: #999;\n  top: 45px;\n  min-width: 1254px; }\n\n.g-aside {\n  width: 20%;\n  height: 100%;\n  top: 0; }\n\n.g-section {\n  width: 80%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  background-color: #c0c0c0;\n  padding: 10px;\n  overflow-y: scroll; }\n\n.g-drag-box, .g-control-box {\n  width: 100%; }\n\n.g-drag-box {\n  height: 36%;\n  background-color: #eee;\n  border-bottom: 2px solid #999; }\n\n.g-gide-box {\n  height: 26%;\n  background-color: #eee;\n  border-bottom: 2px solid #999; }\n\n.g-control-box {\n  height: 38%;\n  background-color: #eee; }\n\n.sortable-ghost {\n  opacity: 0.4;\n  background-color: #F4E2C9; }\n\n.g-gide-box .m-demo-item {\n  cursor: move;\n  margin-bottom: 10px;\n  width: 100%;\n  border: 2px dotted #999;\n  border-radius: 5px;\n  background-color: #fff;\n  font-size: 12px;\n  text-align: center;\n  color: #e99;\n  position: relative;\n  padding: 5px 0;\n  line-height: 12px; }\n\n.g-gide-box .m-demo-item span, .g-gide-box .m-demo-item p {\n  display: none; }\n\n.g-gide-box .m-header-content:after {\n  content: \"\\5934\\90E8\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-nav-content:after {\n  content: \"\\5BFC\\822A\\680F\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-fpage-content:after {\n  content: \"\\5206\\9875\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-riqi-content:after {\n  content: \"\\65E5\\671F\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-table-content:after {\n  content: \"\\8868\\683C\\6A21\\5757\\533A\\57DF\"; }\n\n.g-section .m-demo-item {\n  margin-bottom: 10px;\n  width: 100%;\n  border: 2px dotted #999;\n  border-radius: 5px;\n  background-color: #fff;\n  font-size: 24px;\n  text-align: center;\n  color: #e99;\n  position: relative;\n  padding: 10px 0;\n  line-height: 25px; }\n\n.g-section .m-demo-item:hover span {\n  opacity: 1; }\n\n.g-section .m-demo-item span {\n  position: absolute;\n  display: block;\n  width: 50px;\n  height: 20px;\n  font-size: 12px;\n  line-height: 16px;\n  top: 4px;\n  opacity: 0.4;\n  transition: 0.4s; }\n\n.g-section .m-demo-item .m-demo-drag-handler {\n  left: 4px; }\n\n.g-section .m-header-content:after {\n  content: \"\\5C06header\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-nav-content:after {\n  content: \"\\5C06nav\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-fpage-content:after {\n  content: \"\\5C06  fpage\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-riqi-content:after {\n  content: \"\\5C06  datepicker\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-table-content:after {\n  content: \"\\5C06table\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-demo-item .m-demo-del-handler {\n  left: 58px; }\n\n.g-section .m-demo-item .m-demo-update-handler {\n  left: 112px; }\n\n.g-section .m-demo-item .m-demo-del-handler:hover {\n  cursor: pointer; }\n\n.g-section .m-demo-item .m-demo-drag-handler:hover {\n  cursor: move; }\n\n.g-section .m-demo-item .m-demo-update-handler:hover {\n  cursor: pointer; }\n\n.g-header .u-title {\n  margin-left: 10px;\n  line-height: 43px; }\n\n.g-header .u-toolbar {\n  margin: 5px 0 0 100px; }\n\n.g-aside .u-drag-title {\n  padding: 10px; }\n\n.g-aside .u-edit-box {\n  width: 100%;\n  height: 78%;\n  overflow-y: scroll; }\n\n.g-aside .m-drag-list li {\n  border-radius: 0;\n  z-index: 100; }\n\n.g-aside .m-drag-list:hover {\n  cursor: move; }\n\n.u-input-group {\n  width: 99%;\n  margin: 3px auto 0;\n  border: 1px solid #999;\n  position: relative;\n  font-size: 13px;\n  font-family: Arial; }\n\n.f-del {\n  position: absolute;\n  right: 7px;\n  top: 7px; }\n\n.u-group-list {\n  margin-top: 15px;\n  padding-left: 15px; }\n\n.u-group-list span {\n  display: inline-block;\n  width: 42%; }\n\n.u-group-list li {\n  padding: 3px; }\n\n.u-group-list input[type=text], .u-group-list input[type=number] {\n  width: 50%;\n  padding: 2px;\n  font-size: 12px; }\n\n.myData-input {\n  display: none; }\n\n#btnAdd, #btnSave {\n  margin: 5px; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var tableConfig = __webpack_require__(14);
	tableTmp ={
	    init:function(obj){
	        $(obj).removeClass('m-table-content');
	        var str="<table><thead><tr><th>标题一</th>"+
	                "<th>标题二</th><th>标题三</th></tr></thead>"+
	                "<tbody><tr><td>col1-1</td><td>col1-2</td><td>col1-3</td></tr><tr><td>col2-1</td><td>col2-2</td><td>col2-3</td></tr><tr><td>col3-1</td><td>col3-2</td><td>col3-3</td></tr></tbody></table>"
	        var $table = $(str);
	         $(obj).append($table);
	    },
	    update:function(obj){
	    	var oldStr="",
	    		$input=$("<input type='text' class='form-control'/>");

	    	$(obj).on('dblclick','th',function(ev){
	    		var target = ev.target;
	    		oldStr = target.innerHTML;
	    		target.innerHTML="";
	    		$input.val(oldStr);
	    		$(target).append($input);
	    		$input.focus();
	    		$input.on('blur',function(ev){
	    			var $th = $(this).parent();
	    			$th.html($(this).val());
	                tableTmp.edit(obj);
	    		});
	    		$input.on('keydown',function(ev){
	    			if(ev.which==13){
	    				var $th = $(this).parent();
	    				$th.html($(this).val());
	                    tableTmp.edit(obj);
	    			}
	    			
	    		});

	    	});
	    },
	    edit:function (obj) {
	        var ithLen = $(obj).find("th").length;
	        var strTmp="";
	        var aliArr=[];
	        var valArr=[];
	        for (var i = 0; i < ithLen; i++) {
	            valArr.push($(obj).find("th").eq(i).html());
	            // console.log(valArr[i]);
	            strTmp =[
	                            '<div class="u-input-group f-input-group"><a href="#" class="f-del">X</a>',
	                            '<ul class="f-group-list u-group-list">',
	                            '<li>',
	                            '<span><label for="title'+(i+1)+'">表头'+(i+1)+':</label></span>',
	                            '<input type="text" class="title" id="title'+(i+1)+'" value="'+valArr[i]+'" ><br>',
	                            '</li>',
	                            '<li><span><label for="colsNum'+(i+1)+'">占据列数:</label></span>',
	                            '<input type="number" class="colsNum" id="colsNum'+(i+1)+'" value="1" min="1"></li>',
	                            '<li>',
	                            '<span>从后台数据中生成:</span>',
	                            '<label for="fromData'+(i+1)+'-yes">是 </label><input type="radio" name="fromData'+(i+1)+'" id="fromData'+(i+1)+'-yes" class="fromDataRadio" checked="true" value="true"/>',
	                            '<label for="fromData'+(i+1)+'-no">否 </label><input type="radio" name="fromData'+(i+1)+'" id="fromData'+(i+1)+'-no" class="fromDataRadio" value="false"/>',
	                            '</li>',
	                            '<li class="fromData-input">',
	                            '<span><label for="dataName'+(i+1)+'">对应字段名:</label></span>',
	                            '<input type="text" class="dataName" id="dataName'+(i+1)+'" placeholder="多个用英文逗号隔开"/>',
	                            '</li>',
	                            '<li class="myData-input">',
	                            '<span><label for="htmlVal'+(i+1)+'">对应内容:</label></span>',
	                            '<input type="text" class="htmlVal" id="htmlVal'+(i+1)+'" placeholder="多个用英文逗号隔开">',
	                            '</li></ul></div>'
	                        ].join("");
	           
	            aliArr.push(strTmp);
	        }
	         $('.u-edit-box').html(aliArr.join(''));
	        var strbtn='<button id="btnAdd" class="btn btn-success btn-xs">添加</button>'+
	        '<button id="btnSave" class="btn btn-primary btn-xs">保存</button>';
	        $('.u-edit-btn-box').html(strbtn);
	    }
	}
	 module.exports=tableTmp;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/.0.26.1@css-loader/index.js!./../../../../node_modules/.4.1.1@sass-loader/index.js!./table.scss", function() {
				var newContent = require("!!./../../../../node_modules/.0.26.1@css-loader/index.js!./../../../../node_modules/.4.1.1@sass-loader/index.js!./table.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "table {\n  width: 80%;\n  min-width: 950px;\n  box-sizing: border-box;\n  font-size: 13px;\n  margin-top: 10px;\n  border: 1px solid #ddd;\n  border-collapse: collapse;\n  margin: 20px auto 0;\n  color: #000; }\n  table th {\n    text-align: center;\n    min-width: 60px;\n    height: 50px; }\n  table tbody, table tr {\n    box-sizing: border-box; }\n  table tr {\n    background-color: #fff;\n    height: 30px; }\n    table tr td {\n      border: 1px solid #eaeaea;\n      text-align: center;\n      font-size: 12px;\n      height: 50px; }\n    table tr:nth-of-type(odd) {\n      background-color: #fefefe; }\n    table tr:nth-of-type(even) {\n      background-color: #fff; }\n  table input[type=\"text\"] {\n    width: 50%;\n    margin: 0 auto; }\n  table input[type=\"button\"], table button {\n    color: red;\n    background-color: #fff;\n    border: 1px solid #e84a5f;\n    cursor: pointer;\n    border-radius: 2px; }\n  table input[type=\"button\"]:focus, table button:focus {\n    outline: none; }\n  table a {\n    text-decoration: none;\n    color: red;\n    cursor: pointer; }\n", ""]);

	// exports


/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	
		window.tableConfig={
			tableInit:function(obj,ithLen,aliArr){

				var oTab=null,
					num=ithLen,
					liArr=aliArr,
					// liArr=$('.f-input-group'),
					valArr=[],
					valCol=[],valChoose=[],valfield=[],valHtml=[];

					for (var i = 0; i < ithLen; i++) {
						// liArr.push($(obj).find('.f-input-group').get(i));
						valArr.push($(obj).find("th").eq(i).html());
					}
				console.log("开始",liArr);
					// alert(num);
				$('.u-edit-btn-box').on('click','#btnAdd',addInput);

				$('.u-edit-btn-box').on('click','#btnSave',function(){

					createConfig();
					createTbl(obj);
					var haha = configText(valArr,valCol,valChoose,valfield,valHtml);
					// 去掉构造函数实例两边的双引号
					var reg =new RegExp('"[^\".\"$]+"', "g");
					hahaEnd =JSON.stringify(haha);
					hahaEnd =hahaEnd.replace(reg, function(v){
						return v.substr(1,v.length-2);
					});

					configAllText = "function TableVal(fromData,val,htmlVal){this.fromData=fromData;this.val=val;this.htmlVal=htmlVal;}"+
									"var tableConfiger="+hahaEnd+";module.exports=tableConfiger;";
					// $('.codeHtml').text(configAllText);
				});
				
				// $('#hideBtn').on('click',addHide);
				
				// $('.hide-group-list').on('click','.hide-del',delHide);

				$('.u-edit-box').on('click','.fromDataRadio',chooseInp);
				
				$('.u-edit-box').on('click','.f-del',delGroup);

				//删除隐藏字段
				// function delHide(){
				// 	hideLiArr.splice(hideNum-1,1);
				// 	$('.hide-group-list').html(hideLiArr.join(''));
				// 	hideNum--;
				// }

				//清空
				function clear(){
					// num=ithLen;
					// liArr.length=0;
					valArr.length=0;
					valCol.length=0;
					valChoose.length=0;
					valfield.length=0;
					valHtml.length=0;
					// valHide.length=0;
					// hideLiArr.length=0;
				}


				//添加隐藏字段
				// function addHide(){
				// 	hideNum++;
				// 	var strTmp=[
				// 		'<li><span><label for="hideTitle'+hideNum+'">隐藏字段'+hideNum+':</label></span>',
				// 		'<input type="text" class="hideTitle" id="hideTitle'+hideNum+'" placeholder="隐藏字段将会添加到每一行上">',
				// 		'<a href="#" class="hide-del">&nbsp;&nbsp;x</a></li>'
				// 	].join('');
				// 	hideLiArr.push(strTmp);
				// 	$('.hide-group-list').append(strTmp);

				// }

				//删除表单组
				function delGroup(){
					liArr.splice(num-1,1);
					valArr.splice(num-1,1);
					valCol.splice(num-1,1);
					valChoose.splice(num-1,1);
					valfield.splice(num-1,1);
					valHtml.splice(num-1,1);
					$('.u-edit-box').html(liArr.join(''));
					num--;	
				}


				//生成配置文件
				function createConfig(){
					
					clear();
					
					$('.u-edit-box').find('.title').each(function(index,item){
						valArr.push($(item).val());
						valCol.push(parseInt($('.colsNum').eq(index).val()));
						valChoose.push($('.fromDataRadio:checked').eq(index).val());
						valfield.push($('.dataName').eq(index).val());
						valHtml.push($('.htmlVal').eq(index).val());					
					});
					console.log("生成配置文件",liArr);
					// $('.hideTitle').each(function(index,item){
					// 	valHide.push($(item).val());
					// });

				}

				//confige文件
				function configText(valArr,valCol,valChoose,valfield,valHtml,valHide){
					// alert(valHide.length);
					var tableConfiger={'titleMap':[],'tableId':[{'id':[]}]};
					for(var i=0;i<valArr.length;i++){
						tableConfiger.titleMap.push({});
						tableConfiger.titleMap[i].titleValue=[];
						tableConfiger.titleMap[i].titleName="'"+valArr[i]+"'";
						console.log(tableConfiger.titleMap,valArr[i]);
						if(valChoose[i]=="true"){
							if(valCol[i]>1){
								var colfield=valfield[i].split(',');
								console.log(tableConfiger.titleMap[i].titleValue);
								console.log("colfield",colfield);
								for (var j = 0; j < colfield.length; j++) {
									tableConfiger.titleMap[i].titleValue.push("new TableVal(false,'','"+colfield[j]+"')");
									// tableConfiger.titleMap[i].titleValue
								}
							}else{
								tableConfiger.titleMap[i].titleValue=["new TableVal(true,'"+valfield[i]+"')"];
							}
							
						}else{
							if(valCol[i]>1){
								var colHtml=valHtml[i].split(',');
								for (var j = 0; j < colHtml.length; j++) {
									tableConfiger.titleMap[i].titleValue.push("new TableVal(false,'','<button>"+colHtml[j]+"</button>')");
								}
							}else{
								tableConfiger.titleMap[i].titleValue=["new TableVal(false,'','<button>"+valHtml[i]+"</button>')"];
							}
							
						}
					}

					// for (var k = 0; k < valHide.length; k++) {
					// 	tableConfiger.tableId[0].id.push("new TableVal(true,'"+valHide[k]+"')");
					// }
					return tableConfiger;

				}
				//选择radio
				function chooseInp(){
					var $graPan = $(this).parent().parent(),
						$fromDataInput=$graPan.find('.fromData-input'),
						$myDataInput = $graPan.find('.myData-input');
					if($(this).val()=="true"){
						$fromDataInput.show();
						$myDataInput.hide();
					}else{
						$fromDataInput.hide();
						$myDataInput.show();
					}
				}

				//生成自定义输入框
				function addInput() {
					num++;
					var strTmp =[
	                            '<div class="u-input-group f-input-group"><a href="#" class="f-del">X</a>',
	                            '<ul class="f-group-list u-group-list">',
	                            '<li>',
	                            '<span><label for="title'+num+'">表头'+num+':</label></span>',
	                            '<input type="text" class="title" id="title'+num+'" value="" ><br>',
	                            '</li>',
	                            '<li><span><label for="colsNum1">占据列数:</label></span>',
	                            '<input type="number" class="colsNum" id="colsNum1" value="1" min="1"></li>',
	                            '<li>',
	                            '<span>从后台数据中生成:</span>',
	                            '<label for="fromData'+num+'-yes">是 </label><input type="radio" name="fromData'+num+'" id="fromData'+num+'-yes" class="fromDataRadio" checked="true" value="true"/>',
	                            '<label for="fromData'+num+'-no">否 </label><input type="radio" name="fromData'+num+'" id="fromData'+num+'-no" class="fromDataRadio" value="false"/>',
	                            '</li>',
	                            '<li class="fromData-input">',
	                            '<span><label for="dataName'+num+'">对应字段名:</label></span>',
	                            '<input type="text" class="dataName" id="dataName'+num+'" placeholder="多个用英文逗号隔开"/>',
	                            '</li>',
	                            '<li class="myData-input">',
	                            '<span><label for="htmlVal'+num+'">对应内容:</label></span>',
	                            '<input type="text" class="htmlVal" id="htmlVal'+num+'" placeholder="多个用英文逗号隔开">',
	                            '</li></ul></div>'
	                        ].join("");
					liArr.push(strTmp);
					// console.log(liArr);
					$('.u-edit-box').append(liArr[num-1]);
					console.log(num);
				}

				//生成表格
				function createTbl(obj) {
					var $title = $('.u-edit-box').find('.title');

					var iCols = $title.length;
					var allColNum=valCol.reduce(function(prev,cur,index,array){
						return prev+cur;
					});
					
					oTab=null;

					var oth = null,otd=null;
					console.log(obj);

					$(obj).find('table').remove();

					if(!oTab){
						oTab=$('<table><thead><tr></tr></thead><tbody><tr></tr><tr></tr><tr></tr></tbody></table>');
						for (var i = 0; i < iCols; i++) {
							oth=$('<th></th>');
							oth.attr('colspan',valCol[i]);
							oth.html($title.eq(i).val());
							oTab.find('tr').eq(0).append(oth);
							
						}
						var trlen = oTab.find('tr').length;
						for (var j = 1; j < trlen; j++) {
							for (var i = 0; i < allColNum; i++) {
								otd=$('<td></td>');
								otd.html('模板数据'+(i+1));
								oTab.find('tr').eq(j).append(otd);
							}
						}
						

						$(obj).append(oTab);
						$('.u-edit-box').html("");
						$('.u-edit-btn-box').html("");

					}
				}
			}
		}
		homepage.tableInit();
		// module.exports=window.tableConfig;


/***/ }
/******/ ]);