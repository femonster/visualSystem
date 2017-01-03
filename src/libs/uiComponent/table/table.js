require('./table.scss');
var tableConfig = require('./tableConfig.js');
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
