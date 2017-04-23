package com.getrag.service;

import java.util.List;

import com.getrag.bean.Role;

public interface UserRoleService {

	/**
	 * 获取指定用户所有的权限
	 * @param userId
	 * @return
	 */
	public List<Role> getByUserId(String userId);
}
