$(document).ready(function(){
	var Now = new Date();
	var Reg = {
			list: function(callback, date){
				Common.request({
					url: 'reg/list_by_massager',
					type: 'get',
					data: {date: date||Now},
					success: callback
				});
			},
			endMassage: function(id, callback){
				Common.request({
					url: 'reg/update_status',
					data: {id: id, reg_status: 3},
					success: callback
				});
			}
	};
	var vm = new Vue({
		el: '#content',
		data: {regList: [],curDate: '今日调理'},
		created:function() {
			this.getRegList();
		},
		methods: {
			endMassage: function(regId, event){
				Common.confirm('确定要下钟吗？', $.proxy(function(){
					Reg.endMassage(regId, $.proxy(function(data){
						Common.alert(data.msg);
						data.code==0&&this.getRegList();
					},this));
				},this));
			},
			getRegList: function(){
				Reg.list($.proxy(function(data){
					vm.regList = data.content;
				},this));
			},
			prevDay: function(){
				Now.setDate(Now.getDate()-1);
				Now.getDate()==new Date().getDate()?this.curDate = '今日调理':this.curDate = Now.Format('yyyy年MM月dd号');
				this.getRegList();
			},
			nextDay: function(){
				Now.setDate(Now.getDate()+1);
				Now.getDate()==new Date().getDate()?this.curDate = '今日调理':this.curDate = Now.Format('yyyy年MM月dd号');
				this.getRegList();
			},
			today: function(){
				Now = new Date();
				this.curDate = '今日调理';
				this.getRegList();
			},
			goonMasg: function(id){
				Common.confirm('确定要继续调理吗？', function(){
					Common.request({
						url: 'reg/update_status',
						type: 'get',
						data: {id: id, reg_status: 1},
						success: function(data){
							Common.alert(data.msg);
							data.code==0&&vm.getRegList();
						}
					});
				});
			}
		}
	});
});