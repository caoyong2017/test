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
body.external-page #content .admin-form{max-width: 450px;}
.layui-input-inline{width: 300px !important;}
.panel-body .layui-input-inline{width: 230px !important;}
[v-cloak]{display:none;}
</style>
</head>
<body class="blank-page">
    <div id="main">
        <c:import url="header.jsp"></c:import>
        <c:import url="leftside.jsp?parent=5&child=2"></c:import>
        <section id="content_wrapper" v-cloak>
            <header id="topbar">
                <div class="topbar-right">
                <button type="button" class="btn btn-sm btn-dark " @click="showWin">新增会员</button>
                </div>
            </header>
            <section id="content">
            	<div class="col-md-12">
                        <div class="panel">
                            <div class="panel-heading">
                                <span class="panel-title">查询条件</span>
                            </div>
                            <div class="panel-body" style="padding-bottom: 0;">
                                <form class="form-horizontal layui-form" role="form">
                                    <div class="layui-form-item">
								      <div class="layui-input-inline">
								        <input v-model="searchKey" name="text" trim class="layui-input" placeholder="请输入姓名/手机号/会员卡号"/>
								      </div>
								      <div class="layui-input-inline">
								        <input v-model="startTime" name="date" trim class="layui-input" placeholder="办卡开始时间" onclick="layui.laydate({elem: this, choose: vm.changeStartTime})"/>
								      </div>
								      <div class="layui-input-inline">
								        <input v-model="endTime" name="date" trim class="layui-input" placeholder="办卡结束时间" onclick="layui.laydate({elem: this, choose: vm.changeEndTime})"/>
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
                                   <span class="glyphicon glyphicon-tasks"></span>会员列表</div>
                           </div>
                           <div class="panel-body pn">
                               <table class="table table-striped table-bordered table-hover" id="datatable" cellspacing="0" width="100%">
                                   <thead>
                                       <tr>
                                           <th width="8%">客户账号</th>
                                           <th width="8%">会员姓名</th>
                                           <th width="5%">性别</th>
                                           <th width="7%">手机号</th>
                                           <th width="35%">会员卡信息</th>
                                           <th width="12%">备注</th>
                                           <th width="10%">操作</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                   	   <tr v-for="cust in customerList">
                                   	   	   <td>{{cust.login_name}}</td>
                                   	   	   <td>{{cust.cust_name}}</td>
                                   	   	   <td>{{cust.gender == 0 ? '女' : '男'}}</td>
                                   	   	   <td>{{cust.phone}}</td>
                                   	   	   <td>
                                   	   	   		<div v-if="cust.coupons != null">
	                                   	   	   			<span>{{cust.coupons.coupon_name}}：No.{{cust.coupons.coupon_no}}，</span>
	                                   	   	   			<span>余额 {{cust.coupons.balance}}元，</span>
	                                   	   	   			<span>有效期至：{{new Date(cust.coupons.expire_date).Format('yyyy-MM-dd')}}</span>
                                   	   	   		</div>
                                   	   	   </td>
                                   	   	   <td>{{cust.cust_desc}}</td>
                                   	   	   <td>
                                   	   	   		<button @click="modify(cust)" type="button" class="btn btn-sm btn-dark">编辑</button>
                                   	   	   		<button @click="deleteVip(cust.id)" type="button" class="btn btn-sm btn-danger">删除</button>
                                   	   	   </td>
                                   	   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                   </div>
                   <div style="padding:0 12px;">
                   		<div class="layui-box layui-laypage layui-laypage-molv" style="margin-top: -8px;">
              				<a v-if="curPage>1" @click="getList(curPage-1)" href="javascript:;" class="layui-laypage-prev">上一页</a>
                   			<a v-if="curPage>3" href="javascript:;" @click="getList(1)">首页</a>
                   			<span v-if="curPage>3">…</span>
                   			<template v-for="n in totalPage">
                   				<template v-if="n==curPage">
		                   			<span v-if="n==curPage" class="layui-laypage-curr"><em class="layui-laypage-em" style="background-color:#5FB878;"></em><em>{{n}}</em></span>
                   				</template>
                   				<template v-else-if="curPage-n>-3 && curPage-n<3">
		                   			<a href="javascript:;" @click="getList(n)">{{n}}</a>
                   				</template>
                   			</template>
                   			<span v-if="totalPage-2 > curPage">…</span>
                   			<a v-if="totalPage-2 > curPage" href="javascript:;" @click="getList(totalPage)">末页</a>
                  			<a v-if="curPage<totalPage" @click="getList(curPage+1)" href="javascript:;" class="layui-laypage-prev">下一页</a>
                   		</div>
                   </div>
            </section>
			<div id="win-content" style="display:none;">
				<form class="layui-form" lay-filter="addvip" style="margin-top: 20px;margin-left: 30px" method="post">
					<div class="layui-form-item">
					    <label class="layui-form-label">会员姓名</label>
					    <div class="layui-input-inline">
					      <input type="text" v-model="curVip.cust_name" lay-verify="required" placeholder="请输入会员姓名" autocomplete="off" class="layui-input" maxlength="36" />
					    </div>
				    </div>
					  <div class="layui-form-item">
					    <label class="layui-form-label">手机号</label>
					    <div class="layui-input-inline">
					      <input type="tel" v-model="curVip.phone" lay-verify="required|phone|number"   placeholder="请输入手机号" autocomplete="off" class="layui-input" maxlength="36" />
					    </div>
					   </div>
					   <div class="layui-form-item">
					    <label class="layui-form-label">性别</label>
					    <div class="layui-input-inline" id="custGender">
					    </div>
					   </div>
					    <div class="layui-form-item">
					      <label class="layui-form-label">卡种</label>
					      <div class="layui-input-inline">
					        <select id="coupList" lay-filter="coupon" lay-verify="required">
						        <option value="">请选择卡种</option>
						      </select>
					      </div>
					  	</div>
					   <div class="layui-form-item">
					    <label class="layui-form-label">会员卡号</label>
					    <label class="layui-form-mid" style="margin-right: 3px">No.</label>
					    <div class="layui-input-inline" style="width:274px !important">
					      <input v-model="curVip.coupons.coupon_no" type="text" lay-verify="required|number"  lay-verify="required" placeholder="请输入会员卡号" autocomplete="off" class="layui-input" maxlength="36" />
					    </div>
					   </div>
					   <div class="layui-form-item">
					    <label class="layui-form-label">备注信息</label>
					    <div class="layui-input-inline">
					      <textarea v-model="curVip.cust_desc" placeholder="请输入备注信息" class="layui-textarea"></textarea>
					    </div>
					   </div>
					  <div class="layui-form-item" style="margin-left: 100px">
					  	<button lay-submit class="layui-btn" style="width:150px">确定</button>
					  </div>
				</form>
			</div>
        </section>
    </div>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/vue.min.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/memberaccount.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            "use strict";
            Core.init();
        });
    </script>
</body>
</html>