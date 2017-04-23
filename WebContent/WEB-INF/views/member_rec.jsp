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
        <c:import url="leftside.jsp?parent=5&child=1"></c:import>

        <!-- Start: Content -->
        <section id="content_wrapper">

            <!-- Start: Topbar-Dropdown -->
            <!-- End: Topbar-Dropdown -->

            <!-- Start: Topbar -->
            <!-- End: Topbar -->

            <!-- Begin: Content -->
            <section id="content" style="margin-top:60px;">
            <div class="col-md-12">

                        <div class="panel">
                            <div class="panel-heading">
                                <span class="panel-title">查询条件</span>
                            </div>
                            <div class="panel-body" style="padding-bottom: 0">
                                <form class="form-horizontal layui-form" role="form">
                                    <div class="layui-form-item">
								      <label class="layui-form-label">调理日期</label>
								      <div class="layui-input-inline">
								        <input class="layui-input" placeholder="选择调理日期" onclick="layui.laydate({elem: this, festival: true})">
								      </div>
								      <label class="layui-form-mid">客户姓名</label>
								      <div class="layui-input-inline">
								        <input type="text" required  lay-verify="required" placeholder="请输入客户名称" autocomplete="off" class="layui-input" maxlength="36" />
								      </div>
								      <label class="layui-form-mid">手机号</label>
								      <div class="layui-input-inline">
								        <input type="text" required  lay-verify="required" placeholder="请输入客户手机号" autocomplete="off" class="layui-input" maxlength="36" />
								      </div>
								      <div class="layui-input-inline">
								      	<button class="layui-btn">查询</button>
								      </div>
								  </div>
                                </form>
                            </div>
                        </div>
                    </div>
<div class="col-md-12">
                        <div class="panel panel-visible">
                            <div class="panel-heading br-b-n">
                                <div class="panel-title hidden-xs">
                                    <span class="glyphicon glyphicon-tasks"></span>客户消费记录</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                        	<th>客户姓名</th>
                                        	<th>手机号</th>
                                        	<th>性别</th>
                                            <th>客户类型</th>
                                            <th>会员卡号</th>
                                            <th>调理日期</th>
                                            <th>上下钟时间段</th>
                                            <th>调理项目</th>
                                            <th>调理师</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
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
		<form class="layui-form" lay-filter="intern" style="margin-top: 20px;margin-left: 45px" method="post">
			  
			<div class="layui-form-item">
			    <label class="layui-form-label">调理项目</label>
			    <div class="layui-input-inline">
			      <input type="text" required  lay-verify="required" placeholder="请输入调理项目" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
		    </div>
			  <div class="layui-form-item">
			    <label class="layui-form-label">单价</label>
			    <div class="layui-input-inline">
			      <input type="text" required  lay-verify="required" placeholder="请填写单价" autocomplete="off" class="layui-input" maxlength="36" />
			    </div>
			   </div>
			    <div class="layui-form-item">
			      <label class="layui-form-label">计价方式</label>
			      <div class="layui-input-inline">
			        <select>
			        <option value="">请选择计价方式</option>
			        <option >每60分钟</option>
			        <option >每30分钟</option>
			        <option >每35分钟</option>
			        <option >每45分钟</option>
			        <option >每次</option>
			      </select>
			      </div>
			  </div>
			  <div class="layui-form-item" style="margin-left: 100px">
			  	<button class="layui-btn" lay-submit style="width:150px">确定</button>
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
	<script type="text/javascript" src="js/memberrec.js"></script>
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