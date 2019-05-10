var $;
var layer;
layui.use(['layer', 'jquery'], function () {
    $ = layui.$ //使用layui内置的jquery
    layer = layui.layer;
})
$(function () {
    var ajax = $.ajax;
//  修改ajax方法的默认实现
    $.ajax = function (options, form) {
        var success = options.success;

        //对用户配置的success方法进行代理
        function _success(datas) {
            //此处实现响应拦截
            switch (datas.code) {
                //请求数据,例如获取下拉框等数据，不做任何弹窗处理
                case 200:
                    break;
                //返回指定路径
                case 201:
                    layer.open({
                        title: '消息',
                        content: datas.msg,
                        yes: function (index, layero) {
                            location.href = datas.url;
                        },
                        cancel: function () {
                            //右上角关闭回调 //return false 开启该代码可禁止点击该按钮关闭
                        }
                    })
                    break;
                //刷新当前页面
                case 202:
                    layer.open({
                        title: '消息',
                        content: datas.msg,
                        yes: function (index, layero) {
                            location.reload();
                        },
                        cancel: function () {
                            //右上角关闭回调 //return false 开启该代码可禁止点击该按钮关闭
                        }
                    })
                    break;
            }
            //使用节点上 success 属性 去调用此方法
            var _back = form.attr('success');
            if (_back) {
                eval(_back + '(datas)');
            }
            return success(datas);
        }

        //  代理嵌入调用
        options.success = _success;
        return ajax(options);
    }

    $('.ajaxForm').submit(function () {
        var formData = new FormData($('from').get(0));
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method') ? $(this).attr('method') : 'post',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function () {
            }
        }, $(this))
        return false;
    })

    $('.ajax').click(function () {
        var _this = $(this);
        $.ajax({
            url: _this.attr('href'),
            type: 'get',
            success: function () {
                console.log('3我是原来的回调方法');
            }
        }, _this)
        return false;
    })
})