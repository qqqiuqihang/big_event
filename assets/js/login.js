$(function() {
    // 去注册
    $('#toRegister').on('click', function() {
        $('#login_form').hide().siblings("#register_form").show();
    });
    // 去登录
    $('#toLogin').on('click', function() {
        $('#register_form').hide().siblings("#login_form").show();
    });
    // 定义正则表达式
    // 引入layui form模块
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        username: [/^[a-zA-Z]/, '用户名须以字母开始'],
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function(value) {
            // console.log($("#register_form [name=password]").val());
            if (value !== $("#register_form [name=password]").val()) {
                return "两次输入的密码不一致"
            }
        }
    });
    // 发送注册账号请求
    $('#register_form').on('submit', function(e) {
        e.preventDefault();
        const data = {
            username: $('#register_form [name=username]').val(),
            password: $('#register_form [name=password]').val()
        };
        // console.log(data);
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message + "前往登陆！！！")
            $('#toLogin').click()
        })
    });
    // 登录请求
    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        const data = form.val("login_form");
        console.log(data);
        $.post("/api/login", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            };
            // 将得到的 token 存入本地
            localStorage.setItem("token", res.token);
            layer.msg(res.message + "即将前往后台！");
            location.href = "/index.html"
        })

    })
})