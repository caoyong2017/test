jQuery(document).ready(function() {
	var RegList = null;
	var CurrentReg = null;
	var modifyPop = null;
	Core.init();
    var Picker = $('.inline-mp');
    var initialLocaleCode = 'zh';
	var Calendar = $('#calendar');
	var startTime = null;
	var endTime = null;
	//把从后台取出的数据进行封装以后在页面上以fullCalendar的方式进行显示
    // Init FullCalendar Plugin
    Calendar.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        footer:false,
        locale: initialLocaleCode,
        droppable: true, // this allows things to be dropped onto the calendar
        eventRender: function(event, element) {
            // create event tooltip using bootstrap tooltips
            $(element).html('<span style="color:white">' + event.title + '</span>');
            // create a tooltip auto close timer  
            $(element).on('show.bs.tooltip', function() {
                var autoClose = setTimeout(function() {
                    $('.tooltip').fadeOut();
                }, 3500);
            });
            $(element).on('click', function() {
            	CurrentReg = RegList[event.id];
          	  	CurrentReg.reg_status == 0?$('#cancelReg').show():$('#cancelReg').hide();
                Reg.renderCustomerForm(RegList[event.id]);
                modifyPop = layer.open({
        			    type: 1,
        			    title: '修改预约',
        			    area: ['900px', '550px'],
				        content: $('#win-content')
        		  });
                $('#addCustomerForm button.layui-btn[lay-filter=addCustomer]').attr('method', 'updateHandler');
            });
        },
        viewDisplay: function(view) {
      	 
        },
        events : [  ]
    });
	var Reg = {
		getListByMassager: function(massager, callback){
			Common.request({
				url: "reg/massager_fourtyday",
		        data: {id: massager, date: new Date()},
		        success: callback || Reg.renderCalendar
			});
		},
		update: function(data, callback){
			Common.request({
				url: 'reg/update',
				data: {jsonStr: JSON.stringify(data)},
				success: callback
			});
		},
		msaList: function(callback){
			var date = $('#startTimePop').val().replace(/-/g,'/');
			if (!date || !startTime || !endTime)
				return false;
			Common.request({
				url : 'massager/free_list',
				data: {start_time: date+' '+startTime+':00', end_time: date+' '+endTime+':00',reg_date: date},
				success : function(data){
					$.isFunction(callback) ? callback(data) : Reg.renderMassagers(data, vm.curMassager);
				}
			});
		},
		getRoomList: function(callback){
			Common.request({
				url: 'room/list',
				success: callback
			});
		},
		getServList: function(callback){
			Common.request({
				url: 'ser/list',
				success: callback
			});
		},
		renderCalendar: function(data){
			if (data.code == 0)
				data = data.content;
            var obj = {};
            RegList = {};
            Calendar.fullCalendar('removeEvents');
			$.each(data, function(){
				RegList[this.id] = this;
				obj = {
					id: this.id,
					start: new Date(this.start_time).Format("yyyy-MM-dd hh:mm:ss"),
					end: new Date(this.end_time).Format("yyyy-MM-dd hh:mm:ss"),
					phone:this.customer ? ' ' + this.customer.phone : ''
				};
				if (this.reg_status == 1)
					obj.backgroundColor = '#ed7764';
				if (this.reg_status == 0)
					obj.backgroundColor = '#3F9F3F';
				obj.title = obj.start.substring(11,16) +'-' +obj.end.substring(11,16)+'<br/>'+ (this.customer?this.customer.cust_name:'') + obj.phone;
				$("#calendar").fullCalendar('renderEvent',obj,true);
			});
		},
		renderCustomerForm: function(o){
			var _this = this;
			$('#addCustomerForm input, #addCustomerForm textarea, #addCustomerForm select').each(function(){
				switch (this.name){
					case 'username': this.value = o.customer?o.customer.cust_name:''; break;
					case 'phone': this.value = o.customer?o.customer.phone:''; break;
					case 'ver_code': this.value = o.ver_code||''; break;
					case 'mark': this.value = o.mark_l||''; break;
					case 'regDate': this.value = o.reg_date?new Date(o.reg_date).Format('yyyy-MM-dd'):new Date().Format('yyyy-MM-dd'); break;
					case 'room':
						_this.getRoomList($.proxy(function(data){
							this.renderRoomsSelect(data, o.room?o.room.id:'');
						}, _this));
						break;
					case 'massager':
						if (!o.reg_date)
							break;
						$('#startTimePop').val(new Date(o.reg_date).Format('yyyy-MM-dd'));
						startTime = new Date(o.start_time).Format('hh:mm');
						endTime = new Date(o.end_time).Format('hh:mm');
						_this.msaList($.proxy(function(data){
							this.renderMassagers(data, vm.curMassager);
						}, _this));
						break;
				}
			});
			this.renderTime($('#beginTime'), new Date(o.start_time).Format('hh:mm'));
			this.renderTime($('#endTime'), new Date(o.end_time).Format('hh:mm'));
			if (o.servs){//已选中的服务
				this.getServList($.proxy(function(data){
					this.renderServList(data, $.map(o.servs, function(v){
						return v.id;
					}).join(','));
				},this));
			}
		},
		//生成调理时间列表
		renderTime: function($elem, selected){
			var _this = this;
			var h = '<option value="">请选择上钟时间</option>';
			if (/endTime/.test($elem.selector))
				h = '<option value="">请选择下钟时间</option>';
			var dt = new Date();
			dt.setHours(9);
			dt.setMinutes(0);
			dt.setSeconds(0);
			for (var i = 0; i <= 26; i++){
				if (dt.Format('hh:mm') == selected){
					h += '<option value="'+dt.Format('hh:mm')+'" selected="selected">'+dt.Format('hh:mm')+'</option>';
				} else {
					h += '<option value="'+dt.Format('hh:mm')+'">'+dt.Format('hh:mm')+'</option>';
				}
				dt.setMinutes(dt.getMinutes()+30);
			}
			$elem.html(h);
			Reg.renderForm('select');
			//登记时的上下钟时间选择
			layui.form().on('select(startTime)', function(data){
				  startTime = data.value;
				  endTime && _this.msaList($.proxy(function(data){
						this.renderMassagers(data, vm.curMassager);
					}, _this));
			  });
			layui.form().on('select(endTime)', function(data){
				  endTime = data.value;
				  startTime && _this.msaList($.proxy(function(data){
						this.renderMassagers(data, vm.curMassager);
					}, _this));
			  });
		},
		renderMassagers: function(data, selected){
			if (data.content.length > 0){
				MASSAGERS = {};
				var h = '<option value="">请选择调理师</option>';
				$.each(data.content, function(){
					MASSAGERS[this.id] = this;
					if (this.id == selected){
						h += '<option value="'+this.id+'" selected>'+this.nickname+'</option>';
					} else h += '<option value="'+this.id+'">'+this.nickname+'</option>';
				});
				$('#massagers, #massagers2').html(h);
			}
			Reg.renderForm('select');
		},
		renderServList: function(data, checked){
			if (data.content.length > 0){
				var h = '';
				SERV_LIST = {};
				$.each(data.content, function(){
					SERV_LIST[this.id] = this;
					if (checked && checked.indexOf(this.id)>=0){
						h += '<input type="checkbox" lay-filter="servList" value="'+this.id+'" v="'+this.id+'" title="'+this.serv_name+'" checked="checked">';
					} else {
						h += '<input type="checkbox" lay-filter="servList" value="'+this.id+'" v="'+this.id+'" title="'+this.serv_name+'">';
					}
				});
				$('#servList').html(h);
			}
			Reg.renderForm('checkbox');
		},
		renderRoomsSelect: function(data, selected){
			if (data.content.length > 0){
				var h = '<option value="">请选择房间</option>';
				$.each(data.content, function(){
					if (this.id == selected){
						h += '<option value="'+this.id+'" selected>'+this.room_name+'</option>';
					} else {
						h += '<option value="'+this.id+'">'+this.room_name+'</option>';
					}
				});
				$('#rooms, #rooms2').html(h);
			}
			Reg.renderForm('select');
		},
		renderForm: function(type){
			Common.getLayForm(function(f){
				f.render(type);
			});
		},
		getServsId: function(){
			var re = '';
			$('#servList>div.layui-form-checked').each(function(){
				re += $(this).prev('input').attr('v') + ',';
			});
			return re.replace(/,$/g, '');
		},
		addRegInfo: function(data, callback){
			data.id = null;
			Common.request({
				url: 'reg/add',
				data: {jsonStr: JSON.stringify(data)},
				success: callback
			});
		},
		//添加预约信息，封装数据并发起请求
		addRegHandler: function(data, callback){
			if (!data.field.regDate){
				  Common.alert('请选择调理日期');
				  return false;
			  }
			if (!data.field.beginTime){
				Common.alert('请选择上钟时间');
				return false;
			}
			if (!data.field.endTime){
				Common.alert('请选择下钟时间');
				return false;
			}
			var param = {
				regDate: data.field.regDate,
				roomId: data.field.room,
				customers: [{
					mark_l: data.field.mark,
					massager: {id: data.field.massager},
					servs: $.map(Reg.getServsId().split(','), function(vv){
						return {id: vv}; 
					}),
					room: {id: data.field.room},
					ver_code: data.field.ver_code,
					reg_status: 0,//已预约
					customer: {
						cust_name: data.field.username,
						phone: data.field.phone
					}
				 }]
			  };
			  if (data.field.beginTime)
				  param.startTime = data.field.regDate+' '+data.field.beginTime+':00';
			  if (data.field.endTime)
				  param.endTime = data.field.regDate+' '+data.field.endTime+':00';
			  Reg.addRegInfo(param, callback);
		},
		//更新预约信息，封装数据并发起请求
		updateHandler: function(data, callback){
			data.field.servId = Reg.getServsId();
	    	CurrentReg = CurrentReg || {customer:{}};
			CurrentReg.massager = {
				id: data.field.massager
			};
			if (!CurrentReg.customer)
				CurrentReg.customer = {};
			CurrentReg.customer.cust_name = data.field.username;
			CurrentReg.customer.phone = data.field.phone;
			CurrentReg.servs = $.map(data.field.servId.split(','), function(v){
				return {id:v};
			});
			CurrentReg.room = {id: data.field.room};
			CurrentReg.reg_date = data.field.regDate;
			CurrentReg.mark_l = data.field.mark;
			CurrentReg.ver_code = data.field.ver_code;
			if (data.field.beginTime)
				CurrentReg.start_time = data.field.regDate + ' ' + data.field.beginTime+':00';
			if (data.field.endTime)
				CurrentReg.end_time = data.field.regDate + ' ' + data.field.endTime+':00';
			Reg.update(CurrentReg, callback);
		}
	};
	var vm = new Vue({
  	  el: 'body',
  	  data: {
  		  curMassager: '',
  		  regList: []
  	  },
  	  created: function(){
  		  this.getRegList();
  		  //取消预约
  		  $('#cancelReg').click(function(){
  			  if (!CurrentReg.id){
  				  Common.getLayer(function(layer){
  					  layer.close(modifyPop);
  				  });
  				  return false;
  			  }
  			  if (parseInt(CurrentReg.reg_status) != 0){
  				  Common.alert('该客户已在调理中，无法取消');
  				  return false;
  			  }
  			  vm.cancelReg(CurrentReg.id);
  			  return false;
  		  });
  	  },
  	  methods: {
  		  getRegList: function(){
  			  var sel=document.getElementsByName("massagerSelect")[0];
    	      var value= sel.options[sel.options.selectedIndex].value;
    	      this.curMassager = value;
    		  Reg.getListByMassager(value, function(data){
    			  vm.regList = data.content;
    		  });
  		  },
  		  cancelReg: function(id){
  			Common.request({
				url: 'reg/update_status',
				data: {id: id, reg_status: 5},
				success: function(data){
					Common.alert(data.msg);
					if (data.code == 0){
						vm.getRegList();
						Common.getLayer(function(layer){
							layer.close(modifyPop);
						});
					}
				}
			});
  		  }
  	  }
	});
    vm.$watch('curMassager', function (newValue, oldValue) {
  	  Reg.getListByMassager(newValue, function(result){
  		  vm.regList = result.content;
  	  });
    });
    vm.$watch('regList', function (newValue, oldValue) {
  	  Reg.renderCalendar(newValue);
	});
	layui.use(['layer', 'form','element','laydate'], function(){
	  var layer = layui.layer, form = layui.form();
	  $("#addReg").click(function(){
		  $('#startTimePop').val('');
		  CurrentReg = {};
		  Reg.renderCustomerForm({});
		  modifyPop = layer.open({
			    type: 1,
			    title: '添加预约',
			    area: ['900px', '550px'],
			    content: $('#win-content')
		  });
		  $('#addCustomerForm button.layui-btn[lay-filter=addCustomer]').attr('method', 'addRegHandler');
		  Reg.getServList(Reg.renderServList);
		  $('#cancelReg').show();
	  });
      //init 监听事件
      form.on('select(massagerSelect)', function(data){
    	  vm.curMassager = data.value;
      });
      form.on('submit(addCustomer)', function(data){
    	  Reg[this.getAttribute('method')](data, function(data){
				Common.alert(data.msg);
				if (data.code == 0){
					layer.close(modifyPop);
					Reg.getListByMassager(vm.curMassager, function(data){
		    			vm.regList = data.content;
		    		});
				}
		  });
		  return false;
	  });
  });
window['Reg'] = Reg;
});
