<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="<%=basePath %>" />
<meta name="renderer" content="webkit" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
<title>良工馆门店系统</title>
<meta charset="utf-8">
<meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme" />
<meta name="description" content="AdminDesigns - A Responsive HTML5 Admin UI Framework">
<meta name="author" content="AdminDesigns">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Font CSS (Via CDN) -->

<!-- Theme CSS -->
<link rel="stylesheet" type="text/css" href="assets/skin/default_skin/css/theme.css">

<!-- Admin Forms CSS -->
<link rel="stylesheet" href="js/layui/css/layui.css">
<!-- Favicon -->
<link rel="shortcut icon" href="assets/img/favicon.ico">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<style>
body.external-page #content .admin-form{
	max-width: 450px;
}
</style>
</head>
<body class="blank-page">
    <div id="main">
        <c:import url="header.jsp"></c:import>
        <c:import url="leftside.jsp?parent=4&child=2"></c:import>
        <section id="content_wrapper">
            <header id="topbar">
                <div class="topbar-right">
                <button type="button" class="btn btn-sm btn-dark " id="addReg">新增调理师</button>
                </div>
            </header>
            <section id="content">
<div class="col-md-12">
                        <div class="panel panel-visible">
                            <div class="panel-heading br-b-n">
                                <div class="panel-title hidden-xs">
                                    <span class="glyphicon glyphicon-tasks"></span>良工馆调理师表</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width="15%">姓名</th>
                                            <th width="15%">手机号</th>
                                            <th width="10%">性别</th>
                                            <th width="45%">简介</th>
                                            <th width="15%">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody id="card-list"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </section>
        </section>
    </div>
    <style>
	.layui-input-inline{width: 300px !important;}
	</style>
	<div id="win-content" style="display: none">
		<form class="layui-form" lay-filter="intern" style="margin-top: 20px;margin-left: 30px" method="post" id="addForm">
			<input id="card-id" type="hidden" />
			<div class="layui-form-item">
			    <label class="layui-form-label">姓名</label>
			    <div class="layui-input-inline">
			      <input type="text" name="nickname" required  lay-verify="required" placeholder="请填写姓名" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
		    </div>
		      <div class="layui-form-item">
			    <label class="layui-form-label">手机号</label>
			    <div class="layui-input-inline">
			      <input type="text" name="phone" required  lay-verify="phone" placeholder="请填写手机号" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
			    <div class="layui-form-mid layui-word-aux" style="color:#FF5722">*用户名为手机号，初始密码为123456</div>
		    </div>
		      <div class="layui-form-item">
			    <label class="layui-form-label">性别</label>
			    <div class="layui-input-inline" id="gender">
			      <input type="radio" name="sex" value="1" title="男" checked />
      				<input type="radio" name="sex" value="0" title="女" />
			    </div>
		    </div>
			  <div class="layui-form-item">
			    <label class="layui-form-label">简介</label>
			    <div class="layui-input-inline">
			      <textarea placeholder="请输入简介" class="layui-textarea" name="desc"></textarea>
			    </div>
		    </div>
			  <div class="layui-form-item" style="margin-left: 100px">
			  	<button class="layui-btn" lay-filter="addServ" lay-submit style="width:150px">确定</button>
			  </div>
		</form>
	</div>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/massager.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            "use strict";
            Core.init();
        });
    </script>
</body>
</html>