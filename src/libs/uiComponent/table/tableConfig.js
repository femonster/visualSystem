
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
