(function(doc, win) {
	var ROOM_TYPES = null;
	var ROOM_LIST = null;
	function Shop() {
		this.init = function() {
			this.initWeb();
			this.getRoomList();
		};
		this.getRoomList = function(){
			Common.request({
				url: 'room/listAllCurrentMsg',
				success: $.proxy(this, 'renderRomms')
			});
		};
		this.updateStat = function(data, callback){
			Common.request({
				url: 'room/update',
				data: {roomJson: JSON.stringify(data)},
				success: callback
			});
		};
	}
	Shop.prototype = {
		initWeb : function() {
			jQuery(document).ready(function() {

	            "use strict";

	            // Init Theme Core    
	            Core.init();
	            
	        });
		},
		
		//生成登记列表
		renderRegList : function(data){
			console.log(data);
			if (data.content && data.content.length > 0){
				var h = '';
				REG_LIST = {};
				$.each(data.content, function(){
					REG_LIST[this.id] = this;
					
				});
				
			} 
		},
		renderRomms: function(data){
			ROOM_LIST = {};
			var h = '';
			var demo5Rows = {
	         		 
	         		};
            var menu1 = new BootstrapMenu('#room_container .tm-tag-info', {
            	fetchElementData: function($rowElem) {
            	    var rowId = $rowElem.data('rowId');
            	    return demo5Rows[rowId];
            	  },
            	  actions: [{
            	      name: '置为维修房',
            	      onClick: function(row) {
            	        // run when the action is clicked
            	    	  var param = {
          						room_name: row.room_name,
          						id: row.id,
          						stat: 23
          					};
            	    	  $.post("room/update", {roomJson: JSON.stringify(param)}, 
            	      		    function (data) {
            	    		  new Shop().init();
            	    	  });
          	    	    
            	      }
            	  }]
            	});
            var menu2 = new BootstrapMenu('#room_container .tm-tag-inverse', {
            	fetchElementData: function($rowElem) {
            	    var rowId = $rowElem.data('rowId');
            	    return demo5Rows[rowId];
            	  },
            	  actions: [{
            	      name: '置为空房',
            	      onClick: function(row) {
            	        // run when the action is clicked
            	    	  var param = {
            						room_name: row.room_name,
            						id: row.id,
            						stat: 21
            					};
              	    	  $.post("room/update", {roomJson: JSON.stringify(param)}, 
              	      		    function (data) {
              	    		 new Shop().init();
              	    	  });
            	      }
            	  },{
            	      name: '置为维修房',
            	      onClick: function(row) {
            	        // run when the action is clicked
            	    	  var param = {
            						room_name: row.room_name,
            						id: row.id,
            						stat: 23
            					};
              	    	  $.post("room/update", {roomJson: JSON.stringify(param)}, 
              	      		    function (data) {
              	    		 new Shop().init();
              	    	  });
            	      }
            	  }]
            	});
            var menu3 = new BootstrapMenu('#room_container .tm-tag-alert', {
            	fetchElementData: function($rowElem) {
            	    var rowId = $rowElem.data('rowId');
            	    return demo5Rows[rowId];
            	  },
            	  actions: [{
            	      name: '置为空房',
            	      onClick: function(row) {
            	        // run when the action is clicked
            	    	  var param = {
            						room_name: row.room_name,
            						id: row.id,
            						stat: 21
            					};
              	    	  $.post("room/update", {roomJson: JSON.stringify(param)}, 
              	      		    function (data) {
              	    		 new Shop().init();
              	    	  });
            	      }
            	  }]
            	});
            
            var menu4 = new BootstrapMenu('#room_container .tm-tag-danger-null', {
            	fetchElementData: function($rowElem) {
            	    var rowId = $rowElem.data('rowId');
            	    return demo5Rows[rowId];
            	  },
            	 
            	  actions: [{
            	      name: '置为空房',
            	      onClick: function(row) {
            	        // run when the action is clicked
            	    	  var param = {
            						room_name: row.room_name,
            						id: row.id,
            						stat: 21
            					};
              	    	  $.post("room/update", {roomJson: JSON.stringify(param)}, 
              	      		    function (data) {
              	    		 new Shop().init();
              	    	  });
            	      }
            	  }]
            	});
			if (data.content){
				//demo5Rows= data.content;
				$.each(data.content, function(index){
					demo5Rows[index+1] = this;
					ROOM_LIST[this.id] = this;
					h += '<div class="tm-tag room-box';
					if(this.stat == 22){
						//当技师没有下钟，管理员可以置为空房
						if( this.reginfo.customer.cust_name != '' && this.user.nickname != ''){
							h += ' tm-tag-danger';
						}else{
							h += ' tm-tag-danger-null'; 
						}
					}else if(this.stat == 23){
						h += ' tm-tag-alert';
					}else if(this.stat == 24){
						h += ' tm-tag-inverse';
					}else{
						h += ' tm-tag-info';
					}
	                h += '" data-row-id="'+(index+1)+'">' ;
	                	h +='<span class="first-line">'+
		                		this.room_name +
			                	'<span>'+this.roomType.constant_value + '</span>' +
		                	'</span>';
	              
	                //只显示预约已经上钟的信息，暂不显示当天预约的信息--cy-若更改改前台js控制
	                	if( this.user.nickname != ''){
		                	h +=
		                        '<span class="box-line">技师：' + this.user.nickname+' </span>';
		                }
		                if(this.reginfo.customer.cust_name != ''){
		                	h +=
		                        '<span class="box-line">客户：' + this.reginfo.customer.cust_name+' </span>';
		                }
			        h += '</div>';
			        
				});
			}
			$('#room_container').html(h);
			var upDengjiWin = null;
			
			layui.use(['layer', 'form','element','laydate'], function(){
				  var layer = layui.layer, form = layui.form();
				  $('.tm-tag-danger').dblclick(function(){
					  upDengjiWin = layer.open({
						    type: 1,
						    title: '房态详情',
						    area: ['900px', '600px'],
						    content: $('#win-content')
					  });
					  //点击当前房间 取出当前行ID,得到selectclick值
					  var rid = this.dataset.rowId;
					  var selectclick = demo5Rows[rid];
					  //清空头部信息,列表信息,重新赋值
					  var title ='';
				      var htm='';
					  $("#customers-header").html('');
					  $('#customers-list').html('');
					  
					  var time=selectclick.reginfo.start_time_value.split(",")[0].substring(11,16)+'-'+selectclick.reginfo.end_time_value.split(",")[0].substring(11,16);
					  title += '<label class="layui-form-label" style="width: 111px">房间号：' +  selectclick.room_name +'</label>';
					  title +='<label class="layui-form-label" style="width: 180px">调理时间：'+time+'</label>';
					 
					  //该房间下客户多个或一个
					  var cust_name =selectclick.reginfo.customer.cust_name?selectclick.reginfo.customer.cust_name:'';
					  var arrName = cust_name.split(",");
					  if(arrName.length == 1){
						  var len = selectclick.reginfo.servs[0].serv_name.length;
						  htm +='<tr>'
							  +' <td width="10%">'  + selectclick.reginfo.customer.cust_name + '</td>'
							  +' <td width="10%">' +  selectclick.reginfo.customer.phone + '</td>'
	                          +' <td width="9%">'  + selectclick.user.nickname + '</td>'
	                          +' <td width="25%">' + selectclick.reginfo.servs[0].serv_name.substring(1,len-1) + '</td>'
	                          +' <td width="8%">' + selectclick.reginfo.ver_code + '</td>'
	                          +' <td width="38%">' + selectclick.reginfo.mark_l + '</td>'
	                          +'</tr>'; 
						
					  }
					  else if(arrName.length >1){
						  //如果该房间是多个客户 不同时间点
						  var phone = selectclick.reginfo.customer.phone ?selectclick.reginfo.customer.phone:'';
						  var nickname = selectclick.user.nickname ?selectclick.user.nickname:'';
						  var ver_code =selectclick.reginfo.ver_code?selectclick.reginfo.ver_code:'';
						  var mark_l =selectclick.reginfo.mark_l?selectclick.reginfo.mark_l:'';
						  var temp =selectclick.reginfo.servs[0].serv_name;
						  var ser_name =temp?temp.substring(1,temp.length-1):'';
						  //拆分为 array数组,遍历赋值客户信息
						  var arrPhone =phone.split(",");
						  var arrnickname =nickname.split(",");
						  var arrver_code =ver_code.split(",");
						  var arrmark_l =mark_l.split(",");
						  var arrser_name =ser_name.split("\),\(");
						  for(var i=0; i<arrName.length; i ++)
						  {
							  htm +='<tr>'
								  +' <td width="10%">'  + arrName[i] + '</td>'
								  +' <td width="10%">' +  arrPhone[i] + '</td>'
		                          +' <td width="9%">'  + arrnickname[i] + '</td>'
		                          +' <td width="25%">' + arrser_name[i] + '</td>'
		                          +' <td width="8%">' + arrver_code[i] + '</td>'
		                          +' <td width="38%">' + arrmark_l[i] + '</td>'
		                          +'</tr>'; 
						  }
					  }
					  //重新赋值
					  $("#customers-header").html(title);
					  $('#customers-list').html(htm);
				  });
			});
		}
	};
	win.Shop = Shop;
})(document, window);
$(document.body).ready(function() {
	new Shop().init();
});