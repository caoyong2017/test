(function(doc, win) {
	var SERV_LIST = null;
	function Page() {
		this.init = function() {
			this.initWeb();
			this.getList();
		};
		this.getList = function() {
			Common.request({
				url : 'ser/list',
				success : Page.prototype.renderList
			});
		};
		this.add = function(data, callback){
			Common.request({
				url: 'ser/add',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.update = function(data, callback){
			Common.request({
				url: 'ser/update',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.del = function(sid, callback){
			Common.request({
				url: 'ser/del',
				data: {id: sid},
				success: $.isFunction(callback) && callback
			});
		};
	}
	Page.prototype = {
		initWeb : function() {
			var _this = this;
			var popWin = null;
			layui.use(['layer', 'form','element','laydate'], function(){
			    var layer = layui.layer, form = layui.form();
			    $("#addReg").click(function(){
			    	_this.clearForm();
		    		_this.renderPriceType(0);
			    	popWin = layer.open({
					    type: 1,
					    title: '新增项目',
					    area: ['450px', '400px'],
					    content: $('#win-content')
					});
			    });
			    var pType = 0;
			    form.on('select(priceType)', function(data){
			    	pType = data.value;
		    	    parseInt(data.value)?$('#totalTimeDiv').hide():$('#totalTimeDiv').show();
		    	});
			    form.on('submit(addServ)', function(data) {
					var id = $('#serv-id').val();
					function callback(data){
						if (data.code == 0){
							layer.close(popWin);
							_this.clearForm();
							_this.getList();
						}
					}
					var param = {
						serv_name: data.field.servName,
						serv_price: data.field.price,
						price_type: pType
					};
					if (param.price_type == 0){
						if (/\D/.test(data.field.totalTime)){
							Common.alert('时长请输入整数');
							return false;
						}
						param.total_time = data.field.totalTime;
					}
					if (!id){
						_this.add(param, callback);
					} else {
						param.id = id;
						_this.update(param, callback);
					}
					return false;
				});
			});
			$('#serv-list').delegate('.mod', 'click', function(){
				popWin = layer.open({
					type : 1,
					title : '编辑服务项目',
					area : [ '450px', '400px' ],
					content : $('#win-content')
				});
				var b = SERV_LIST[this.getAttribute('sid')];
				b && _this.renderForm(b);
			});
			$('#serv-list').delegate('.del', 'click', function(){
				var sid = this.getAttribute('sid');
				Common.confirm('确定要删除吗？', function(){
					_this.del(sid, function(data){
						Common.alert(data.msg);
						if (data.code == 0)
							_this.getList();
					});
				});
			});
		},
		renderForm: function(b){
			$('#serv-id').val(b.id);
			$('#servName').val(b.serv_name);
			$('#priceCol').val(b.serv_price);
			$('#totalTimeCol').val(b.total_time);
			this.renderPriceType(b.price_type);
		},
		renderList : function(data) {
			var html = '';
			SERV_LIST = {};
			if (data.code == 0){
				$.each(data.content, function(){
					SERV_LIST[this.id] = this;
					html += '<tr>'+
		                        '<td>'+this.serv_name+'</td>'+
		                        '<td>'+this.serv_price+'</td>'+
		                        '<td>'+(this.price_type == 0 ? this.total_time?this.total_time:'' : '')+'</td>'+
		                        '<td>'+(this.price_type_value?this.price_type_value:'')+'</td>'+
		                        '<td>'+
		                        	'<button type="button" class="btn btn-sm btn-dark mod" sid="'+this.id+'">编辑</button>&nbsp;&nbsp;'+
		                        	'<button type="button" class="btn btn-sm btn-danger del" sid="'+this.id+'">删除</button>'+
		                        '</td>'+
		                    '</tr>';
				});
			}
			$('#serv-list').html(html);
		},
		renderPriceType: function(selected){
			var h = '';
			selected = parseInt(selected);
			if (selected == 0){
				h += '<option selected value="0">按时长</option><option value="1">按次数</option>';
				$('#totalTimeDiv').show();
			}
			if (selected == 1){
				h += '<option value="0">按时长</option><option selected value="1">按次数</option>';
				$('#totalTimeDiv').hide();
			}
			$('#priceTypeCol').html(h);
			Common.getLayForm(function(form){
				form.render('select');
			});
		},
		clearForm: function(){
			$('#addServForm input').each(function(){
				if (this.name)
					this.value = '';
			});
			$('#serv-id').val('');
		}
	};
	win.Page = Page;
})(document, window);
$(document.body).ready(function() {
	new Page().init();
});