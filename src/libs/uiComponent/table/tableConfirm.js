       //二次确认点击
var confirmBox=require('confirmBox');

       var tableConfirm=function(){

            $("table").on('click','button',function(ev){
                var $this=$(this);
                var _thisP=$(this).parent().parent().get(0);
                // console.log(_this);
                new confirmBox({
                    text:"确认"+$this.text()+"？",
                    btnInfo:[
                        {text:"确认",callBack:function(){alert(_thisP.dataset.id);}},
                        {text:"取消"}
                    ]
                });
            });
       }
       
       module.exports =tableConfirm;