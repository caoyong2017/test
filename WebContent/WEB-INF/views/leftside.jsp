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
<c:if test="${user_in_session.isSysAdmin == true }">
<aside id="sidebar_left" class="nano nano-primary">
            <div class="nano-content">
                <ul class="nav sidebar-menu">
                    <li class="sidebar-label pt20">菜单</li>
                    <li <c:if test="${param.parent==2 }">class="active"</c:if>>
                        <a href="super/shop_user">
                            <span class="glyphicons glyphicons-book_open"></span>
                            <span class="sidebar-title">店长管理</span>
                        </a>
                    </li>
                    <li <c:if test="${param.parent==1 }">class="active"</c:if> >
                        <a href="super/shop">
                            <span class="fa fa-calendar"></span>
                            <span class="sidebar-title">门店管理</span>
                        </a>
                    </li>
                </ul>
                <div class="sidebar-toggle-mini">
                    <a href="#">
                        <span class="fa fa-sign-out"></span>
                    </a>
                </div>
            </div>
        </aside>
</c:if>
<c:if test="${user_in_session.isSysAdmin == true }">
<aside id="sidebar_left" class="nano nano-primary" style="max-height:100%;">
            <div class="nano-content">
                <ul class="nav sidebar-menu">
                    <li class="sidebar-label pt20">菜单</li>
                    <li <c:if test="${param.parent==1 }">class="active"</c:if>>
                        <a href="adm/custom_reg">
                            <span class="fa fa-calendar"></span>
                            <span class="sidebar-title">主题分析</span>
                        </a>
                    </li>
                    <li <c:if test="${param.parent==2 }">class="active"</c:if>>
                        <a href="massager/custom_appointment">
                            <span class="glyphicons glyphicons-book_open"></span>
                            <span class="sidebar-title">报表展示</span>
                        </a>
                    </li>
                    <li <c:if test="${param.parent==3 }">class="active"</c:if>>
                        <a href="adm/room_state">
                            <span class="glyphicons glyphicons-home"></span>
                            <span class="sidebar-title">填报录入</span>
                        </a>
                    </li>
                    <li <c:if test="${param.parent==4 }">class="active"</c:if>>
                        <a class="accordion-toggle <c:if test="${param.parent==4 }">menu-open</c:if>" href="#">
                            <span class="glyphicons glyphicons-fire"></span>
                            <span class="sidebar-title">统计图表</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="nav sub-nav">
                            <li <c:if test="${param.parent==4 && param.child==1}">class="active"</c:if>>
                                <a href="adm/massager_rec">
                                    <span class="glyphicons glyphicons-book"></span> 调理师消耗记录 </a>
                            </li>
                            <li <c:if test="${param.parent==4 && param.child==2}">class="active"</c:if>>
                                <a href="adm/massager">
                                    <span class="glyphicons glyphicons-show_big_thumbnails"></span> 调理师账号信息 </a>
                            </li>
                        </ul>
                    </li>
                    <li <c:if test="${param.parent==5 }">class="active"</c:if>>
                        <a class="accordion-toggle <c:if test="${param.parent==5 }">menu-open</c:if>" href="#">
                            <span class="glyphicons glyphicons-cup"></span>
                            <span class="sidebar-title">用户管理</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="nav sub-nav">
                            <li <c:if test="${param.parent==5 && param.child==1}">class="active"</c:if>>
                                <a href="adm/member_rec">
                                    <span class="glyphicons glyphicons-edit"></span> 客户消费记录 </a>
                            </li>
                            <li <c:if test="${param.parent==5 && param.child==2}">class="active"</c:if>>
                                <a href="adm/member_account">
                                    <span class="glyphicons glyphicons-calendar"></span> 会员账号信息 </a>
                            </li>
                            
                        </ul>
                    </li>
                    <li <c:if test="${param.parent==6 }">class="active"</c:if>>
                       <a class="accordion-toggle <c:if test="${param.parent==6 }">menu-open</c:if>" href="#">
                            <span class="glyphicons glyphicons-building"></span>
                            <span class="sidebar-title">权限设置</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="nav sub-nav">
                            <li <c:if test="${param.parent==6 && param.child==1}">class="active"</c:if>>
                                <a href="adm/room">
                                    <span class="glyphicons glyphicons-home"></span> 房间管理 </a>
                            </li>
                            <li <c:if test="${param.parent==6 && param.child==2}">class="active"</c:if>>
                                <a href="adm/project">
                                    <span class="glyphicons glyphicons-notes_2"></span> 调理项目管理 </a>
                            </li>
                            <li <c:if test="${param.parent==6 && param.child==3}">class="active"</c:if>>
                                <a href="adm/card">
                                    <span class="glyphicons glyphicons-nameplate"></span> 会员卡管理 </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
        </c:if>
   
   </body>
</html>