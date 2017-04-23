(function(doc, win){
	var REG_LIST = null;
	var Customers = [];
	var SERV_LIST = null;
	var MASSAGERS = null;
	var Now = new Date();
	var CurrentReg = null;
	var CurrentRegStatus = 0;
	var vm = null;
	var downClockWin = null;
	var startTime1 = null;
	var endTime1 = null;
	function Page(){
		this.init = function(){
			this.initWeb();
//			this.msaList();
			this.getRoomList();
			this.getList();
			this.getServList();
			this.downClockHandler();
		};
		
		this.downClockHandler = function(){
			var _this = this;
			vm = new Vue({
			    el: '#downClockWin',
			    data: {reg: {},totalFee: 0},
			    created:function() {
			        //
			    },
			    methods: {
			    	endMassage: function(regId, event){
			    		Common.confirm('确定要下钟吗？', $.proxy(function(){
			    			_this.update({id:regId, reg_status:2}, function(data){
			    				Common.alert(data.msg);
			    				if (data.code == 0){
			    					_this.getList(1, Now);
			    					layer.close(downClockWin);
			    				}
			    			});
			    		},this));
			    	}
			    }
			});
		};
		this.update = function(param, callback){
			Common.request({
				url: 'reg/update_status',
				data: param,
				success: callback
			});
		};
		this.getList = function(pageNo, date){
			Common.request({
				url : 'reg/list',
				data: {pageNo: pageNo||1, date: date},
				success : $.proxy(this, 'renderRegList')
			});
		};
		this.msaList = function(callback, regId){
			var date = $('#startTimePop').val().replace(/-/g,'/');
			if (/NaN/gi.test(date))
				date = $('#startTime').val().replace(/-/g,'/');
			if (!date || !startTime1 || !endTime1)
				return false;
			var param = {
				start_time: date+' '+startTime1+':00', end_time: date+' '+endTime1+':00',reg_date: date
			};
			if (regId)
				param.id = regId;
			Common.request({
				url : 'massager/free_list',
				data: param,
				success : $.isFunction(callback)?callback:$.proxy(Page.prototype, 'renderMassagers')
			});
		};
		this.getRoomList = function(callback){
			Common.request({
				url: 'room/list',
				success: callback || $.proxy(this, 'renderRoomsSelect')
			});
		};
		this.getServList = function(callback){
			Common.request({
				url: 'ser/list',
				success: callback||$.proxy(this, 'renderServList')
			});
		};
		this.addRegInfo = function(data, callback){
			Common.request({
				url: 'reg/add',
				data: {jsonStr: JSON.stringify(data)},
				success: callback
			});
		};
		this.cancelReg = function(id, callback){
			Common.request({
				url: 'reg/update_status',
				data: {id: id, reg_status: 5},
				success: callback
			});
		};
		this.startMassage = function(data, callback){
			Common.request({
				url: 'reg/update',
				data: {jsonStr: JSON.stringify(data)},
				success: callback
			});
		};
	}
	Page.prototype.initWeb = function(){
		var upDengjiWin = null;
		var upClockWin = null;
		var upyuyue = null;
		var _this = this;
		layui.use(['layer', 'form','element','laydate'], function(){
			  var layer = layui.layer, form = layui.form();
			//登记时的上下钟时间选择
			  form.on('select(startTime)', function(data){
				  startTime1 = data.value;
				  endTime1 && _this.msaList($.proxy(function(data){
						this.renderMassagers(data, vm.curMassager);
					}, _this));
			  });
			  form.on('select(endTime)', function(data){
				  endTime1 = data.value;
				  startTime1 && _this.msaList($.proxy(function(data){
						this.renderMassagers(data, vm.curMassager);
					}, _this));
			  });
			  $('#addReg').click(function(){
				  _this.renderTime($('#startTime1'));
				  _this.renderTime($('#endTime1'));
				  _this.renderCustomers();
				  _this.renderCustomerForm({customer:{}});
				  CurrentReg = null;
				  startTime1 = null;
				  endTime1 = null;
				  upDengjiWin = layer.open({
					    type: 1,
					    title: '新增登记',
					    area: ['850px', '600px'],
					    content: $('#win-content2')
				  });
			  });
			  //上钟
			  $('#mas-list').delegate('.up', 'click', function(){
				  CurrentReg = REG_LIST[this.getAttribute('rid')];
				  $('#startTime').val(Now.Format('yyyy-MM-dd'));
				  startTime1 = new Date(CurrentReg.start_time).Format('hh:mm');
				  endTime1 = new Date(CurrentReg.end_time).Format('hh:mm');
				  $('#rooms2').parent().prev('label').show();
				  $('#rooms2').parent().show();
				  $('#startTimePop').parent().parent().hide();
				  _this.renderCustomerForm(CurrentReg);
				  upClockWin = layer.open({
					    type: 1,
					    title: '上钟',
					    area: ['900px', '550px'],
					    content: $('#win-content')
				  });
				  CurrentRegStatus = 1;
			  });
			  $('#mas-list').delegate('.down, .check', 'click', function(){
				  	//计算消费总额
					vm.reg = REG_LIST[this.getAttribute('rid')];
				  	vm.totalFee = 0;
		    		if (vm.reg.servs && vm.reg.servs.length > 0){
		    			$.each(vm.reg.servs, function(){
		    				vm.totalFee += this.serv_price;
		    			});
		    		}
				  downClockWin = layer.open({
					    type: 1,
					    title: '客户信息',
					    area: '400px',
					    content: $('#downClockWin')
				  });
				  CurrentRegStatus = 2;
			  });
			  $('#addCustom').click(function(){
				  //必须要先选择日期和调理时间，不然没有调理师列表
				  var date = $('#startTime').val().replace(/-/g,'/');
				  if (!date || !startTime1 || !endTime1){
					  Common.alert('请先选择日期和调理时间');
					  return false;
				  }
				  $('#rooms2').parent().prev('label').hide();
				  $('#rooms2').parent().hide();
				  $('#startTimePop').parent().parent().hide();
				  _this.renderTime($('#beginTime'));
				  _this.renderTime($('#endTime'));
				  _this.clearCustomerForm();
				  //登记状态改成预约
				  CurrentRegStatus = 0;
				  upClockWin = layer.open({
					    type: 1,
					    title: '新增顾客',
					    area: ['900px', '550px'],
					    content: $('#win-content')
				  });
			  });
			  form.on('submit(addCustomer)', function(data){
				  data.field.servId = _this.getServsId();
				  //上钟或修改
				  if (CurrentReg){
					  _this.startMassageServ(data, function(){
						  layer.close(upClockWin);
						  CurrentReg = null;
						  CurrentRegStatus= 0;
					  });
					  return false;
				  }
				  var custName = $('#customerName').val();
				  //修改本地数据	
				  if (custName){
					  _this.updateCustomer(data, custName);
				  } else {//添加
					  var c = false;
					  data.field.roomId = $('#rooms').next('div.layui-form-select').find('dl dd.layui-this').attr('lay-value');
					  //检查有没有重复的
					  $.each(Customers, function(){
						 if (this.customer.cust_name == data.field.username && !$.trim(this.customer.phone) && this.customer.phone == data.field.phone){
							 c = true;
							 return false;
						 }
					  });
					  if (c){
						  Common.alert('已有相同名字或相同手机号的顾客存在');
						  return false;
					  }
					  _this.addCustomer(data);
				  }
				  _this.renderCustomers();
				  layer.close(upClockWin);
				  _this.clearCustomerForm();
				  return false;
			  });
			  //登记时直接上钟
			  form.on('submit(startMassage)', function(data){
				  //这个是直接上钟
				  $.each(Customers, function(){
					 this.reg_status = 1; 
				  });
				  _this.regOrStart(data, function(){
					  layer.close(upDengjiWin);
				  });
				  return false;
			  });
			  //提交登记
			  form.on('submit(addRegInfo)', function(data){
				  $.each(Customers, function(){
					  this.reg_status = 0;
				  });
				  _this.regOrStart(data, function(){
					  layer.close(upDengjiWin);
				  });
				  return false;
			  });
			  //计算调理时长
			  form.on('select(startTime1)', function(data){
				  $('#massagerId').val(data.value);
				  return false;
			  });
			  form.on('select(endTime1)', function(data){
				  $('#massagerId').val(data.value);
				  return false;
			  });
			  form.on('select(massager)', function(data){
				  $('#massagerId').val(data.value);
				  return false;
			  });
			  form.on('checkbox(servList)', function(data){
				  var v = $('#servId').val();
				  if (data.elem.checked){
					  v += '-' + data.value + '-';
					  $('#servId').val(v);
				  } else {
					  var reg = new RegExp('-' + data.value + '-', 'g');
					  $('#servId').val(v.replace(reg, ''));
				  }
				  return false;
			  });
			//修改登记信息
			$('#mas-list').delegate('.mod', 'click', function(){
				var status = parseInt(this.getAttribute('status'));
				//如果正在调理中或者已下钟，就隐藏时间选择框
				if (status == 1 || status == 2 || status == 3){
					$('#startTimePop').parent().parent().hide();
				} else {
					$('#rooms2').parent().prev('label').show();
					$('#rooms2').parent().show();
					$('#startTimePop').parent().parent().show();
				}
				//调理中允许修改房间
				if (status == 1){
					$('#rooms2').parent().prev('label').show();
					$('#rooms2').parent().show();
				}
				upClockWin = layer.open({
				    type: 1,
				    title: '修改',
				    area: ['900px', '550px'],
				    content: $('#win-content')
				});
				CurrentReg = REG_LIST[this.getAttribute('rid')];
				CurrentRegStatus = REG_LIST[this.getAttribute('rid')].reg_status;
				_this.renderCustomerForm(CurrentReg);
			});
		});
		//从客户列表中移除客户
		$('#customers-list').delegate('.delCus', 'click', function(){
			$(this).parent().parent().remove();
			Customers = $.map(Customers, $.proxy(function(v){
				return v.customer.cust_name == this.getAttribute('cn') ? null : v;
			}, this));
		});
		//修改客户信息
		$('#customers-list').delegate('.mod', 'click', function(){
			var un = this.getAttribute('cn');
			$.each(Customers, function(){
				if (this.customer.cust_name == un){
					$('#customerName').val(this.customer.cust_name);
					if (this.serv){
						this.servs = $.map(this.serv.split(','), function(v){
							return {id: v};
						});
					}
					_this.renderCustomerForm(this);
					return false;
				}
			});
			upClockWin = layer.open({
			    type: 1,
			    title: '修改',
			    area: ['900px', '550px'],
			    content: $('#win-content')
			});
		});
		$('#bday').click(function(){
			Now.setDate(Now.getDate()-1);
			$("#todayText").text(Common.getDayText(Now));
			_this.getList(1, Now);
		});
		$('#aday').click(function(){
			Now.setDate(Now.getDate()+1);
			$("#todayText").text(Common.getDayText(Now));
			_this.getList(1, Now);
		});
		$('#today').click(function(){
			Now = new Date();
			$("#todayText").text(Common.getDayText(Now));
			_this.getList(1, Now);
		});
		$('#mas-list').delegate('.can', 'click', function(){
			Common.confirm('确定要取消吗？', $.proxy(function(){
				_this.cancelReg(this.getAttribute('rid'), function(data){
					Common.alert(data.msg);
					data.code == 0 && _this.getList(1, Now);
				});
			},this));
		});
		//搜索顾客，根据名字或手机号
		function search(){
			var v = $.trim($('#keywords').val());
			var reg = new RegExp(v, 'gi');
			var tempList = [];
			$.each(REG_LIST, function(){
				if (reg.test(this.customer.cust_name) || reg.test(this.customer.phone) || (this.massager && reg.test(this.massager.nickname)))
					tempList.push(this);
			});
			_this.renderRegList({content: tempList}, true);
		}
		$('#keywords').keyup(function(e){
			search(e);
		});
		$('#search').click(function(e){
			search(e);
		});
	};
	/**登记或直接上钟，封装数据及发起请求*/
	Page.prototype.regOrStart = function(data, callback){
		if (!data.field.regDate){
			  Common.alert('请选择调理日期');
			  return false;
		  }
		  if (Customers.length == 0){
			  Common.alert('请添加顾客');
			  return false;
		  }
		  var param = {
			  regDate: data.field.regDate,
			  roomId: data.field.rooms,
			  customers: $.map(Customers, function(v){
				  if (v.serv){
					  v.servs = $.map(v.serv.split(','), function(vv){
						  return {id: vv};
					  });
				  }
				  return v;
			  })
		  };
		  //登记时如果是直接上钟的话就检查是否选择了项目，没有选择项目就不允许上钟
		  for (var i = 0; i < param.customers.length; i++){
			  if (!param.customers[i].servs && param.customers[i].reg_status==1){
				  Common.alert('顾客：' + param.customers[i].customer.cust_name + ' 未选择服务项目');
				  return false;
			  }
		  }
		  if (data.field.startTime1)
			  param.startTime = data.field.regDate+' '+data.field.startTime1+':00';
		  if (data.field.endTime1)
			  param.endTime = data.field.regDate+' '+data.field.endTime1+':00';
		  this.addRegInfo(param, $.proxy(function(data){
			  Common.alert(data.msg);
			  if (data.code == 0){
				  Customers = [];
				  this.getList();
				  callback&&callback();
			  }
		  }, this));
	};
	/**获取选中的服务的id，以逗号分隔的字符串*/
	Page.prototype.getServsId = function(){
		var re = '';
		$('#servList>div.layui-form-checked').each(function(){
			re += $(this).prev('input').attr('v') + ',';
		});
		return re.replace(/,$/g, '');
	};
	/**添加一个顾客*/
	Page.prototype.addCustomer = function(data){
		Customers.push({
			  mark_l: data.field.mark,
			  massager: {id: data.field.massagerId},
			  serv: this.getServsId(),
			  room: {id: data.field.roomId},
			  ver_code: data.field.ver_code,
			  reg_status: 0,//已预约
			  customer: {
				  cust_name: data.field.username,
				  phone: data.field.phone
			  }
		});
	};
	/**修改顾客信息*/
	Page.prototype.updateCustomer = function(data, name){
		$.each(Customers, function(){
			if (this.customer.cust_name == name){
				this.mark_l = data.field.mark,
				this.massager = {id: data.field.massagerId},
				this.serv = data.field.servId,
				this.ver_code = data.field.ver_code,
				this.customer = {
					cust_name: data.field.username,
					phone: data.field.phone
				};
			}
		});
	};
	//上钟，封装数据并发送请求
	Page.prototype.startMassageServ = function(formData, callback){
		formData.field.servId = this.getServsId();
		//调理中的必须要选服务项目
		if (CurrentRegStatus == 1){
			//如果有没有选择服务项目就禁止提交
			if (!formData.field.servId){
				Common.alert('未选择服务项目');
				return false;
			}
		}
		CurrentReg.massager = {
			id: formData.field.massager
		};
		CurrentReg.customer = {
			cust_name: formData.field.username,
			phone: formData.field.phone
		};
		if (formData.field.servId){
			CurrentReg.servs = $.map(formData.field.servId.split(','), function(v){
				return {id:v};
			});
		}
		//如果是调理中的就必须要选择房间
		if (!formData.field.room && CurrentReg.reg_status!=0){
			Common.alert('请选择房间');
			return false;
		}
		CurrentReg.room = {id: formData.field.room};
		CurrentReg.reg_date = formData.field.regDate;
		CurrentReg.mark_l = formData.field.mark;
		CurrentReg.ver_code = formData.field.ver_code;
		CurrentReg.reg_status = CurrentRegStatus;
		if (formData.field.beginTime)
			CurrentReg.start_time = formData.field.regDate + ' ' + formData.field.beginTime+':00';
		if (formData.field.endTime)
			CurrentReg.end_time = formData.field.regDate + ' ' + formData.field.endTime+':00';
		this.startMassage(CurrentReg, $.proxy(function(data){
			if (data.code == 5001){
				Common.confirm('房间已被占用，是否要继续安排客人？', $.proxy(function(){
					CurrentReg.room.stat = 222;
					this.startMassage(CurrentReg, $.proxy(function(data){
						Common.alert(data.msg);
						if (data.code == 0){
							this.getList(1, Now);
							CurrentReg = null;
							callback&&callback(data);
						}
					},this));
				},this));
			} else {
				Common.alert(data.msg);
				if (data.code == 0){
					this.getList(1, Now);
					CurrentReg = null;
					callback&&callback(data);
				}
			}
		},this));
	};
	//计算调理时长
	Page.prototype.calcTotalTime = function(){
		
	};
	//初始化添加客户信息的form
	Page.prototype.clearCustomerForm = function(){
		$('#addCustomerForm input, #addCustomerForm textarea').each(function(){
			switch (this.name){
				case 'username': this.value = '新顾客'; break;
				default: this.value = '';
					break;
			}
		});
	};
	/**填充添加客户信息表单数据*/
	Page.prototype.renderCustomerForm = function(o){
		var _this = this;
		$('#addCustomerForm input, #addCustomerForm textarea, #addCustomerForm select').each(function(){
			switch (this.name){
				case 'username': this.value = o.customer.cust_name; break;
				case 'phone': this.value = o.customer.phone; break;
				case 'ver_code': this.value = o.ver_code; break;
				case 'mark': this.value = o.mark_l||''; break;
				case 'regDate': this.value = new Date(o.reg_date).Format('yyyy-MM-dd'); break;
				case 'room':
					_this.getRoomList($.proxy(function(data){
						this.renderRoomsSelect(data, o.room?o.room.id:'');
					}, _this));
					break;
				case 'massager':
					if (!o.reg_date || !o.start_time || !o.end_time)
						break;
					$('#startTime').val(new Date(o.reg_date).Format('yyyy-MM-dd'));
					startTime1 = new Date(o.start_time).Format('hh:mm');
					endTime1 = new Date(o.end_time).Format('hh:mm');
					_this.msaList($.proxy(function(data){
						this.renderMassagers(data, o.massager?o.massager.id:'');
					}, _this), o.id);
					break;
			}
		});
		this.renderTime($('#beginTime'), new Date(o.start_time).Format('hh:mm'));
		this.renderTime($('#endTime'), new Date(o.end_time).Format('hh:mm'));
		//已选中的服务
		this.getServList($.proxy(function(data){
			if (o.servs){
				this.renderServList(data, $.map(o.servs, function(v){
					return v.id;
				}).join(','));
			} else {
				this.renderServList(data);
			}
		},this));
	};
	//生成登记列表
	Page.prototype.renderRegList = function(data, reRender){
		if (data.content && data.content.length > 0){
			var h = '';
			//重新渲染的时候不要覆盖本地缓存数据
			if (!reRender)
				REG_LIST = {};
			$.each(data.content, function(){
				if (!reRender)
					REG_LIST[this.id] = this;
				h += '<tr>'+
	                    '<td>'+(this.customer?this.customer.cust_name:'')+'</td>'+
	                    '<td>'+(this.customer?this.customer.phone:'')+'</td>'+
	                    '<td>'+((this.start_time?new Date(this.start_time).Format('hh:mm')+'-':'')+(this.end_time?new Date(this.end_time).Format('hh:mm'):''))+'</td>'+
	                    '<td>'+(this.massager?this.massager.nickname:'')+'</td>'+
	                    '<td>'+(this.room?this.room.room_name:'')+'</td>'+
	                    '<td>'+this.ver_code+'</td>'+
	                    '<td>'+(this.mark_l?this.mark_l:'')+'</td>'+
	                    '<td>';
				if (this.reg_status == 0){
					h += '<span class="text-info fw700">'+this.reg_status_value+'</span>';
				} else if (this.reg_status == 1){
					h += '<span class="text-info fw700" style="color:#FF5722;">'+this.reg_status_value+'</span>';
				} else if (this.reg_status == 2 || this.reg_status == 3){
					h += '<span class="text-info fw700" style="color:#F7B824;">'+this.reg_status_value+'</span>';
				} else {
					h += '<span class="text-info fw700" style="color:#393D49;">'+this.reg_status_value+'</span>';
				}
	            h +=    '</td>'+
	                    '<td>';
				if (this.reg_status==0){//已预约的情况下可以上钟、修改和取消
					h += 	'<button type="button" class="btn btn-sm btn-primary up" rid="'+this.id+'">上钟</button>&nbsp;'+
							'<button type="button" class="btn btn-sm btn-dark mod" rid="'+this.id+'">修改</button>&nbsp;'+
							'<button type="button" class="btn btn-sm btn-danger can" rid="'+this.id+'">取消</button>';
				} else if (this.reg_status == 4){//已下钟的情况下只能查看
					h += 	'<button type="button" class="btn btn-sm btn-primary check" rid="'+this.id+'">查看</button>&nbsp;';
				} else {//其他阶段可以修改和下钟
					h += 	'<button type="button" class="btn btn-sm btn-warm down" rid="'+this.id+'">下钟</button>&nbsp;'+
							'<button type="button" class="btn btn-sm btn-dark mod" rid="'+this.id+'" status="'+this.reg_status+'">修改</button>&nbsp;';
				}
	                    '</td>'+
	                '</tr>';
			});
			$('#mas-list').html(h);
		} else {
			$('#mas-list').empty();
		}
	};
	//生成客户列表
	Page.prototype.renderCustomers = function(){
		function showServs(servIds){
			if (!servIds)
				return '';
			servIds = servIds.split(',');
			var re = '';
			var len = servIds.length;
			$.each(servIds, function(i){
				re += SERV_LIST[this].serv_name + '、';
			});
			return re.replace(/、$/g, '');
		}
		var h = '';
		$.each(Customers, function(){
			h += '<tr>'+
                    '<td>'+this.customer.cust_name+'</td>'+
                    '<td>'+this.customer.phone+'</td>'+
                    '<td>'+(MASSAGERS[this.massager.id]?MASSAGERS[this.massager.id].nickname:'')+'</td>'+
                    '<td>'+showServs(this.serv)+'</td>'+
                    '<td>'+this.ver_code+'</td>'+
                    '<td>'+this.mark_l+'</td>'+
                    '<td>'+
                    	'<button type="button" class="btn btn-sm btn-dark mod" cn="'+this.customer.cust_name+'">修改</button>&nbsp;'+
                    	'<button type="button" class="btn btn-sm btn-danger delCus" cn="'+this.customer.cust_name+'">移除</button>'+
                    '</td>'+
                '</tr>';
		});
		$('#customers-list').html(h);
	};
	//生成房间列表
	Page.prototype.renderRoomsSelect = function(data, selected){
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
		this.renderForm('select');
	};
	//生成调理师列表
	Page.prototype.renderMassagers = function(data, selected){
		var h = '<option value="">请选择调理师</option>';
		MASSAGERS = {};
		if (data.content.length > 0){
			$.each(data.content, function(){
				MASSAGERS[this.id] = this;
				if (this.id == selected){
					h += '<option value="'+this.id+'" selected>'+this.nickname+'</option>';
				} else h += '<option value="'+this.id+'">'+this.nickname+'</option>';
			});
		}
		$('#massagers, #massagers2').html(h);
		this.renderForm('select');
	};
	//生成服务列表
	Page.prototype.renderServList = function(data, checked){
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
		this.renderForm('checkbox');
	};
	//layui渲染表单
	Page.prototype.renderForm = function(type){
		Common.getLayForm(function(f){
			f.render(type);
		});
	};
	//生成调理时间列表
	Page.prototype.renderTime = function($elem, selected){
		var _this = this;
		var st = true;
		if (/endTime/.test($elem.selector))
			st = false;
		var h = '<option value="">请选择下钟时间</option>';
		if (st)
			h = '<option value="">请选择上钟时间</option>';
		var dt = new Date();
		dt.setHours(9);
		dt.setMinutes(0);
		dt.setSeconds(0);
		for (var i = 0; i <= 26; i++){
			if (dt.Format('hh:mm') == selected){
				h += '<option value="'+dt.Format('hh:mm')+'" selected="selected">'+dt.Format('hh:mm')+'</option>';
				st ? startTime1 = dt.Format('hh:mm') : endTime1 = dt.Format('hh:mm');
			} else {
				h += '<option value="'+dt.Format('hh:mm')+'">'+dt.Format('hh:mm')+'</option>';
			}
			dt.setMinutes(dt.getMinutes()+30);
		}
		$elem.html(h);
		this.renderForm('select');
		//登记时的上下钟时间选择
		layui.form().on('select(startTime1)', function(data){
			  startTime1 = data.value;
			  endTime1 && _this.msaList();
		  });
		layui.form().on('select(endTime1)', function(data){
			  endTime1 = data.value;
			  startTime1 && _this.msaList();
		  });
	};
	win.Page = Page;
})(document, window);
var pg = null;
var Reg = null;
$(document).ready(function(){
	pg = new Page();
	pg.init();
	Reg = pg;
});
