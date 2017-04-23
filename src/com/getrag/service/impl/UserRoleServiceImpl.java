package com.getrag.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getrag.bean.Role;
import com.getrag.dao.UserRoleMapper;
import com.getrag.service.UserRoleService;

@Service("userRoleService")
public class UserRoleServiceImpl implements UserRoleService {
	
	@Autowired
	private UserRoleMapper userRoleMapper;

	@Override
	public List<Role> getByUserId(String userId) {
		return userRoleMapper.getByUserId(userId);
	}

}
