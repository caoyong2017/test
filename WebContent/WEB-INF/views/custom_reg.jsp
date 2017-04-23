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
body{overflow: hidden;}
body.external-page #content .admin-form{
	max-width: 450px;
}
.lg-line{
	clear:both;
	overflow: hidden;
	margin-bottom: 3px;
}
.lg-line .l{
	float:left;width: 20%;
	text-align: right;
}
.lg-line .r{
	float:left;
	margin-left: 3%;
	width: 77%;
	line-height: 20px;
}
.lg-line .r .v{
	margin-bottom: 3px;
}
.lg-line .r .v input{
	width:50px;
}
#downClockWin{
	display: none;
	padding:15px;
}
</style>
</head>
<body class="blank-page">
    <div id="main">
        <c:import url="header.jsp"></c:import>
        <c:import url="leftside.jsp?parent=1"></c:import>
        <section id="content_wrapper">
            <header id="topbar">
                <div class="topbar-left">
                    <ol class="breadcrumb">
                        <li class="crumb-active">
                            <span class="fs18 text-left" id="todayText"></span>
                        </li>
                    </ol>
                </div>
                <div class="navbar-form navbar-left navbar-search ml5" role="search" style="margin-top: 2px;margin-bottom: 0">
                <div class="form-group">
                    <input id="keywords" type="text" class="form-control" placeholder="搜索" style="border-color: #E0E0E0"/>
                </div>
                <span id="search" class="glyphicons glyphicons-search" style="top:4px;left:5px;cursor: pointer;"></span>
            </div>
                <div class="topbar-right">
                <div class="fc-button-group">
                <button type="button" id="bday" class="btn btn-sm btn-default ">前一天</button>
                <button type="button" id="today" class="btn btn-sm btn-default ">今天</button>
                <button type="button" id="aday" class="btn btn-sm btn-default ">后一天</button>
                </div>
                <button type="button" class="btn btn-sm btn-dark " style="margin-left: 15px" id="addReg">新增登记</button>
                </div>
            </header>
            <!-- End: Topbar -->
            <!-- Begin: Content -->
            <section id="content" style="overflow-y:scroll;">
					<div class="col-md-12">
                        <div class="panel panel-visible">
                            <div class="panel-heading br-b-n">
                                <div class="panel-title hidden-xs">
                                    <span class="glyphicon glyphicon-tasks"></span>良工馆客户登记表</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width="9%">姓名</th>
                                            <th width="10%">电话</th>
                                            <th width="10%">调理时间</th>
                                            <th width="8%">调理师</th>
                                            <th width="8%">房间号</th>
                                            <th width="12%">验证码</th>
                                            <th width="15%">备注</th>
                                            <th width="10%">状态</th>
                                            <th width="19%">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody id="mas-list"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </section>
        </section>
    </div>
    <c:import url="pop_customappoint.jsp"></c:import>
	<c:import url="pop_upclock.jsp"></c:import>
	
    <div id="downClockWin" v-if="reg != null" style="min-height:195px;">
    	<div class="lg-line" v-if="reg.customer != null">
	       	<div class="l">客户账号</div>
	   		<div class="r">{{ reg.customer.login_name }}</div>
      	</div>
    	<div class="lg-line" v-if="reg.customer != null">
	       	<div class="l">客户</div>
	   		<div class="r">{{ reg.customer.cust_name }}</div>
      	</div>
      	<div class="lg-line" v-if="reg.room != null">
       		<div class="l">房间</div>
      		<div class="r">{{ reg.room.room_name }}</div>
      	</div>
      	<div class="lg-line">
       	<div class="l">调理时间</div>
      		<div class="r">{{new Date(reg.start_time).Format('hh:mm')}} - {{new Date(reg.end_time).Format('hh:mm')}}</div>
      	</div>
      	<div class="lg-line">
       		<div class="l">调理项目</div>
      		<div class="r" style="color:#5FB878;"><div class="v" v-for="serv in reg.servs" style="padding-right:10px;">{{serv.serv_name}}</div></div>
      	</div>
      	<div class="lg-line" v-if="reg.mark_l">
       		<div class="l">备注</div>
      		<div class="r">{{reg.mark_l}}</div>
      	</div>
      	<div class="lg-line">
       		<div class="l">状态</div>
      		<div class="r" style="color:#FF5722;">{{reg.reg_status_value}}</div>
      	</div>
      	<div class="lg-line">
       		<div class="l">消费总额</div>
      		<div class="r">{{totalFee}}</div>
      	</div>
      	<div class="lg-line" v-if="reg.reg_status == 1 || reg.reg_status == 3">
       		<button v-on:click="endMassage(reg.id, $event)" type="button" class="btn btn-sm btn-dark btn-block" style="margin-top:8px;">下钟</button>
      	</div>
    </div>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>

    <!-- Bootstrap -->
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>

    <!-- Theme Javascript -->
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/common/vue.min.js"></script>
	<!-- <script type="text/javascript" src="js/customreg.js"></script> -->
    <script type="text/javascript">
        jQuery(document).ready(function() {
            "use strict";
            Core.init();
			$("#todayText").text(Common.getDayText());
			$('#content').height($(window).height()*0.8);
        });
    </script>
</body>
</html>