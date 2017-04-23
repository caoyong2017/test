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
<title>格特拉克（江西）报表系统</title>
<meta charset="utf-8">
<meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme" />
<meta name="description" content="AdminDesigns - A Responsive HTML5 Admin UI Framework">
<meta name="author" content="AdminDesigns">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Theme CSS -->
<link rel="stylesheet" type="text/css" href="assets/skin/default_skin/css/theme.css">
<link rel="stylesheet" type="text/css" href="assets/admin-tools/admin-forms/css/admin-forms.css">
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
.lg-line{
	clear:both;
	overflow: hidden;
}
.lg-line .l{
	float:left;width: 23%;
	text-align: right;
}
.lg-line .r{
	float:left;
	margin-left: 3%;
	width: 74%;
}
[v-cloak] {display:none;}
</style>
</head>
<body class="blank-page">
    <div id="main">
        <c:import url="header.jsp"></c:import>
        <c:import url="leftside.jsp"></c:import>
        <section id="content_wrapper">
            <section id="content" style="margin-top:60px;" v-cloak>
            	<div style="padding: 10px 0;float:right;">
            		<button class="btn btn-sm btn-default" @click="prevDay">前一天</button>
            		<button class="btn btn-sm btn-default" @click="today">今天</button>
            		<button class="btn btn-sm btn-default" @click="nextDay">后一天</button>
            	</div>
            	<div style="clear:both;"></div>
            	<div class="panel">
                            <div class="panel-heading">
                                <span class="panel-title text-info fw700">{{curDate}}</span>
                            </div>
                            <div class="panel-body p5">
                                <table class="table mbn table-striped admin-form theme-info" id="reg-list">
                                    <tbody v-for="reg in regList">
                                        <tr>
                                            <td class="">
                                            	<div class="lg-line">
	                                            	<div class="l">客户</div>
                                            		<div class="r">{{ reg.customer.cust_name }}</div>
                                            	</div>
                                            	<div class="lg-line">
	                                            	<div class="l">房间</div>
                                            		<div class="r" v-if="reg.room!=null">{{ reg.room.room_name }}</div>
                                            		<div class="r" v-else>未选择</div>
                                            	</div>
                                            	<div class="lg-line">
	                                            	<div class="l" v-if="reg.reg_status == 0">预约时间</div>
	                                            	<div class="l" v-else>上钟时间</div>
                                            		<div class="r">
                                            			<span v-if="reg.reg_status == 1">{{new Date(reg.start_time).Format('hh:mm')}}</span>
                                            			<span v-else>{{new Date(reg.start_time).Format('hh:mm')}} - {{new Date(reg.end_time).Format('hh:mm')}}</span>
                                            		</div>
                                            	</div>
                                            	<div class="lg-line">
	                                            	<div class="l">调理项目</div>
                                            		<div class="r" style="color:#5FB878;">
                                            		<span v-for="serv in reg.servs" style="padding-right:10px;">{{serv.serv_name}}</span>
                                            		</div>
                                            	</div>
                                            	<div class="lg-line" v-if="reg.mark_l">
	                                            	<div class="l">备注</div>
                                            		<div class="r">{{reg.mark_l}}</div>
                                            	</div>
                                            	<div class="lg-line">
	                                            	<div class="l">状态</div>
                                            		<div class="r" style="color:#FF5722;">{{reg.reg_status_value}}</div>
                                            	</div>
                                            	<div class="lg-line" v-if="reg.reg_status == 1 || reg.reg_status == 2">
	                                            	<button v-on:click="endMassage(reg.id, $event)" type="button" class="btn btn-sm btn-dark btn-block" style="position: relative;top:5px;">下钟</button>
                                            	</div>
                                            	<div class="lg-line" v-if="reg.reg_status == 3 || reg.reg_status == 2">
	                                            	<button v-on:click="goonMasg(reg.id, $event)" type="button" class="btn btn-sm btn-info btn-block" style="position: relative;top:5px;">继续调理</button>
                                            	</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
            </section>
        </section>
    </div>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>
    <!-- Bootstrap -->
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/common/vue.min.js"></script>
	<script type="text/javascript" src="js/massagerHome.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            "use strict";
            Core.init();
        });
    </script>
</body>
</html>