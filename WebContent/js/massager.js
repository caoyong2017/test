(function(doc, win) {
	var CARD_LIST = null;
	function Page() {
		this.init = function() {
			this.initWeb();
			this.getList();
		};
		this.getList = function() {
			Common.request({
				url : 'massager/list',
				success : Page.prototype.renderList
			});
		};
		this.add = function(data, callback){
			Common.request({
				url: 'massager/add',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.update = function(data, callback){
			Common.request({
				url: 'massager/update',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.del = function(sid, callback){
			Common.request({
				url: 'massager/del',
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
					  popWin = layer.open({
						    type: 1,
						    title: '新增调理师',
						    area: ['500px', '450px'],
						    content: $('#win-content')
						});
				  });
				  form.on('submit(addServ)', function(data) {
						var id = $('#card-id').val();
						function callback(data){
							Common.alert(data.msg);
							if (data.code == 0){
								layer.close(popWin);
								_this.clearForm();
								_this.getList();
							}
						}
						var param = {
							nickname: data.field.nickname,
							gender: data.field.sex,
							desc_l: data.field.desc,
							phone: data.field.phone
						};
						if (!id){
							_this.add(param, callback);
						} else {
							param.id = id;
							_this.update(param, callback);
						}
						return false;
					});
			});
			$('#card-list').delegate('.mod', 'click', function(){
				popWin = layer.open({
					type : 1,
					title : '修改',
					area : [ '500px', '450px' ],
					content : $('#win-content')
				});
				var b = CARD_LIST[this.getAttribute('sid')];
				b && _this.renderForm(b);
			});
			$('#card-list').delegate('.del', 'click', function(){
				var sid = this.getAttribute('sid');
				var $this = $(this).parent().parent();
				Common.confirm('确定要删除吗？', function(){
					_this.del(sid, function(data){
						Common.alert(data.msg);
						if (data.code == 0)
							$this.remove();
					});
				});
			});
		},
		renderForm: function(b){
			var _this = this;
			$('#addForm input, #addForm select,#addForm textarea').each(function(){
				switch (this.name){
					case 'nickname':
						this.value = b.nickname;
						break;
					case 'desc':
						this.value = b.desc_l;
						break;
					case 'phone':
						this.value = b.phone;
						break;
					case 'sex':
						_this.renderGender(b.gender);
						break;
				}
			});
			$('#card-id').val(b.id);
		},
		renderGender: function(selected){
			var h = '';
			if (selected == 0){
				h += '<input type="radio" name="sex" value="1" title="男" /><input type="radio" name="sex" value="0" title="女" checked />';
			} else {
				h += '<input type="radio" name="sex" value="1" title="男" checked /><input type="radio" name="sex" value="0" title="女" />';
			}
			$('#gender').html(h);
			Common.getLayForm(function(f){
				f.render('radio');
			});
		},
		renderList : function(data) {
			var html = '';
			CARD_LIST = {};
			if (data.code == 0){
				$.each(data.content, function(){
					CARD_LIST[this.id] = this;
					html += '<tr>'
						+ '<td>'+ this.nickname+ '</td>'
						+ '<td>'+ this.phone+ '</td>'
						+ '<td>'+ this.gender_value+ '</td>'
						+ '<td>'+ this.desc_l+ '</td>'
						+ '<td>'
							+ '<button type="button" class="btn btn-sm btn-dark mod" sid="'+this.id+'">编辑</button>&nbsp;&nbsp;'
							+ '<button type="button" class="btn btn-sm btn-danger del" sid="'+this.id+'">删除</button>'
						+ '</td>' + '</tr>';
				});
			}
			$('#card-list').html(html);
		},
		clearForm: function(){
			$('#card-id').val('');
			$('#addForm input').each(function(){
				if (this.name)
					this.value = '';
			});
			this.renderGender(1);
		}
	};
	win.Page = Page;
})(document, window);
$(document.body).ready(function() {
	new Page().init();
});