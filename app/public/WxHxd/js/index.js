layui.use(['carousel','layer', 'form','element'], function(){
    var layer = layui.layer
    ,form = layui.form;
    
    layer.msg('Hello World');
    var carousel = layui.carousel
    ,form = layui.form;
    var element = layui.element;
    //常规轮播
    carousel.render({
      elem: '#test1'
      ,arrow: 'always'
    });
  });