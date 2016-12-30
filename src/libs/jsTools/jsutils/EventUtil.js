var EventUtil = {
	addHandler:function(element,type,handler) {
		if (element.addEventListener) {
			//FF
			element.addEventListener(type,handler,false);
		}else if (element.attachEvent){
			//IE
			element.attachEvent("on"+type,function(){
				handler.call(element);    //解决attachEvent中this指向的问题 ，因为默认是window  handler()==handler.call()
			});
		}else{
			//DOM0
			element["on"+type] = handler;
		}
	},
	removeHandler:function(element,type,handler){
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	//获取真正的目标
	getTarget:function(event){
		return event.target || event.srcElement;
	},
	//阻止默认事件
	preventDefault:function(event){
		if (event.preventDefault) {
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	//阻止事件冒泡
	stopPropagation:function(event){
		if (event.stopPropagation) {
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	},
	getCharCode: function(event) {
		if (typeof event.keyCode == "number") {
			return event.keyCode;
		} else {
			return event.charCode;
		}
	}
};

module.exports=EventUtil;