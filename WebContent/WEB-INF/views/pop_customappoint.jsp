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
<div id="win-content2" style="display: none">
		<div class="layui-form" lay-filter="intern" lay-form style="margin-top: 20px;" method="post">
			  <div class="layui-form-item">
			      <label class="layui-form-label">调理日期</label>
			      <div class="layui-input-inline">
			        <input type="text" id="startTime" name="regDate"  placeholder="调理日期" id="date" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this,choose:pg.msaList})"/>
			      </div>
			      <label class="layui-form-mid">上钟</label>
			      <div class="layui-input-inline">
			        <select id="startTime1" name="startTime1" lay-filter="startTime1">
				        <option value="">请选择上钟时间</option>
				      </select>
			      </div>
			      <label class="layui-form-mid">下钟</label>
			      <div class="layui-input-inline">
			        <select id="endTime1" name="endTime1" lay-filter="endTime1">
				        <option value="">请选择下钟时间</option>
			      </select>
			      </div>
<!-- 			      <div class="layui-form-mid layui-word-aux" style="color: #FF5722" id="hours">1小时</div> -->
			  </div>
			  <div class="layui-form-item">
			     <label class="layui-form-label">选择房间</label>
			      <div class="layui-input-inline">
			        <select id="rooms" name="rooms">
				        <option value="">请选择房间</option>
				      </select>
			      </div>
			      <button class="layui-btn" id="addCustom">
					  <i class="layui-icon">&#xe608;</i> 新增顾客
					</button>
			  </div>
			  <div class="panel panel-visible">
                            <div class="panel-heading br-b-n">
                                <div class="panel-title hidden-xs">
                                    <span class="glyphicon glyphicon-tasks"></span>到堂顾客</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width="10%">姓名</th>
                                            <th width="10%">电话</th>
                                            <th width="10%">调理师</th>
                                            <th width="10%">调理项目</th>
                                            <th width="12%">验证码</th>
                                            <th width="25%">备注</th>
                                            <th width="13%">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody id="customers-list"></tbody>
                                </table>
                            </div>
                        </div>
                        <div class="layui-form-item" style="margin-left: 270px">
			  	<button class="layui-btn layui-btn-primary" lay-filter="addRegInfo" lay-submit style="width:150px">登记</button>
			  	<button class="layui-btn" lay-filter="startMassage" lay-submit style="width:150px">上钟</button>
			  </div>
		</div>
	</div>
    </body>
</html>