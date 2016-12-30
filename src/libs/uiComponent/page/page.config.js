var page = require('page');
var pageConfig = {
  "ajax":"",
  "data":{
    "page":1,
    "eachNum":20,
    "div":".con_page"
  }
}
window.index_page = {
  createConfig: function(){
     $(".add_page").click(function(){
     	pageConfig.ajax = $(".ajaxUrl").val();
     	pageConfig.data.div = $(".parent").val();
     	pageConfig.data.eachNum = $(".eachNum").val();
     	page.init(pageConfig);
     	$(".codeHtml").html(JSON.stringify(pageConfig));
     })
  },
  init: function() {
     this.createConfig();
  }
};
index_page.init();






