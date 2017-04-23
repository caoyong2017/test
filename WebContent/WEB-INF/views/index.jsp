<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
	<base href="<%=basePath %>" />
	<meta charset="utf-8" />
	<title>格特拉克（江西）报表系统</title>
	  <meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme" />
      <meta name="description" content="AdminDesigns - A Responsive HTML5 Admin UI Framework">
      <meta name="author" content="AdminDesigns">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="css/font-awesome/style.css"/>
		<link rel="stylesheet" type="text/css" href="css/animate.min.css">
		<link rel="stylesheet" type="text/css" href="css/login.css" />
		<script type="text/javascript" src="js/jquery.min.js" ></script>
		<script>
			$(function(){
				$('#account,#password').focus(function(){
					$('#container').removeClass("animated tada fadeInDown");
					$('.msg').html("");
				});
			     $('form').submit(function(){
			        var account  = $('#account').val();
					var password = $('#password').val();
					//改变登录按钮文字
					$('#submit').val('登录...');
					//让ajax变为同步方式、
					$.ajaxSetup({async:false});
	
			     	
					/* 
					$.post('adm/custom_reg', $('form').serialize(), function(result) {
						if (result) {
							alert('11');
						} else {
							alert('ff');
							$('#submit').val('登录');
							$('#container').removeClass("animated tada fadeInDown").addClass('animated tada');
							$('.msg').html("用户名或密码错误！");
						}
					});
					// */
				}); 
			});
			
		
		</script>
	</head>

	<body>
		<div class="loginbox pop_fadein animated fadeInDown" id="container">
			<div class="title">
				<div class="logo"><b>GETRAG</b>报表系统</div>
				<div class='info'>—— V1.0</div>
			</div>
			<form method="post" action="login">
				<div class="inputs">
					<div>
						<span><i class="icon-user"></i></span>
						<input id="account" name="loginName" type="text" placeholder="账号" required/> 
					</div>
					<div>
						<span><i class="icon-lock"></i></span>
						<input id="password" name='pwd' type="password" placeholder="密码" required />
					</div>
				</div>
				<div class="actions">
					<input type="submit" id="submit" value="登录" />
				</div>
				<div class="msg"></div>
				<div style="clear:both;"></div>
				<div class='guest'>
					<a href="/index.jsp">返回首页<i class='icon-arrow-right'></i></a>
				</div>
			</form>
		</div>
		<a href=""></a>
	</body>

</html>