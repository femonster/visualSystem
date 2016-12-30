require('./header.scss');
header={
    init:function (name) {
        var header = Mustache.render(require('./header.html'),{username:name});
        $('body').append(header);
    }
};
module.exports=header;





