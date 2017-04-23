package com.getrag.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.getrag.bean.User;
import com.getrag.constants.ConstantData;
import com.getrag.constants.ResponseStatus;
import com.getrag.service.UserService;


@Controller
@RequestMapping("/")
public class CommonController {

	@Autowired
	private UserService userService;
	
	private final String INDEX = "index";
	/**登录页*/
	private final String LOGIN_PAGE = "index";
	/**系统管理员首页*/
	private final String SYSADMIN_HOME = "home_report";

	
	/**
	 * 登陆页
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value={"", "/index"})
	public String toLogin(HttpServletRequest request, ModelMap model){
		User user = (User) request.getSession().getAttribute(ConstantData.USER_SESSION);
		if (user != null){
			if (user.getIsSysAdmin())
				return SYSADMIN_HOME;
			
		}
		return INDEX;
	}
	
	/**
	 * 登录
	 * @param loginName
	 * @param pwd
	 * @return
	 */
	@RequestMapping("/login")
	public String login(HttpServletRequest request, ModelMap model, String loginName, String pwd){
		if (StringUtils.isEmpty(loginName) || StringUtils.isEmpty(pwd))
			return "redirect:/" + LOGIN_PAGE;
		User user = userService.login(loginName, pwd);
		if (user != null){
			user.setLast_login_time(new Date());
			userService.updateNotNull(user);
			request.getSession().setAttribute(ConstantData.USER_SESSION, user);
			if (user.getIsSysAdmin())
				return SYSADMIN_HOME;
		}
		model.addAttribute("err", ResponseStatus.USER_NAME_OR_PWD_WRONG.getMsg());
		return LOGIN_PAGE;
	}
	
}
