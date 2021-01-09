$(function() {
    const form = layui.form;
    const layer = layui.layer;

    initUserInfo();
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        let data = form.val("userInfo_form")
        console.log(data);
        $.post("/my/userinfo", data, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            window.parent.getUserInfo();
        })
    })
    $("#resetInfo").on("click", function() {
        initUserInfo()
    })

    // 获取用户信息
    function initUserInfo() {
        $.get("/my/userinfo", function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            form.val("userInfo_form", res.data)
        })
    }
})