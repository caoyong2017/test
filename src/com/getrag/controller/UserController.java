package com.getrag.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.getrag.annotation.AuthSysAdmin;
import com.getrag.bean.User;
import com.getrag.constants.ConstantData;
import com.getrag.constants.ResponseStatus;
import com.getrag.service.UserService;
import com.getrag.utils.CommonUtil;
import com.getrag.utils.MD5Util;
import com.getrag.vo.resp.impl.BaseRespVO;

@Controller
@RequestMapping("/user")
public class UserController {

	private Logger LOG = Logger.getLogger(UserController.class);
	@Autowired
	private UserService userService;
	
	/**
	 * 添加店长
	 * @param user
	 * @return
	 */
	@ResponseBody
	@AuthSysAdmin
	@RequestMapping("/add_sp_adm")
	public BaseRespVO<User> addShopAdmin(String userJson){
		User user = CommonUtil.jsonSting2JavaObj(userJson, User.class);
		user = userService.addShopAdmin(user);
		if (user == null)
			return new BaseRespVO<User>(ResponseStatus.USER_PHONE_EXSITS);
		return new BaseRespVO<User>(user);
	}
	
	/**
	 * 店长列表
	 * @return
	 */
	@ResponseBody
	@AuthSysAdmin
	@RequestMapping("/sp_adm_list")
	public BaseRespVO<List<User>> shopAdminList(HttpServletRequest request){
		User user = (User) request.getSession().getAttribute(ConstantData.USER_SESSION);
		return new BaseRespVO<List<User>>(userService.shopAdminList(user.getId()));
	}
	
	/**
	 * 修改店长信息
	 * @param userJson
	 * @return
	 */
	@ResponseBody
	@AuthSysAdmin
	@RequestMapping(value="/update_sp_adm")
	public BaseRespVO<User> updateShopAdmin(String userJson){
		User user = CommonUtil.jsonSting2JavaObj(userJson, User.class);
		ResponseStatus status = userService.updateNotNull(user);
		if (status != ResponseStatus.SUCCESS)
			return new BaseRespVO<User>(status);
		return new BaseRespVO<User>(user);
	}
	
	/**
	 * 删除店长
	 * @param userId
	 * @return
	 */
	@ResponseBody
	@AuthSysAdmin
	@RequestMapping("/del_sp_adm")
	public BaseRespVO<User> delShopAdmin(String userId){
		if (userService.deleteById(userId))
			return new BaseRespVO<User>();
		LOG.error("删除店长失败");
		return new BaseRespVO<User>(ResponseStatus.USER_DEL_FAILURE);
	}
	
	
	/**退出登陆*/
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request){
		request.getSession().invalidate();
		return "redirect:/";
	}
	
	/**
	 * 修改密码
	 * @param massager
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/modifyPwd")
	public BaseRespVO<User> update(HttpServletRequest request, User user){
		if (user == null)
			return new BaseRespVO<User>(ResponseStatus.INVALIDE_PARAM);
		//判断旧密码是否正确
		User u = (User) request.getSession().getAttribute(ConstantData.USER_SESSION);
		u = userService.getUserById(u.getId());
		user.setOldPwd(MD5Util.string2MD5(user.getOldPwd()));
		if (!u.getLogin_pwd().equals(user.getOldPwd()))
			return new BaseRespVO<User>(ResponseStatus.USER_WRONG_PWD);
		
		//更新数据库
		user.setLogin_pwd(MD5Util.string2MD5(user.getLogin_pwd()));
		user.setId(u.getId());
		userService.updateNotNull(user);
		
		//更新session
		u = (User) request.getSession().getAttribute(ConstantData.USER_SESSION);
		u.setNickname(user.getNickname());
		request.getSession().setAttribute(ConstantData.USER_SESSION, u);
		return new BaseRespVO<User>(user);
	}
	
}
