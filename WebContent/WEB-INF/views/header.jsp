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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<header class="navbar navbar-fixed-top bg-info">
            <div class="navbar-branding bg-info dark">
                <a class="navbar-brand" href="adm/custom_reg"> 
                <img src="img/lgg_logo_40x40.png" title="AdminDesigns Logo" style="width:25px;height:25px;margin-right: 5px;"><b>格特拉克（江西）&nbsp;</b></a>
                <span id="toggle_sidemenu_l" class="glyphicons glyphicons-show_lines"></span>
                <ul class="nav navbar-nav pull-right hidden">
                    <li>
                        <a href="#" class="sidebar-menu-toggle">
                            <span class="octicon octicon-ruby fs20 mr10 pull-right "></span>
                        </a>
                    </li>
                </ul>
            </div>
            <ul class="nav navbar-nav navbar-right">
                
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle fw600 p15" data-toggle="dropdown"> <img src="assets/img/avatars/1.jpg" alt="avatar" class="mw30 br64 mr15">
                        <span>${user_in_session.nickname }</span>
                        <span class="caret caret-tp"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-persist pn w250 bg-white" role="menu">
                        <li class="br-t of-h">
                            <a href="adm/account_info" class="fw600 p12 animated animated-short fadeInDown">
                                <span class="fa fa-gear pr5"></span> 账户设置 </a>
                        </li>
                        <li class="br-t of-h">
                            <a href="user/logout" class="fw600 p12 animated animated-short fadeInDown">
                                <span class="fa fa-power-off pr5"></span> 退出 </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </header>
    </body>
</html>