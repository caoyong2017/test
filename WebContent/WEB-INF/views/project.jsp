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

    <!-- Start: Theme Preview Pane -->
    
    <!-- End: Theme Preview Pane -->

    <!-- Start: Main -->
    <div id="main">

        <!-- Start: Header -->
        <c:import url="header.jsp"></c:import>
        <!-- End: Header -->

        <!-- Start: Sidebar -->
        <c:import url="leftside.jsp?parent=6&child=2"></c:import>

        <!-- Start: Content -->
        <section id="content_wrapper">

            <!-- Start: Topbar-Dropdown -->
            <!-- End: Topbar-Dropdown -->

            <!-- Start: Topbar -->
            <header id="topbar">
                <div class="topbar-right">
                <button type="button" class="btn btn-sm btn-dark " id="addReg">新增项目</button>
                </div>
            </header>
            <!-- End: Topbar -->

            <!-- Begin: Content -->
            <section id="content">
<div class="col-md-12">
                        <div class="panel panel-visible">
                            <div class="panel-heading br-b-n">
                                <div class="panel-title hidden-xs">
                                    <span class="glyphicon glyphicon-tasks"></span>调理项目表</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>调理项目</th>
                                            <th>价格</th>
                                            <th>时长(分钟)</th>
                                            <th>计费方式</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody id="serv-list"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </section>
            <!-- End: Content -->

        </section>

        <!-- Start: Right Sidebar -->
        <!-- End: Right Sidebar -->

    </div>
    <!-- End: Main -->
	<div id="win-content" style="display: none">
		<form class="layui-form" lay-filter="intern" style="margin-top: 20px;margin-left: 45px" method="post" id="addServForm">
			<input id="serv-id" type="hidden" />
			<div class="layui-form-item">
			    <label class="layui-form-label">调理项目</label>
			    <div class="layui-input-inline">
			      <input type="text" name="servName" id="servName" required  lay-verify="required" placeholder="请输入服务名称" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
		    </div>
			    <div class="layui-form-item">
			      <label class="layui-form-label">计价方式</label>
			      <div class="layui-input-inline">
			        <select name="priceType" lay-filter="priceType" id="priceTypeCol">
				        <option value="0">按时长</option>
				        <option value="1">按次数</option>
			      </select>
			      </div>
			  </div>
			  <div class="layui-form-item">
			    <label class="layui-form-label">价格</label>
			    <div class="layui-input-inline">
			      <input type="text" name="price" id="priceCol" required  lay-verify="number" placeholder="请输入价格" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
			   </div>
			  <div class="layui-form-item" id="totalTimeDiv">
			    <label class="layui-form-label">时长(分钟)</label>
			    <div class="layui-input-inline">
			      <input type="text" name="totalTime" id="totalTimeCol" placeholder="请输入时长" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
			   </div>
			  <div class="layui-form-item" style="margin-left: 100px">
			  	<button class="layui-btn" lay-filter="addServ" lay-submit style="width:150px">确定</button>
			  </div>
		</form>
	</div>
    <!-- BEGIN: PAGE SCRIPTS -->

    <!-- jQuery -->
    
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>

    <!-- Bootstrap -->
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>

    <!-- Theme Javascript -->
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/project.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {

            "use strict";

            // Init Theme Core    
            Core.init();

            // Init Theme Core    

        });
      //一般直接写在一个js文件中
        
    </script>
    <!-- END: PAGE SCRIPTS -->
 
	
</body>
</html>