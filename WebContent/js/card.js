(function(doc, win) {
	var CARD_LIST = null;
	function Page() {
		this.init = function() {
			this.initWeb();
			this.getList();
		};
		this.getList = function() {
			Common.request({
				url : 'coup/list',
				success : Page.prototype.renderList
			});
		};
		this.add = function(data, callback){
			Common.request({
				url: 'coup/add',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.update = function(data, callback){
			Common.request({
				url: 'coup/update',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.del = function(sid, callback){
			Common.request({
				url: 'coup/del',
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
					    title: '新增会员卡',
					    area: ['450px', '550px'],
					    content: $('#win-content')
					  });
				  });
				  form.on('submit(addServ)', function(data) {
						var id = $('#card-id').val();
						function callback(data){
							if (data.code == 0){
								layer.close(popWin);
								_this.clearForm();
								_this.getList();
							}
						}
						var discount = $.trim(data.field.discount);
						if (!discount){
							Common.alert('请输入折扣');
							return false;
						}
						if (!/^\d+(\.?\d*)?$/.test(discount)){
							Common.alert('折扣仅接受数字');
							return false;
						}
						var peopleNo = $.trim(data.field.peopleNo)?$.trim(data.field.peopleNo):-1;
						if (peopleNo=='无限制' || isNaN(parseInt(peopleNo)))
							peopleNo = -1;
						var param = {
							coupon_name: data.field.cardName,
							price: data.field.price,
							discount_m: discount,
							people_no: parseInt(peopleNo),
							mark_l: data.field.mark
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
					area : [ '450px', '550px' ],
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
			$('#addCardForm input, #addCardForm select').each(function(){
				switch (this.name){
					case 'cardName':
						this.value = b.coupon_name;
						break;
					case 'price':
						this.value = b.price;
						break;
					case 'discount':
						this.value = b.discount_m;
						break;
					case 'peopleNo':
						this.value = b.people_no==-1?'':b.people_no;
						break;
					case 'mark':
						_this.renderUseExpired(this, b.mark_l);
						break;
				}
			});
			$('#card-id').val(b.id);
		},
		renderUseExpired: function(element, selected){
	        var h  = '';
	        if (selected == '半年'){
	        	h += '<option selected value="半年">半年</option><option value="一年">一年</option><option value="二年">二年</option>';
	        } else if (selected == '一年'){
	        	h += '<option value="半年">半年</option><option selected value="一年">一年</option><option value="二年">二年</option>';
	        } else if (selected == '二年'){
	        	h += '<option value="半年">半年</option><option value="一年">一年</option><option selected value="二年">二年</option>';
	        } else{
	        	h += '<option value="半年">半年</option><option value="一年">一年</option><option value="二年">二年</option>';
	        } 
	        $(element).html(h);
	        Common.getLayForm(function(form){
	        	form.render('select');
	        });
		},
		renderList : function(data) {
			var html = '';
			CARD_LIST = {};
			console.log(data);
			if (data.code == 0){
				$.each(data.content, function(){
					CARD_LIST[this.id] = this;
					html += '<tr>'+
		                        '<td>'+this.coupon_name+'</td>'+
		                        '<td>'+this.price+'</td>'+
		                        '<td>'+this.discount_m+'</td>'+
		                        '<td>全天</td>'+
		                        '<td>'+(this.people_no==-1?'不限':this.people_no)+'</td>'+
		                        '<td>'+(this.mark_l?this.mark_l:'')+'</td>'+
		                        '<td>'+
		                        	'<button type="button" class="btn btn-sm btn-dark mod" sid="'+this.id+'">编辑</button>&nbsp;&nbsp;'+
		                        	'<button type="button" class="btn btn-sm btn-danger del" sid="'+this.id+'">删除</button>'+
		                        '</td>'+
		                    '</tr>';
				});
			}
			$('#card-list').html(html);
		},
		clearForm: function(){
			$('#card-id').val('');
			$('#addCardForm input').each(function(){
				if (this.name)
					this.value = '';
			});
		}
	};
	win.Page = Page;
})(document, window);
$(document.body).ready(function() {
	new Page().init();
});