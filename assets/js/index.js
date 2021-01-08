$(function() {
    const layer = layui.layer;
    // 登录首先调用请求得到用户信息
    getUserInfo();
    // 退出账号
    $("#btnLogout").on("click", function() {
        layer.confirm('确定要退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
    })
})

function getUserInfo() {
    const layer = layui.layer;
    $.get("/my/userinfo", function(res) {
        if (res.status !== 0) return layer.msg(res.message);
        // console.log(res);
        // 使用获取过来的头像替换本地的
        // console.log(res.data.user_pic);
        if (res.data.user_pic) {
            $(".layui-nav-img").attr("src", res.data.user_pic).show();
        } else {
            let username = res.data.nickname || res.data.username;
            username = username.substring(0, 1).toUpperCase();
            // console.log(username);
            $(".icoAvatar").html(username).show();
        }
        // 使用获取过来的昵称或者用户名替换本地的
        let wel = res.data.nickname || res.data.username
        $(".user_name").html("欢迎 " + wel)

    })
}