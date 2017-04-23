$(document.body).ready(function() {
	var vm = new Vue({
		el: '#content_wrapper',
		data: {
			popWin: null,
			shopList: [],
			curUser: {},
			users: []
		},
		created: function(){
			this.getUsers();
			layui.use([ 'layer', 'form', 'element', 'laydate' ], function() {
				var layer = layui.layer, form = layui.form();
				form.on('submit(add-user)', function(data) {
					var param = {
						nickname: data.field.username,
						gender: data.field.sex,
						phone: data.field.phone,
						shop: {
							id: data.field.shop
						}
					};
					if (vm.curUser.id){//更新
						param.id = vm.curUser.id;
						vm.updateUser(param, function(re){
							Common.alert(re.msg);
							if (re.code == 0){
								layer.close(vm.popWin);
								vm.getUsers();
							}
						});
					} else {//添加
						vm.addUser(param, function(re){
							Common.alert(re.msg);
							if (re.code == 0){
								layer.close(vm.popWin);
								vm.getUsers();
							}
						});
					}
					return false;
				});
			});
		},
		methods: {
			showAddUser: function(){
				this.curUser = {};
				vm.popWin = layer.open({
					type : 1,
					title : '新增店长',
					area : [ '500px', '400px' ],
					content : $('#win-content')
				});
			},
			delUser: function(user){
				Common.confirm('确定要删除该账号吗？', function(){
					Common.request({
						url: 'user/del_sp_adm',
						data: {userId: user.id},
						success: function(data){
							Common.alert(data.msg);
							if (data.code == 0)
								vm.getUsers();
						}
					});
				});
			},
			updateUser: function(data, callback){
				Common.request({
					url: 'user/update_sp_adm',
					data: {userJson: JSON.stringify(data)},
					success: callback
				});
			},
			addUser: function(param, callback){
				Common.request({
					url: 'user/add_sp_adm',
					loading: true,
					data: {userJson: JSON.stringify(param)},
					success: callback
				});
			},
			getUsers: function(){
				Common.request({
					url : 'user/sp_adm_list',
					success : function(data){
						vm.users = data.content;
					}
				});
			},
			showUpdatePop: function(user){
				this.curUser = user;
				this.getShopList(user.shop?user.shop.id:'');
				Common.getLayer(function(layer){
					vm.popWin = layer.open({
						type : 1,
						title : '编辑',
						area : [ '500px', '400px' ],
						content : $('#win-content')
					});
					$('#gender input').each(function(){
						if (this.value == user.gender)
							this.checked = true;
						layui.use('form', function() {
							layui.form().render('radio');
						});
					});
				});
			},
			getShopList: function(checked) {
				if (this.shopList.length == 0){
					Common.request({
						url : 'shop/list',
						success : function(data){
							vm.shopList = data.content;
							vm.renderShopList(vm.shopList, checked);
						}
					});
				} else {vm.renderShopList(vm.shopList, checked);}
			},
			renderShopList : function(shopList, checked) {
				var h = '';
				shopList && $.each(shopList, function() {
					h += '<option value="' + this.id + '" ';
					if (checked&&checked==this.id)
						h += 'selected=selected';
					h += '>' + this.sh_name + '</option>';
				});
				$('#shop-list').html(h);
				layui.use('form', function() {
					layui.form().render('select');
				});
			},
			loginByAdmin: function(userId){
				Common.confirm('确定登陆该账号吗？<br><span style="color:#F7B824;font-size:80%">登陆店长账号后当前角色将发生改变</span>', function(){
					Common.request({
						url: 'user/login_shopadmin',
						data: {userId: userId},
						type: 'get',
						success: function(data){
							if (data.code != 0){
								Common.alert(data.msg);
								return false;
							}
							window.location.href = '';
						}
					});
				});
			}
		}
	});
});