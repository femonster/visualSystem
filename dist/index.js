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

	    //删除布局框
	    $(oAimWrap).on('click','.m-demo-del-handler',function(){
	        $(this).parent().remove();
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

	    //生成组件
	    function createtable(obj) {
	        tableTmp.init(obj);
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
	exports.push([module.id, "@charset \"UTF-8\";\nbody {\n  position: relative; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0; }\n\n.g-header, .g-wrap, .g-section, .g-aside {\n  position: absolute; }\n\n.g-header {\n  width: 100%;\n  height: 43px;\n  background-color: lightblue;\n  top: 0; }\n\n.g-wrap {\n  width: 100%;\n  background-color: #999;\n  top: 45px;\n  min-width: 1254px; }\n\n.g-aside {\n  width: 20%;\n  height: 100%;\n  top: 0; }\n\n.g-section {\n  width: 80%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  background-color: #c0c0c0;\n  padding: 10px; }\n\n.g-drag-box, .g-control-box {\n  width: 100%; }\n\n.g-drag-box {\n  height: 36%;\n  background-color: #eee;\n  border-bottom: 2px solid #999; }\n\n.g-gide-box {\n  height: 32%;\n  background-color: #eee;\n  border-bottom: 2px solid #999; }\n\n.g-control-box {\n  height: 32%;\n  background-color: #eee; }\n\n.sortable-ghost {\n  opacity: 0.4;\n  background-color: #F4E2C9; }\n\n.g-gide-box .m-demo-item {\n  cursor: move;\n  margin-bottom: 10px;\n  width: 100%;\n  border: 2px dotted #999;\n  border-radius: 5px;\n  background-color: #fff;\n  font-size: 12px;\n  text-align: center;\n  color: #e99;\n  position: relative;\n  padding: 5px 0;\n  line-height: 12px; }\n\n.g-gide-box .m-demo-item span, .g-gide-box .m-demo-item p {\n  display: none; }\n\n.g-gide-box .m-header-content:after {\n  content: \"\\5934\\90E8\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-nav-content:after {\n  content: \"\\5BFC\\822A\\680F\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-fpage-content:after {\n  content: \"\\5206\\9875\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-riqi-content:after {\n  content: \"\\65E5\\671F\\6A21\\5757\\533A\\57DF\"; }\n\n.g-gide-box .m-table-content:after {\n  content: \"\\8868\\683C\\6A21\\5757\\533A\\57DF\"; }\n\n.g-section .m-demo-item {\n  margin-bottom: 10px;\n  width: 100%;\n  border: 2px dotted #999;\n  border-radius: 5px;\n  background-color: #fff;\n  font-size: 24px;\n  text-align: center;\n  color: #e99;\n  position: relative;\n  padding: 10px 0;\n  line-height: 25px; }\n\n.g-section .m-demo-item:hover span {\n  opacity: 1; }\n\n.g-section .m-demo-item span {\n  position: absolute;\n  display: block;\n  width: 50px;\n  height: 20px;\n  font-size: 12px;\n  line-height: 16px;\n  top: 4px;\n  opacity: 0.4;\n  transition: 0.4s; }\n\n.g-section .m-demo-item .m-demo-drag-handler {\n  left: 4px; }\n\n.g-section .m-header-content:after {\n  content: \"\\5C06header\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-nav-content:after {\n  content: \"\\5C06nav\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-fpage-content:after {\n  content: \"\\5C06  fpage\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-riqi-content:after {\n  content: \"\\5C06  datepicker\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-table-content:after {\n  content: \"\\5C06table\\7EC4\\4EF6\\62D6\\5411\\6B64\\533A\\57DF\"; }\n\n.g-section .m-demo-item .m-demo-del-handler {\n  left: 58px; }\n\n.g-section .m-demo-item .m-demo-update-handler {\n  left: 112px; }\n\n.g-section .m-demo-item .m-demo-del-handler:hover {\n  cursor: pointer; }\n\n.g-section .m-demo-item .m-demo-drag-handler:hover {\n  cursor: move; }\n\n.g-section .m-demo-item .m-demo-update-handler:hover {\n  cursor: pointer; }\n\n.g-header .u-title {\n  margin-left: 10px;\n  line-height: 43px; }\n\n.g-header .u-toolbar {\n  margin: 5px 0 0 100px; }\n\n.g-aside .u-drag-title {\n  padding: 10px; }\n\n.g-aside .m-drag-list li {\n  border-radius: 0;\n  z-index: 100; }\n\n.g-aside .m-drag-list:hover {\n  cursor: move; }\n", ""]);

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

	tableTmp ={
	    init:function(obj){
	        $(obj).removeClass('m-table-content');
	        var str="<div><table><thead><tr><th>标题一</th>"+
	                "<th>标题二</th><th>标题三</th></tr></thead>"+
	                "<tbody><tr><td>2</td><td>2</td><td>2</td></tr><tr><td>2</td><td>2</td><td>2</td></tr><tr><td>2</td><td>2</td><td>2</td></tr></tbody></table></div>"
	        var $table = $(str);
	         $(obj).append($table);
	    }
	}
	 module.exports=tableTmp;



	// tableTmp ={

	//     init:function(data,tableConfiger){

	//         var sortdata=[]
	//             ,idData=[]
	//             ,mapArray=tableConfiger.titleMap
	//             ,idArr = tableConfiger.tableId
	//             ,table=$("<table></table>")
	//             ,headTr=  $("<tr></tr>");

	//         //返回一个titleValue数组
	//         function getValues(){
	//         var arr=[];
	//         for(var i=0,len=mapArray.length;i<len;i++){
	//             var titleValueArray=mapArray[i].titleValue;
	//             for(var j=0;j<titleValueArray.length;j++){
	//                arr.push(titleValueArray[j]);
	//             }
	//         }
	//         return arr;
	//         }

	//         //返回id数组
	//         function getId(){
	//             var arr=[];
	//             // for (var i = 0,len=idArr.length; i < len; i++) {
	//                var idValArr =idArr[0].id;
	//                for (var j = 0,len2=idValArr.length; j <len2 ; j++) {
	//                    arr.push(idValArr[j]);
	//                }
	//             // }
	//             // console.log(idValArr);
	//             return arr; 
	//          }

	//         for(var i=0,len=mapArray.length;i<len;i++){
	//             if(mapArray[i].titleName){
	//                 var th=$("<th></th>");
	//                 th.text(mapArray[i].titleName);
	//                 th.attr('colspan',mapArray[i].titleValue.length);
	//                 headTr.append(th); 
	//             }
	            
	//         }
	//          table.append(headTr); 
	//          sortdata=getValues();
	//          idData=getId();
	   
	//         for(var i=0,len=data.length;i<len;i++){
	//             var tr=$('<tr></tr>');
	//            for(var j=0,len2=sortdata.length;j<len2;j++){
	//             var td=$("<td></td>");
	//             if(sortdata[j].fromData){
	//                 td.html(data[i][sortdata[j].val]);
	//             }else{
	//                 td.html(sortdata[j].htmlVal);
	//             }

	//             tr.append(td);
	//            }

	//             for (var k = 0,len3=idData.length; k < len3; k++) {
	//                 var keyName=idData[k]["val"];
	//                 tr.attr('data-'+keyName+'',data[i][idData[k].val]);
	//                 // if(tr.find('button')){tr.find('button').attr('data-id',data[i][idData[k].val])}
	//                 // if(tr.find('a')){tr.find('a').attr('data-id',data[i][idData[k].val])}
	//                 // if(tr.find('input[type="button"]')){tr.find('input[type="button"]').attr('data-id',data[i][idData[k].val])}
	//             }

	//            table.append(tr);
	//         }

	//         $("body").append(table);
	   
	//     }
	//  }

	// // homepage.init(data);
	// module.exports=tableTmp;


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
	exports.push([module.id, "table {\n  width: 80%;\n  min-width: 950px;\n  box-sizing: border-box;\n  font-size: 13px;\n  margin-top: 10px;\n  border: 1px solid #ddd;\n  border-collapse: collapse;\n  margin: 20px auto 0;\n  color: #000; }\n  table th {\n    text-align: center;\n    min-width: 60px;\n    height: 50px; }\n  table tbody, table tr {\n    box-sizing: border-box; }\n  table tr {\n    background-color: #fff;\n    height: 30px; }\n    table tr td {\n      border: 1px solid #eaeaea;\n      text-align: center;\n      font-size: 12px;\n      height: 50px; }\n    table tr:nth-of-type(odd) {\n      background-color: #fefefe; }\n    table tr:nth-of-type(even) {\n      background-color: #fff; }\n  table input[type=\"button\"], table button {\n    color: red;\n    background-color: #fff;\n    border: 1px solid #e84a5f;\n    cursor: pointer;\n    border-radius: 2px; }\n  table input[type=\"button\"]:focus, table button:focus {\n    outline: none; }\n  table a {\n    text-decoration: none;\n    color: red;\n    cursor: pointer; }\n", ""]);

	// exports


/***/ }
/******/ ]);