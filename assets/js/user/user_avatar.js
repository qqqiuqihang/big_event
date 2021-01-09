$(function() {
    const layer = layui.layer;
    // 生成裁剪框
    $('#image').cropper({
        aspectRatio: 1 / 1,
        viewMode: 0,
        // crop: function(e) {
        //     // console.log(e);
        // }
        preview: ".img-preview"
    });

    // 更改头像图片
    $("#btnFile").on('click', function() {
        $('#changeFile').click();
    })
    $("#changeFile").on("change", function(e) {
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.files);
        // console.log(e.target.files[0]);
        // 获取选中的文件
        let files = e.target.files;
        // 判断是否上传文件
        if (files.length === 0) return layer.msg("请选择头像");
        // 得到上传的文件中的第一个文件
        let file = files[0];
        // 使用URL.createObjectURL()的方法，生成头像路径
        let imgUrl = URL.createObjectURL(file);
        // console.log(imgUrl);
        // 重新生成cropper区域
        $("#image").cropper("replace", imgUrl);
    });
    // 上传新头像
    $("#sureAvatar").on("click", function() {
        // 拿到裁剪后的头像
        const dataURL = $("#image").cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        }).toDataURL('image/png');
        // console.log(dataURL);
        // 发送更改头像请求
        $.post("/my/update/avatar", { avatar: dataURL }, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            // 更新信息
            window.parent.getUserInfo()
        })
    })
})