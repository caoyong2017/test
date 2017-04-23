var Reg = {
	getList: function(param){
		param.reg_status = 4;
		Common.request({
			url: 'reg/list',
			data: param,
			success: function(data){
				vm.regList = data.content;
			}
		});
	},
	getMassagers: function(callback){
		Common.request({
			url: 'massager/list',
			success: callback
		});
	}
};
var vm = new Vue({
	  el: '#content',
	  data: {
		  date: '',
		  massager: '',
		  regList: []
	  },
	  created:function() {
		  Reg.getList({}, function(data){
			  vm.regList = data.content;
		  });
		  Reg.getMassagers(this.renderMassagers);
	  },
	  methods: {
		  renderMassagers: function(data){
			  var h = '<option value="">请选择调理师</option>';
			  $.each(data.content, function(){
				  h += '<option value="'+this.id+'">'+this.nickname+'</option>';
			  });
			  $('#massagers').html(h);
			  Common.getLayForm(function(f){
				  f.render('select');
			  });
		  }
	  }
});
layui.use(['layer', 'form','element','laydate'], function(){
  var layer = layui.layer,form = layui.form();
  form.on('submit(search)', function(data){
	  var param = {};
	  if (data.field.date)
		  param.date = data.field.date.replace(/-/g,'/');
	  if (data.field.massager)
		  param.massager = data.field.massager;
	  Reg.getList(param);
	  return false;
  });
});