require('./table.scss');

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
