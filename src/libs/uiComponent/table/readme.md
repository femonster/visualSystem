table模板

TableVal()参数：
1.fromData, boolean值，表示表内容是否是从data中获取
2.val , 表示数据中的属性名
3.htmlVal，自定义数据，当表内容不是从data中获取时，在这里定义

tableConfiger={
	titleMap(表头与内容的对应表):
	{
		titleName:"你的表头名字",
		titleValue:[new TableVal(arguments)]（需要对应的data,如果需要多列内容，new多个TableVal()）
	},
	{
	tableId(数据的id主键，用于操作标识):
		[
			{
			id:[new TableVal(arguments)]
			}
		]
	}
}

二次确认模板

  var comfirmBox = new ConfirmBox(options)

   options 结构如下：
   {
     text:  confirmBox框体中的内容,
     btnInfo: [{text(String): 第一个button显示的内容, callBack(function): 点击第一个按钮的回调}]
   }

   第二个按钮同第一个

   除 confirmBox 以外的属性都有默认值， 两个按钮默认文案为取消，确认，取消按钮默认点击事件为关闭confirmBox 

