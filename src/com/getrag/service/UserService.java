package com.getrag.service;

import java.util.List;

import com.getrag.bean.User;
import com.getrag.constants.ResponseStatus;

public interface UserService {
	
	public User getUserById(String id);

	/**
	 * 获取指定门店下的用户列表
	 * @param shopId 门店id
	 * @return
	 */
	public List<User> getListByShop(String shopId);

	public User insert(User userInfo);
	
	/**
	 * 添加店长
	 * @param user
	 * @return
	 */
	public User addShopAdmin(User user);
	
	public ResponseStatus update(User user);
	
	public ResponseStatus updateNotNull(User user);
	
	public User login(String loginName, String pwd);
	
	/**
	 * 获取店长列表
	 * @return
	 */
	public List<User> shopAdminList(String creator);
	
	public boolean deleteById(String userId);
}
