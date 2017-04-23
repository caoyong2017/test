<?xml version="1.0" encoding="UTF-8" ?>
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
	<base href="<%=basePath %>" />
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <title>良工馆门店系统</title>
    <meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme" />
    <meta name="description" content="AdminDesigns - A Responsive HTML5 Admin UI Framework">
    <meta name="author" content="AdminDesigns">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="vendor/plugins/fullcalendar/fullcalendar.min.css" media="screen">
    <link rel="stylesheet" type="text/css" href="assets/skin/default_skin/css/theme.css">
	<link rel="stylesheet" href="js/layui/css/layui.css">
    <link rel="shortcut icon" href="assets/img/favicon.ico">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<STYLE type="text/css">
.fc-toolbar{margin-bottom: 0;}
</STYLE>
</head>

<body class="calendar-page">
    <div id="main">
        <c:import url="header.jsp"></c:import>
        <c:import url="leftside.jsp?parent=2"></c:import>
        <section id="content_wrapper">
            <section id="content" class="table-layout" style="margin-top: 60px;">
                <div class="tray tray-center p20 va-t">
                	<FORM action="" class="layui-form">
					      <div class="layui-input-inline" style="float:right;top:-5px;">
					      	<label class="layui-form-label">调理师</label>
					      <div class="layui-input-inline">
					        <select id="massagerSelect" name="massagerSelect"  lay-filter="massagerSelect">
					        <option value="">请选择调理师</option>
					        <c:forEach  items="${massagerList }" var="massager" varStatus="s">
					        	<option value="${massager.id }" <c:if test="${s.index == 0 }">selected=""</c:if> >${massager.nickname }</option>
					        </c:forEach>
					      </select>
					      </div>
					        <button type="button" class="btn btn-sm btn-dark " id="addReg" style="margin-left: 10px;">添加预约</button>
					      </div>
					 </FORM>
                    <!-- Calendar  -->
                    <div id='calendar' class="admin-theme"></div>
                </div>
            </section>
        </section>
    </div>
    <!-- End: Main -->
	<c:import url="pop_upclock.jsp"></c:import>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script src='vendor/plugins/fullcalendar/lib/moment.min.js'></script>
    <script src='vendor/plugins/fullcalendar/fullcalendar.min.js'></script>
	<script src='vendor/plugins/fullcalendar/lang/zh-cn.js'></script>
    <!-- Theme Javascript -->
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
    <script type="text/javascript" src="js/layui/layui.js"></script>
    <script type="text/javascript" src="js/common/common.js"></script>
    <script type="text/javascript" src="js/common/vue.min.js"></script>
    <script type="text/javascript" src="js/customappoint.js"></script>
</body>
</html>
