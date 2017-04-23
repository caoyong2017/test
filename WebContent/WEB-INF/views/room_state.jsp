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
.room-box{
	float:left;
	width: 140px;
	height:100px;
	margin-right: 20px;
	margin-bottom: 20px;
	font-size: 18px;
	border-bottom: 2px solid #A8A8A8;
    border-right: 2px solid #A8A8A8;
}
.room-box:hover{
	border:2px solid yellow;
	cursor: pointer;
}
.box-line{
	display: block;
	font-size: 10px;
}
.first-line{
	display: block;
	padding-bottom: 5px;
}
.first-line span{
	font-size: 13px;
	margin-left: 5px;
}
.tm-tag.tm-tag-danger-null{
  color: #FFF;
  background-color: #ed7764;
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
        <c:import url="leftside.jsp?parent=3"></c:import>

        <!-- Start: Content -->
        <section id="content_wrapper">

            <!-- Start: Topbar-Dropdown -->
            <!-- End: Topbar-Dropdown -->

            <!-- Start: Topbar -->
            <header id="topbar">
                <div style="margin-top: 6px">
                     <span class="tm-tag tm-tag-info">
                         <span>空房</span>
                     </span>
                     <span class="tm-tag tm-tag-danger">
                         <span>调理</span>
                     </span>
                     <span class="tm-tag tm-tag-alert">
                         <span>维修</span>
                     </span>
                     <span class="tm-tag tm-tag-inverse">
                         <span>打扫</span>
                     </span>
                 </div>
            </header>
            <!-- End: Topbar -->

            <!-- Begin: Content -->
            <section id="content">
				<div class="col-md-12" id="room_container">
                    
                </div>
            </section>
            <!-- End: Content -->

        </section>

        <!-- Start: Right Sidebar -->
        <!-- End: Right Sidebar -->

    </div>
    <!-- End: Main -->
	<div id="win-content" style="display: none">
		<div class="layui-form" lay-filter="intern" lay-form style="margin-top: 20px;" method="post">
			  <div class="layui-form-item">
			      <div id="customers-header" class="layui-input-block" style="margin-left: 0">
			      </div>
			      
			  </div>
			  <div class="panel panel-visible">
                            <div class="panel-heading br-b-n">
                                <div class="panel-title hidden-xs">
                                    <span class="glyphicon glyphicon-tasks"></span>调理顾客</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width="10%">姓名</th>
                                            <th width="10%">电话</th>
                                            <th width="9%">调理师</th>
                                            <th width="20%">调理项目</th>
                                            <th width="8%">验证码</th>
                                            <th width="38%">备注</th>
                                        </tr>
                                    </thead>
                                    <tbody id="customers-list">
                                    		
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="layui-form-item" style="margin-left: 270px">
			  </div>
		</div>
	</div>
	<c:import url="pop_upclock.jsp"></c:import>
    <!-- BEGIN: PAGE SCRIPTS -->

    <!-- jQuery -->
    
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>

    <!-- Bootstrap -->
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/BootstrapMenu.min.js"></script>

    <!-- Theme Javascript -->
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/roomstate.js"></script>
    <!-- END: PAGE SCRIPTS -->
 
	
</body>
</html>