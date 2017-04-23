<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div id="win-content" style="display: none">
		<form class="layui-form" lay-filter="intern" style="padding: 20px 20px 0" method="post" id="addCustomerForm">
			<input id="customerName" type="hidden" name="custNameHidden" />
			<div class="layui-form-item">
			    <label class="layui-form-label">顾客姓名</label>
			    <div class="layui-input-inline" >
			      <input type="text" name="username" value="新顾客" lay-verify="required" placeholder="请输入顾客姓名" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
			    <label class="layui-form-mid">手机号</label>
			    <div class="layui-input-inline" >
			      <input type="text" name="phone" placeholder="请输入手机号" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
			    <label class="layui-form-mid">验证码</label>
			    <div class="layui-input-inline" >
			      <input type="text" name="ver_code" placeholder="请输入验证码" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
		    </div>
		    <div class="layui-form-item">
			      <label class="layui-form-label">调理日期</label>
			      <div class="layui-input-inline">
			        <input type="text" id="startTimePop" name="regDate"  placeholder="调理日期" id="date" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this,choose:Reg.msaList})"/>
			      </div>
			      <label class="layui-form-mid" style="margin-left: 14px;">上钟</label>
			      <div class="layui-input-inline">
			        <select id="beginTime" name="beginTime" lay-filter="startTime">
				        <option value="">请选择上钟时间</option>
			      </select>
			      </div>
			      <label class="layui-form-mid" style="margin-left: 14px;">下钟</label>
			      <div class="layui-input-inline">
			        <select id="endTime" name="endTime" lay-filter="endTime">
				        <option value="">请选择下钟时间</option>
				      </select>
			      </div>
<!-- 			      <div class="layui-form-mid layui-word-aux" style="color: #FF5722">1小时</div> -->
			  </div>
			  
		    <div class="layui-form-item">
			      <label class="layui-form-label">空闲调理师</label>
			      <div class="layui-input-inline">
			      	<input name="massagerId" type="hidden" id="massagerId">
			        <select id="massagers2" lay-filter="massager" name="massager">
				        <option value="">请选择调理师</option>
				      </select>
			      </div>
			       <label class="layui-form-mid">选房间</label>
			      <div class="layui-input-inline">
			        <select id="rooms2" name="room">
				        <option value="">请选择房间</option>
				      </select>
			      </div>
			  </div>
			  <div class="layui-form-item">
			      <label class="layui-form-label">调理项目</label>
			      <input name="servId" type="hidden" id="servId" />
			      <div class="layui-input-block" id="servList"><!-- service list --></div>
			  </div>
			  <div class="layui-form-item">
			    <label class="layui-form-label">备注信息</label>
			    <div class="layui-input-block" style="width: 695px">
			      <textarea name="mark" placeholder="请输入备注信息" class="layui-textarea"></textarea>
			    </div>
			   </div>
			  <div class="layui-form-item" style="margin-left: 100px">
			  	<button class="layui-btn" lay-filter="addCustomer" lay-submit style="width:150px">确定</button>
			  	<button class="layui-btn layui-btn-primary" style="width:150px;display:none;" id="cancelReg">取消预约</button>
			  </div>
		</form>
	</div>
    </body>
</html>