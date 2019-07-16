layui.use(['carousel', 'layer', 'form', 'element'], function () {
  var layer = layui.layer
    , form = layui.form;
  var carousel = layui.carousel
    , form = layui.form;
  var element = layui.element;

  var ins = carousel.render({
    elem: '#test1'
    , arrow: 'none'
  });

  $("#test1").on("touchstart", function (e) {
    ins.autoplay(false)
    var startX = e.originalEvent.targetTouches[0].pageX;//????X
    $(this).on('touchmove', function (e) {
      arguments[0].preventDefault();//???????????
    });
    $(this).on('touchend', function (e) {
      ins.autoplay(true)
      var endX = e.originalEvent.changedTouches[0].pageX;//????X
      e.stopPropagation();//??DOM????????
      if (endX - startX > 30) {
        ins.slide("sub");
      }
      else if (startX - endX > 30) {
        ins.slide("add");
      }
      $(this).off('touchmove touchend');
    });
  });


});