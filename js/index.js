
var lazyLoad = function() {
   // 获取window的引用:
   var $window = $(window);
   // 获取包含data-src属性的img，并以jQuery对象存入数组:
   var lazyImgs = $.map($('img[data-src]').get(), function (i) {
       return $(i);
   });
   // 定义事件函数:
   var onScroll = function() {
       // 获取页面滚动的高度:  scrollTop()获取匹配元素相对滚动条顶部的偏移。
       var wtop = $window.scrollTop();//页面滚动的高度就是窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
       // 判断是否还有未加载的img:
       if (lazyImgs.length > 0) {
           // 获取可视区域高度:
           var wheight = $window.height();
           // 存放待删除的索引:
           var loadedIndex = [];
           // 循环处理数组的每个img元素:
           $.each(lazyImgs, function (index, $i) {
               console.log($i,index)
               // 判断是否在可视范围内:
               if ($i.offset().top - wtop < wheight) {  //$.offset().top获取匹配元素距离文本文档顶的距离。
                   // 设置src属性:
                   $i.attr('src', $i.attr('data-src'));
                   // 添加到待删除数组:
                   loadedIndex.unshift(index);//从大到小排序，保证下边删除操作能顺利进行
               }
           });
           // 删除已处理的对象:
           $.each(loadedIndex, function (index) {
               lazyImgs.splice(index, 1);
           });
       }
   }

   // 绑定事件:
   $window.scroll(onScroll);
   // 手动触发一次:
   // onScroll();

}

$(function(){

    // 图片hover效果
    $('figure img').addClass("hvr-grow"); 


    // 联系信息弹出框
    $('[data-toggle="popover"]').popover({
        container: 'body',
        html: true,
        trigger: 'focus',
        content: function(){
            var title = this.getAttribute("data-v");
            return '<img src="./images/' + title + '.jpg" alt="wechat" width="150" height="150">'
        }
    })

    // ajax
    $("#btn").click(function(){
        console.log("click")
        $.ajax({
            type: 'get',
            cache: false,
            dataType: 'json',
            url: "https://qiniu.yoyoiii.top" + "/list?bucket=store4ue",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(data) {
                console.log("success!");
                console.log(data);
            },
            error: function(error) {
                console.log("fail!");
                console.log(error);
            }  
        });
    });

    
    
});