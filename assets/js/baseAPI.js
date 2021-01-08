$(function() {
    $.ajaxPrefilter((options) => {
        // Modify options, control originalOptions, store jqXHR, etc
        // 更换请求地址  http://api-breakingnews-web.itheima.net
        options.url = "http://api-breakingnews-web.itheima.net" + options.url;
        // console.log(options.url);
        // 为有 /my 的请求地址设定请求头
        if (options.url.indexOf("/my/") !== -1) {
            options.headers = {
                Authorization: localStorage.getItem("token") || "",
            }
        }
        // 请求无论成功与否，都会返回compete回调函数
        options.complete = (res) => {
            if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }

    });
})