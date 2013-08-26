/*
if(console+"" == 'undefined'){
    console = function (){
        this.info = function(){};
    }();
}
*/

function set_center(elm){
    var w = $(window).width();
    var h = $(window).height();
    var tw = $(elm).width();
    var th = $(elm).height();
    //console.info(tw);
    $(elm).css("left", w/2.0 - tw/2.0 + document.body.scrollLeft+document.documentElement.scrollLeft);
    $(elm).css("top", h/2.0 + document.body.scrollLeft+document.documentElement.scrollLeft);
}

//定义textarea的光标位置
function locate_point(a,b,c){
    if(document.createRange){
        //console.info(a);
        a.setSelectionRange(b,c);
    }else{
        a=a.createTextRange();
        a.collapse(1);
        a.moveStart("character",b);
        a.moveEnd("character",c-b);
        a.select()
    }
    a.focus();
}



function show_message(data, timeout, callback){
    if(!data)return;
    if(!timeout)timeout = 1000;
    messagelist = $('.messagelist');
    if (messagelist.size() == 0){
        messagelist = $('<div class="messagelist"></div>');
        messagelist.appendTo($('body'));
    }
    messagelist.html(data);
    set_center(messagelist);
    messagelist.fadeIn('fast');
    setTimeout(function(){
        messagelist.fadeOut('fast', function(){
            $(this).html("");
            if(callback)callback();
        })
    }, timeout);
}


String.prototype.format = String.prototype.f = function () {
  var args = arguments;
  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return args[n];
  });
};

String.prototype.endsWith = function (suffix) {
  return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.startsWith = function(prefix) {
  return (this.substr(0, prefix.length) === prefix);
}

jQuery.extend({
    debug :  function() {
        return;
        if (!console || !console.log) {return;}
        if (arguments.length === 0) {
            debugger;
        } else {
            Function.apply.apply(console.log, [console, arguments]);
        }
    }
});
/*@param 文字，关闭的时间间隔（为0则不自动关闭，改为显示按钮关闭；有数字则不显示关闭按钮并按间隔自动关闭），回调函数， 有无关闭按钮， iconurl*/
function alertBox(/*str*/text, /*num*/timeout, /*function*/callback, /*boolean*/bHasCancelBtn, /*str*/iconUrl) {
    var box, content, htmlCode;
    // if (timeout) {
    //     htmlCode = '<div class="alertBox"><h5></h5><div class="alertContent"></div></div>';
    // } else {
    //     if (!bHasCancelBtn) {
    //         htmlCode = '<div class="alertBox"><h5></h5><div class="alertContent"></div><a href="javascript:void(0);" class="closeBtn">确定</a></div>';
    //     } else {
    //         htmlCode = '<div class="alertBox"><h5></h5><div class="alertContent"></div><a href="javascript:void(0);" class="closeBtn">确定</a></div><a href="javascript:void(0);" class="closeBtn">取消</a></div>';
    //     }
    // }
    text = '<p>' + text + '</p>';
    htmlCode = '<div class="alertBox"><h5></h5><div class="alertContent">';
    if (iconUrl) {
        htmlCode += '<div class="iconWrap"><img src="' + iconUrl + '"></div>';//添加ICON图标
    }
    if (timeout) {
        htmlCode += text + '</div></div>';//自动关闭，无需按钮
    } else if (bHasCancelBtn) {//不自动关闭&有取消按钮
        htmlCode += text + '</div><a href="javascript:void(0);" class="closeBtn">确定</a><a href="javascript:void(0);" class="cancelBtn">取消</a></div>';
    } else  { //不自动关闭&无取消按钮
        htmlCode += text + '</div><a href="javascript:void(0);" class="closeBtn">确定</a></div>'
    }
    $('body').append(htmlCode);
    box = $('.alertBox');
    //content = $('.alertBox .alertContent');
    //content.html(text);
    box.css({'top':document.body.scrollTop+document.documentElement.scrollTop + ($(window).height() - box.height()) / 2,
            'left': document.body.scrollLeft+document.documentElement.scrollLeft + ($(window).width() - box.width()) / 2});
    box.fadeIn('100');
    if (timeout) {
        setTimeout(function() {close();}, timeout);
    }
    $('.alertBox .closeBtn').click(function() {
        close();
    });
    $('.alertBox .cancelBtn').click(function() {
        box.fadeOut('100', function(){
            box.remove();
        });
    });
    function close() {
        box.fadeOut('100', function(){
            box.remove();
            if(callback) callback();
        });
    }
}