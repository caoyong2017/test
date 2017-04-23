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
<link rel="stylesheet" type="text/css" href="assets/admin-tools/admin-forms/css/admin-forms.css">

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
        <c:import url="leftside.jsp"></c:import>
        <section id="content_wrapper">
            <section id="content" style="margin-top:60px;">
            	<div class="panel">
                            <div class="panel-heading">
                                <span class="panel-title">账户设置</span>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal" method="post" id="modify">
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">登录名</label>
                                        <div class="col-lg-8">
                                            <p class="form-control-static text-muted">${user_in_session.login_name }</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputStandard" class="col-lg-3 control-label">姓名</label>
                                        <div class="col-lg-8">
                                            <input v-model="nickname" lazy type="text" id="inputStandard" value="${user_in_session.nickname }" class="form-control" placeholder="请输入姓名"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-lg-3 control-label">旧密码</label>
                                        <div class="col-lg-8">
                                            <input v-model="oldpwd" lazy type="text" class="form-control" id="inputPassword" placeholder="请输入旧密码"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-lg-3 control-label">新密码</label>
                                        <div class="col-lg-8">
                                            <input v-model="newpwd" lazy type="text" class="form-control" id="inputPassword" placeholder="请输入新密码"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-lg-3 control-label">密码确认</label>
                                        <div class="col-lg-8">
                                            <input v-model="renewpwd" lazy type="text" class="form-control" id="inputPassword" placeholder="请再次输入新密码"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword" class="col-lg-3 control-label"></label>
                                        <div class="col-lg-8">
                                            <button @click="go" type="button" lay-submit class="btn btn-dark btn-block" style="width: 120px">保存</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
            </section>
        </section>
    </div>
    <input type="hidden" id="userName" value="${user_in_session.nickname }"/>
    <script type="text/javascript" src="vendor/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="vendor/jquery/jquery_ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/utility/utility.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript" src="js/layui/layui.js"></script>
	<script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/common/vue.min.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            "use strict";
            Core.init();
        });
        var vm = new Vue({
        	el: '#modify',
		    data: {
		    	nickname: $('#userName').val(),
		    	oldpwd: '',
		    	newpwd: '',
		    	renewpwd: ''
		    },
		    created:function() {
		        //
		    },
		    methods: {
		    	go: function(){
		    		if (this.newpwd!=this.renewpwd){
		    			Common.alert('两次密码不一样');
		    			return false;
		    		}
		    		Common.request({
		    			url: 'user/modifyPwd',
		    			data: {
		    				nickname: this.nickname,
		    				login_pwd: this.newpwd,
		    				oldPwd: this.oldpwd
		    			},
		    			success: function(data){
		    				Common.alert(data.msg);
		    			}
		    		});
		    	}
		    }
        });
    </script>
</body>
</html>