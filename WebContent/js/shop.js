(function(doc, win) {
	var SHOP_LIST = null;
	function Shop() {
		this.init = function() {
			this.initWeb();
			this.getShopList();
		};
		this.getShopList = function() {
			Common.request({
				url : 'shop/list',
				success : Shop.prototype.renderShop
			});
		};
		this.addShop = function(data, callback){
			Common.request({
				url: 'shop/add',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.update = function(data, callback){
			Common.request({
				url: 'shop/update',
				data: data,
				success: $.isFunction(callback) && callback
			});
		};
		this.del = function(sid, callback){
			Common.request({
				url: 'shop/del',
				data: {shopId: sid},
				success: $.isFunction(callback) && callback
			});
		};
	}
	Shop.prototype = {
		initWeb : function() {
			var _this = this;
			var popWin = null;
			layui.use([ 'layer', 'form', 'element', 'laydate' ], function() {
				var layer = layui.layer, form = layui.form();
				$("#addReg").click(function() {
					$('#shop-name').val('');
					$('#shop-addr').val('');
					popWin = layer.open({
						type : 1,
						title : '新增分店',
						area : [ '650px', '300px' ],
						content : $('#win-content')
					});
				});
				form.on('submit(add-shop)', function(data) {
					var shopId = $('#shop-id').val();
					function callback(data){
						if (data.code == 0){
							layer.close(popWin);
							_this.getShopList();
						}
					}
					if (!shopId){
						_this.addShop({
							sh_name: data.field.shopname,
							addr: data.field.shopaddr
						}, callback);
					} else {
						_this.update({
							id: shopId,
							sh_name: data.field.shopname,
							addr: data.field.shopaddr
						}, function(data){
							$('#shop-id').val('');
							callback(data);
						});
					}
					return false;
				});
			});
			$('#shop-list').delegate('.mod', 'click', function(){
				popWin = layer.open({
					type : 1,
					title : '编辑分店',
					area : [ '650px', '300px' ],
					content : $('#win-content')
				});
				var shop = SHOP_LIST[this.getAttribute('sid')];
				if (shop){
					$('#shop-id').val(shop.id);
					$('#shop-name').val(shop.sh_name);
					$('#shop-addr').val(shop.addr);
				}
			});
			$('#shop-list').delegate('.del', 'click', function(){
				var sid = this.getAttribute('sid');
				Common.confirm('确定要删除吗？', function(){
					_this.del(sid, function(data){
						Common.alert(data.msg);
						if (data.code == 0){
							_this.getShopList();
						}
					});
				});
			});
		},
		renderShop : function(data) {
			function showUsers(users){
				if (!users || !users.length)
					return '暂无';
				var l = users.length;
				var re = '';
				$.each(users, function(i){
					re += this.nickname;
					if (i < l-1)
						re += '、';
				});
				return re;
			}
			var html = '';
			SHOP_LIST = {};
			if (data.code == 0){
				$.each(data.content, function(){
					SHOP_LIST[this.id] = this;
					html += '<tr>'+
		                        '<td>'+this.sh_name+'</td>'+
		                        '<td>'+new Date(this.create_time).Format('yyyy/MM/dd')+'</td>'+
		                        '<td>'+showUsers(this.admins)+'</td>'+
		                        '<td>'+this.addr+'</td>'+
		                        '<td>'+
		                        	'<button type="button" class="btn btn-sm btn-dark mod" sid="'+this.id+'">编辑</button>&nbsp;&nbsp;'+
		                        	'<button type="button" class="btn btn-sm btn-danger del" sid="'+this.id+'">删除</button>'+
		                        '</td>'+
		                    '</tr>';
				});
			}
			$('#shop-list').html(html);
		}
	};
	win.Shop = Shop;
})(document, window);
$(document.body).ready(function() {
	new Shop().init();
});