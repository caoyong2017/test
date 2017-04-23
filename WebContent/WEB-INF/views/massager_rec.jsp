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
body{
	overflow: hidden;
}
body.external-page #content .admin-form{
	max-width: 450px;
}
[v-cloak]{display:none;}
</style>
</head>
<body class="blank-page">
    <!-- Start: Main -->
    <div id="main">
        <c:import url="header.jsp"></c:import>
        <c:import url="leftside.jsp?parent=4&child=1"></c:import>
        <section id="content_wrapper">
            <!-- Begin: Content -->
            <section id="content" style="overflow-y: scroll;height: 700px;margin-top:60px;" v-cloak>
            <div class="col-md-12">
                        <div class="panel">
                            <div class="panel-heading">
                                <span class="panel-title">查询条件</span>
                            </div>
                            <div class="panel-body" style="padding-bottom: 0;">
                                <form class="form-horizontal layui-form" role="form">
                                    <div class="layui-form-item">
								      <div class="layui-input-inline">
								        <input name="date" trim class="layui-input" placeholder="选择调理日期" onclick="layui.laydate({elem: this, festival: true})"/>
								      </div>
								      <div class="layui-input-inline">
								        <select name="massager" id="massagers">
									        <option value="">请选择调理师</option>
								      </select>
								      </div>
								      <div class="layui-input-inline">
								      	<button lay-submit lay-filter="search" class="layui-btn">查询</button>
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
                                    <span class="glyphicon glyphicon-tasks"></span>良工馆调理师消耗记录</div>
                            </div>
                            <div class="panel-body pn">
                                <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width="10%">房间号</th>
                                            <th width="10%">客户姓名</th>
                                            <th width="13%">上下钟时间</th>
                                            <th width="10%">调理师</th>
                                            <th width="10%">调理项目</th>
                                            <th width="12%">总价</th>
                                            <th width="20%">状态</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="reg in regList">
                                        <tr>
                                            <td><span v-if="reg.room != null">{{reg.room.room_name}}</span></td>
                                            <td><span v-if="reg.customer != null">{{reg.customer.cust_name}}</span></td>
                                            <td>{{new Date(reg.start_time).Format('hh:mm')}} - {{new Date(reg.end_time).Format('hh:mm')}}</td>
                                            <td><span v-if="reg.massager != null">{{reg.massager.nickname}}</span></td>
                                            <td><span v-for="serv in reg.servs">{{serv.serv_name}}<br/></span></td>
                                            <td>{{reg.totalPrice}}</td>
                                            <td><img src="img/finished.png"/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </section>
        </section>
    </div>
    <!-- End: Main -->
	<c:import url="pop_customappoint.jsp"></c:import>
	<c:import url="pop_upclock.jsp"></c:import>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/common/vue.min.js"></script>
	<script type="text/javascript" src="js/massagerrec.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            "use strict";
            Core.init();
        });
    </script>
</body>
</html>