package com.getrag.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/adm")
public class AdminController {
	
	/**管理系统首页*/
	private final String HOME = "home";
	/**客户登记*/
	private final String CUSTOEM_REG = "custom_reg";
	
	/**调理师消耗记录*/
	private final String MARSSAGER_REC = "massager_rec";
	/**房间管理*/
	private final String ROOM = "room";
	/**房态图*/
	private final String ROOM_STATE = "room_state";
	/**调理师管理*/
	private final String MASSAGER = "massager";
	/**调理项目管理*/
	private final String PROJECT = "project";
	/**会员卡级别管理*/
	private final String CARD = "card";
	/**会员消费记录*/
	private final String MEMBER_REC = "member_rec";
	/**会员账号信息*/
	private final String MEMBER_ACCOUNT = "member_account";
	/**管理员账号信息*/
	private final String ACCOUNT_INFO = "account_info";
	/**调理师控制台*/
	private final String MASSAGER_HOME = "massager_home";

	/**
	 * 系统首页
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("")
	public String home(HttpServletRequest request, ModelMap model){
		
		return CUSTOEM_REG;
	}
	
	
	
	/**
	 * 客户登记
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("custom_reg")
	public String customReg(HttpServletRequest request, ModelMap model){
		return "header";
	}
	
	
	/**
	 * 调理师消耗记录
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("massager_rec")
	public String massagerRec(HttpServletRequest request, ModelMap model){
		return "redirect:/adm/massager_home";
	}
	
	/**
	 * 房间管理
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("room")
	public String room(HttpServletRequest request, ModelMap model){
		return ROOM;
	}
	
	/**
	 * 房态图
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("room_state")
	public String roomState(HttpServletRequest request, ModelMap model){
		return ROOM_STATE;
	}
	/**
	 * 调理师管理
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("massager")
	public String massager(HttpServletRequest request, ModelMap model){
		return MASSAGER;
	}
	
	/**
	 * 调理项目管理
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("project")
	public String project(HttpServletRequest request, ModelMap model){
		return PROJECT;
	}
	/**
	 * 会员卡级别管理
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("card")
	public String card(HttpServletRequest request, ModelMap model){
		return CARD;
	}
	/**
	 * 会员消费记录
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("member_rec")
	public String memberRec(HttpServletRequest request, ModelMap model){
		return MEMBER_REC;
	}
	/**
	 * 会员账号信息
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("member_account")
	public String memberAccount(HttpServletRequest request, ModelMap model){
		return MEMBER_ACCOUNT;
	}
	/**
	 * 管理员账号信息
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("account_info")
	public String accountInfo(HttpServletRequest request, ModelMap model){
		return ACCOUNT_INFO;
	}
	/**
	 * 调理师控制台
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("massager_home")
	public String massagerHome(HttpServletRequest request, ModelMap model){
		return MASSAGER_HOME;
	}
}
