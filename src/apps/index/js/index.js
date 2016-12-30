    require('../scss/index.scss');

     var tableTmp=require('table');

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
