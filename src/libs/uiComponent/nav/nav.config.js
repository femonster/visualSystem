
 var nav = require('nav');


window.index_nav = {
  createSecMenu: function(){
    $('.aside-nav').delegate('.sure','click',function(){      
          var $thisP = $(this).parents(".input-box");
          $thisP.find(".append").html("");
          var index = $thisP.find(".secNum").val(); //bug
          for(var i=0;i<index;i++){
           var secMenu = "<span><label for='secName'>第"+(i+1)+"个二级菜单名称:</label></span>"+
           "<input type='text' class='secName'/>"
           $thisP.find(".append").append(secMenu);
         }
       });
  },
  createConfig: function(){
    this.createSecMenu();
    var navArr = [];
    $('.aside-nav').delegate('.add','click',function(){
      var p = $(".input-box");    
      if (navArr.length == 0) {
        var firstArr = $(".first");
        var secNameArr = [];
        for(var j = 0 ; j < firstArr.length ; j++){
          secNameArr = [];
          var obj = {first:firstArr.eq(j).val()};
          var secLength = firstArr.eq(j).parent("li").siblings(".append").find(".secName");
          for(var i = 0; i < secLength.length ; i++){
             var secObj = {name:secLength.eq(i).val()};//bug
             secNameArr.push(secObj);
          }
          obj.second = secNameArr;
          navArr.push(obj);
        }
      }
       nav.init(navArr);
       $(".codeHtml").html("var navConfig = "+JSON.stringify(navArr)+";module.exports=navConfig;");
    })
    return navArr
  },
  createFirstNew: function(){
    $(".addFirst").click(function(){
      var firstNum = $(".firstNum").val();
      var firstNumArr = [];
      for(var i = 0; i < firstNum ;i++){
          firstNumArr.push(i);
      }
      var newStr= Mustache.render(require('./tmp_config.html'),{index:firstNumArr}); //bug
      $(".aside-nav").prepend(newStr);
      $('.first-input-box').hide();
    })
  },
  init: function() {
    this.createConfig();
    this.createFirstNew();
  }
};
index_nav.init();
