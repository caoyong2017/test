(function(doc, win) {
	var ROOM_TYPES = null;
	var ROOM_LIST = null;
	function Shop() {
		var _this = this;
		this.init = function() {
			this.initWeb();
			this.getRoomList();
		};
		this.getRoomList = function(){
			Common.request({
				url: 'room/list',
				success: _this.renderRomms
			});
		};
		this.getRoomTypes = function(callback){
			Common.request({
				url: 'cons/roomTypes',
				success: callback || _this.renderRoomTypes
			});
		};
		this.addRoom = function(data, callback){
			Common.request({
				url: 'room/add',
				data: {roomJson: JSON.stringify(data)},
				success: callback
			});
		};
		this.updateRoom = function(data, callback){
			Common.request({
				url: 'room/update',
				data: {roomJson: JSON.stringify(data)},
				success: callback
			});
		};
		this.delRoom = function(roomId, callback){
			Common.request({
				url: 'room/del',
				data: {roomId: roomId},
				success: callback
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
					$('#roomId').val('');
					popWin = layer.open({
						type : 1,
						title : '新增房间',
						area : [ '450px', '400px' ],
						content : $('#win-content')
					});
					if (!ROOM_TYPES)
						_this.getRoomTypes(function(data){
							ROOM_TYPES = data.content;
							_this.renderRoomTypes(data);
						});
				});
				form.on('submit(addRoom)', function(data){
					function successCall(data){
						Common.alert(data.msg);
						if (data.code == 0){
							_this.getRoomList();
							_this.clearForm();
							layer.close(popWin);
						}
					}
					if (!data.field.roomType){
						Common.alert('请选择房间类型');
						return false;
					}
					var roomId = $('#roomId').val();
					var param = {
						room_name: data.field.roomNo,
						floor_no: data.field.floor,
						room_desc: data.field.mark,
						roomType: {id: data.field.roomType}
					};
					if (!roomId){
						_this.addRoom(param, successCall);
					} else {
						param.id = roomId;
						_this.updateRoom(param, function(data){
							successCall(data);
							if (data.code == 0)
								$('#roomId').val('');
						});
					}
					return false;
				});
			});

			$('#room-list').delegate('.mod', 'click', function() {
				popWin = layer.open({
					type : 1,
					title : '编辑客房',
					area : [ '450px', '400px' ],
					content : $('#win-content')
				});
				var rm = ROOM_LIST[this.getAttribute('rid')];
				if (rm) {
					$('#roomId').val(rm.id);
					if (!ROOM_TYPES){
						_this.getRoomTypes(function(data){
							ROOM_TYPES = data.content;
							_this.renderRoomTypes(data, rm.roomType?rm.roomType.id:null);
						});
					} else {
						_this.renderRoomTypes({content: ROOM_TYPES}, rm.roomType.id);
					}
					$('#floorField').val(rm.floor_no);
					$('#roomNoField').val(rm.room_name);
					$('#markField').val(rm.room_desc);
				}
			});
			$('#room-list').delegate('.del', 'click', function() {
				var rid = this.getAttribute('rid');
				var $col = $(this).parent().parent();
				Common.confirm('确定要删除吗？', function() {
					_this.delRoom(rid, function(data) {
						Common.alert(data.msg);
						if (data.code == 0)
							$col.remove();
					});
				});
			});
		},
		clearForm: function(){
			$('#addRoomForm input').each(function(){
				this.value = '';
			});
		},
		renderRomms: function(data){
			ROOM_LIST = {};
			var h = '';
			if (data.content){
				$.each(data.content, function(){
					ROOM_LIST[this.id] = this;
					h += '<tr>'+
	                        '<td>'+this.room_name+'</td>'+
	                        '<td>'+(this.roomType?this.roomType.constant_value:'')+'</td>'+
	                        '<td>'+this.room_desc+'</td>'+
	                        '<td>'+
	                        	'<button type="button" class="btn btn-sm btn-dark mod" rid="'+this.id+'">编辑</button>&nbsp;&nbsp;'+
	                        	'<button type="button" class="btn btn-sm btn-danger del" rid="'+this.id+'">删除</button>'+
	                        '</td>'+
	                    '</tr>';
				});
			}
			$('#room-list').html(h);
		},
		renderRoomTypes: function(data, selected){
			var h = '<option value="">选择房间类型</option>';
			if (data.content && data.content.length > 0){
				$.each(data.content, function(){
					h += '<option value="'+this.id+'" ';
					if (this.id == selected)
						h += 'selected="selected"';
					h += '>'+this.constant_value+'</option>';
				});
			}
			$('#roomTypes').html(h);
			Common.getLayForm(function(form){
				form.render('select');
			});
		}
	};
	win.Shop = Shop;
})(document, window);
$(document.body).ready(function() {
	new Shop().init();
});