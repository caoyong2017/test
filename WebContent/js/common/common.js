if (!Array.prototype.filter) {  
    Array.prototype.filter = function(fun){
        var len = this.length;  
        if (typeof fun != "function"){
            throw new TypeError();
        }
        var res = new Array();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++){
            if (i in this){
                var val = this[i];
                if (fun.call(thisp, val, i, this)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}
(function(win, doc){
	var MODEL_BASE_PATH = "js/model/";
	var loading = null;
	var _layer = null;
	var layForm = null;
	var ORG_SERVICE = "OrgService";
	var TEACHER_SERVICE = "TeacherService";
	var defaults = {
		url: null,
		type: "POST",
		dataType: "json",
		data: {},
		beforeSend: function(){},
		success: function(){},
		error: function(){}
	};
	win.Common = {
		LOADING_LOADED : false,
		Tasks: [],
		loadModel: function(model, callback){
			require([MODEL_BASE_PATH+model], function(Service){
				callback(Service);
			});
		},
		toast: function(options){
			if (arguments.length == 1 && Object.prototype.toString.call(options) == '[object String]'){
				options = {message: options, context: $('body')};
			} else if (arguments.length == 2 && Object.prototype.toString.call(arguments[1]) == '[object Number]'){
				options = {message: options, context: $('body'),time: arguments[1]};
			}
			this.loadModel("Toast", function(Service){
				!options.context && (options.context = $('body'));
				if (!options.align)
					options.align = 'bottom';
				switch (options.align){
					case 'top': options.top = '10%';
						break;
					case 'bottom': options.top = '90%';
						break;
				}
				Service.show(options);
			});
		},
		getLayer: function(callback){
			if (_layer){
				callback(_layer);
			} else {
				layui.use('layer', function(){
					_layer = layer;
					callback(_layer);
				});
			}
		},
		alert: function(msg, icon, time){
			if (layui){
				if (_layer){
					_layer.msg(msg, {icon: icon || -1, time: time || 1500});
				} else {
					layui.use('layer', function(){
						_layer = layer;
						_layer.msg(msg, {icon: icon || -1, time: time || 1500});
					});
				}
			} else {
				Common.toast(msg);
			}
		},
		loading: function(type, shade){
			if (typeof shade == 'undefined')
				shade = true;
			if (layui){
				if (_layer){
					shade && (loading = _layer.load(type||3, {shade:[0.4, '#000']}));
					!shade && (loading = _layer.load(type||3));
				} else {
					layui.use('layer', function(){
						_layer = layer;
						shade && (loading = _layer.load(type||3, {shade:[0.4, '#000']}));
						!shade && (loading = _layer.load(type||3));
					});
				}
			}
		},
		closeLoading: function(){
			if (layui){
				if (_layer){
					_layer.close(loading);
				} else {
					layui.use('layer', function(){
						_layer = layer;
						_layer.close(loading);
					});
				}
			}
		},
		confirm: function(msg, callback, title, icon){
			if (layui){
				if (_layer){
					_layer.confirm(msg, {icon: icon||3, title: title||'提示'}, function(index){
						_layer.close(index);
						callback();
					});
				} else {
					layui.use('layer', function(){
						_layer = layer;
						_layer.confirm(msg, {icon: icon||3, title: title||'提示'}, function(index){
							_layer.close(index);
							callback();
						});
					});
				}
			}
		},
		/**
		 * 跳转到指定地址
		 * 
		 * @param url
		 *            要跳转到的地址
		 * @param newWindow
		 *            是否新开窗口 true or false
		 */
		gotoUrl : function(url, newWindow){
			var pathName = location.pathname;
			var gotoUrl = "http://" + window.location.hostname + ":" + location.port + "/";
			if(pathName.indexOf(Common.projectName) > 0){
				gotoUrl += Common.projectName + "/";
			}
			if(newWindow == true){
				window.open(gotoUrl + url);
			} else {
				location.href = gotoUrl + url;
			}
		},
		// 替换指定传入参数的值,paramName为参数,replaceWith为新值
		replaceParamVal : function(oUrl,paramName,replaceWith) {
		    var re=eval('/('+ paramName+'=)([^&]*)/gi');
		    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
		    return nUrl;
		},
		/**
		 * 获取layui的form组件
		 * 
		 * @param callback
		 */
		getLayForm: function(callback){
			if (layForm){
				callback(layForm);
			} else {
				layui.use('form', function(){
					layForm = layui.form();
					callback(layForm);
				});
			}
		},
		request: function(options){
			var params = $.extend(true, {}, defaults, options);
			if (params.loading){
				Common.loading(1,false);
			}
			var pm = {
				url: params.url,
				type: params.type,
				async: params.async === false ? false : true,
				data: params.data,
				cache: false,
				dataType: params.dataType,
				beforeSend: params.beforeSend,
				success: function(data){
					if (params.loading)
						Common.closeLoading();
					params.success(data);
				},
				error: function(req, errTxt, ex){
					if (typeof params.error === "function"){
						params.error(req, errTxt, ex);
					} else {
						if (console){
							console.log(errTxt + ":" + ex);
						}
					}
				}
			};
			params.contentType && (pm.contentType = params.contentType);
			$.ajax(pm).always(function(a,b,c,d){
				if (b != "success")
					Common.alert('服务器繁忙');
				if (params.loading)
					Common.closeLoading();
			});
		},
		/***
		 * 获取两个日期之间有几个周
		 * @param dt1
		 * @param dt2
		 * @returns {Array} 
		 */
		getTimeWeeks: function(dt1, dt2){
			var ar = [];
			dt1 = new Date(dt1);
			dt2 = new Date(dt2);
			if (dt1.getTime() >= dt2.getTime())
				return ar;
			var tp = null;
			while (dt1.getTime() < dt2.getTime()){
				tp = {
					st: dt1.Format("yy-MM-dd")
				};
				dt1.setDate(dt1.getDate()+6);
				tp.et = dt1.Format("yy-MM-dd");
				dt1.setDate(dt1.getDate()+1);
				ar.push(tp);
			}
			ar[ar.length-1].et = dt2.Format("yy-MM-dd");
			return ar;
		},
		imgPop: function(imgSrc){
			this.getLayer(function(layer){
				layer.photos({
					photos: {
						id: 123,
						data: [{
							pid: 666,
							src: imgSrc
						}]
					},
					anim: 5
				});
			});
		},
		getParamByUrl: function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    var r = win.location.search.substr(1).match(reg);
		    if(r!=null)return  unescape(r[2]); return null;
		},
		getOrgService: function(callback){
			this.loadModel(ORG_SERVICE, callback);
		},
		getTeacherService: function(callback){
			this.loadModel(TEACHER_SERVICE, callback);
		},
		getClassService: function(callback){
			this.loadModel('ClassService', callback);
		},
		getConstantService: function(callback){
			this.loadModel('ConstantService', callback);
		},
		getSpecialityService: function(callback){
			this.loadModel('SpecialityService', callback);
		},
		getHospitalService: function(callback){
			this.loadModel('HospitalService', callback);
		},
		getDayText : function(date){
			var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");  
			var Stamp = date || new Date();  
			return　Stamp.getFullYear() + "年"+(Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日"+ " " + dayNames[Stamp.getDay()];
		}
	};
//	function tasksHandler(){
//		Common.LOADING_LOADED = true;
//		$.each(Common.Tasks, function(){
//			Common.request(this);
//		});
//		Common.Tasks = [];
//	}
//	var loading_gif_id = parseInt(Math.random()*10000+10000);
//	$(document.body).append('<img id="'+loading_gif_id+'" src="js/layui/css/modules/layer/default/loading-1.gif" style="display:none;"/>');
//	$('img#'+loading_gif_id).load(tasksHandler);
//	setTimeout(tasksHandler,2000);
})(window, document);
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt){
  var o = {   
    "M+" : this.getMonth()+1,                 // �·�
    "d+" : this.getDate(),                    // ��
    "h+" : this.getHours(),                   // Сʱ
    "m+" : this.getMinutes(),                 // ��
    "s+" : this.getSeconds(),                 // ��
    "q+" : Math.floor((this.getMonth()+3)/3), // ����
    "S"  : this.getMilliseconds()             // ����
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};
if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
}
if (!Array.prototype.remove){
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};
}
