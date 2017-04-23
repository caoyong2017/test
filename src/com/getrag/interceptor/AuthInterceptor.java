package com.getrag.interceptor;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.getrag.annotation.AuthSysAdmin;
import com.getrag.bean.User;
import com.getrag.constants.ConstantData;
import com.getrag.constants.ResponseStatus;
import com.getrag.vo.resp.impl.BaseRespVO;

/**
 * 权限控制
 * @author Administrator
 *
 */
public class AuthInterceptor implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {

	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {

	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {
		HandlerMethod methodHandler = (HandlerMethod) handler;
		Method method = methodHandler.getMethod();
		boolean next = false;
		boolean noAuth = true;
		//系统管理员
		if (method.isAnnotationPresent(AuthSysAdmin.class)){
			noAuth = false;
			User user = (User) request.getSession().getAttribute(ConstantData.USER_SESSION);
			if (user.getIsSysAdmin())
				next = true;
		}

		if (noAuth)
			next = true;
		if (next)
			return true;
		response.getWriter().write(JSON.toJSONString(new BaseRespVO<Object>(ResponseStatus.AUTH_FAILURE2)));
		response.getWriter().close();
		return false;
	}

}
