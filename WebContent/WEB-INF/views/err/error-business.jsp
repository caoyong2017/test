<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.getrag.exception.BusinessException" %>
<%
response.setHeader("Content-type", "text/html;charset=UTF-8");
response.setCharacterEncoding("UTF-8");
response.getWriter().write("{\"code\":-1,\"msg\":\"" + ((BusinessException)request.getAttribute("ex")).getMessage() + "\"}");
response.getWriter().flush();
response.getWriter().close();
%>
