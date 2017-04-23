$(document).ready(function(){
	var vm = new Vue({
		el: '#content_wrapper',
		data: {
			popWin: null,
			curVip: {coupons: {},gender:null},
			curPage: 1,
			totalPage: 1,
			searchKey : null,
			startTime : null,
			endTime : null,
			coupons: null,
			customerList: []
		},
		created: function(){
			this.getList(this.curPage);
			layui.use(['layer', 'form','element','laydate'], function(){
				var form = layui.form();
				form.on('submit(addvip)', function(data){
					vm.addVip();
					return false;
				});
				form.on('submit(search)', function(data){
					vm.searchVipList();
					return false;
				});
				form.on('select(coupon)', function(data){
					vm.curVip.coupons.coupon_id = data.value;
				});
				form.on('radio(gender)', function(data){
					vm.curVip.gender = parseInt(data.value);
				});
			});
			this.getCoupons();
		},
		methods: {
			changeStartTime : function(v){
				vm.startTime = v;
			},
			changeEndTime : function(v){
				vm.endTime = v;
			},
			searchVipList : function(){
				var data = {
						page : {pageNo: 1},
						searchKey : vm.searchKey,
						startTime : vm.startTime,
						endTime:vm.endTime
				};
				Common.request({
					url: 'customer/vip_list',
					type: 'post',
					data: data,
					success: function(data){
						if (data.code == 0){
							vm.curPage = 1;
							vm.totalPage = data.content.totalPage;
							vm.customerList = data.content.results;
						} else {
							Common.alert(data.msg);
						}
						console.log(vm.customerList);
					}
				});
			},
			getList: function(pageNo){
				Common.request({
					url: 'customer/vip_list',
					type: 'get',
					data: {pageNo: pageNo || vm.curPage},
					success: function(data){
						if (data.code == 0){
							vm.curPage = pageNo;
							vm.totalPage = data.content.totalPage;
							vm.customerList = data.content.results;
						} else {
							Common.alert(data.msg);
						}
						console.log(vm.customerList);
					}
				});
			},
			showWin: function(){
				vm.curVip = {coupons: {},gender:1};
				vm.renderCoupons(vm.coupons);
				setTimeout(function(){
					Common.getLayer(function(layer){
						vm.popWin = layui.layer.open({
							type: 1,
							title: '新增会员',
							area: ['500px', '550px'],
							content: $('#win-content')
						});
					});
				});
			},
			getCoupons: function(){
				Common.request({
					url: 'coup/list',
					type: 'get',
					success: function(data){
						data.code == 0 && (vm.coupons = data.content);
					}
				});
			},
			modify: function(vip){
				this.curVip = vip;
				if(vm.curVip.id){
					vm.curVip.coupons.old_coupon_id = vm.curVip.coupons.coupon_id;
					vm.curVip.coupons.old_coupon_no = vm.curVip.coupons.coupon_no;
				}
				setTimeout(function(){
					vm.renderCoupons(vm.coupons, vip.coupons.coupon_id);
					Common.getLayer(function(layer){
						vm.popWin = layui.layer.open({
							type: 1,
							title: '修改',
							area: ['500px', '550px'],
							content: $('#win-content')
						});
					});
				});
			},
			deleteVip: function(id){
				Common.confirm('确定要删除会员吗？删除之后不可恢复，请谨慎操作', function(){
					Common.request({
						url: 'customer/del',
						data: {customer_id : id},
						success: function(data){
							Common.alert(data.msg);
							console.log(data);
							vm.getList(vm.curPage);
						}
					});
				});
			},
			addVip: function(){
				vm.curVip.cust_type = 1;//会员类型
				Common.request({
					url: vm.curVip.id ? 'customer/update' : 'customer/add',
					type:'post',
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(vm.curVip),
					success: function(data){
						Common.alert(data.msg);
						console.log(data);
						if(data.code == 0){
							vm.getList(vm.curPage);
							layui.layer.close(vm.popWin);
						}
					}
				});
			},
			renderCoupons: function(list, selected){
				var h = '<option value="">请选择卡种</option>';
				$.each(list, function(){
					if (this.id == selected){
						h += '<option value="'+this.id+'" selected>'+this.coupon_name+'</option>';
					} else {
						h += '<option value="'+this.id+'">'+this.coupon_name+'</option>';
					}
				});
				$('#coupList').html(h);
				layui.use(['form'], function(){
					layui.form().render('select');
				});
			},
			renderGender : function(value){
				var h = '';
				if(value == 0){
					h += '<input lay-filter="gender" type="radio" name="sex" value="1" title="男" >';
					h += '<input lay-filter="gender" type="radio" name="sex" value="0" title="女" checked="">';
				}else{
					h += '<input lay-filter="gender" type="radio" name="sex" value="1" title="男" checked="">';
					h += '<input lay-filter="gender" type="radio" name="sex" value="0" title="女">';
				}
				$('#custGender').html(h);
				layui.form().render('radio'); 
			}
		}
	});
	vm.$watch('coupons', function(newValue, oldValue){
		vm.renderCoupons(newValue);
	});
	vm.$watch('curVip.gender', function(newValue, oldValue){
		vm.renderGender(newValue);
	});
	window['vm'] = vm;
});