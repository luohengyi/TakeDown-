var ajax = $.ajax;
var _node;
//  修改ajax方法的默认实现
$.ajax = function (options) {
    var success = options.success;

    //  对用户配置的success方法进行代理
    function _success(datas) {
        //此处实现响应拦截
        console.log('1我是拦截器');

        //使用节点上 success 属性 去回掉此方法
        var _back = _node.attr('success');
        if (_back){
            eval(_back + '(datas)');
        }

        return success(datas);
    }

    //  代理嵌入调用
    options.success = _success;
    return ajax(options);
}

$('form').submit(function () {
    _node = $('form');
    var formData = new FormData($('from').get(0));
    $.ajax({
        url: _node.attr('action'),
        type: _node.attr('method'),
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            console.log('3我是原来的回调方法');
        }
    },$('form'))
    return false;
})

$('.ajax').click(function () {
    var _this = $(this);
    _node = $(this);
    $.ajax({
        url: _this.attr('href'),
        type: 'get',
        success: function () {
            console.log('3我是原来的回调方法');
        }
    },$('form'))
    return false;
})