$(function () {
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function (value) {
            let newPwd = $(".layui-form [name=newPwd]").val();
            if (newPwd !== value) {
                return "两次密码不一致";
            }
        }
    });

    // 发送更改密码请求
    $("#rePwd_form").on("submit", function (e) {
        e.preventDefault();
        let data = {
            oldPwd: $('.layui-form [name=oldPwd]').val(),
            newPwd: $('.layui-form [name=newPwd]').val()
        }
        console.log(data);
        $.post("/my/updatepwd", data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
        })
    })









})