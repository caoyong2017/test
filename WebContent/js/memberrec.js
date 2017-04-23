layui.use(['layer', 'form','element','laydate'], function(){
  var layer = layui.layer
  ,form = layui.form();
  $("#addReg").click(function(){
	  layer.open({
		    type: 1,
		    title: '新增会员卡级别',
		    area: ['450px', '550px'],
		    content: $('#win-content')
		});
  });
});
