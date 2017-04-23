package com.getrag.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getrag.bean.Role;
import com.getrag.dao.RoleMapper;
import com.getrag.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {
	
	@Autowired
	private RoleMapper roleMapper;

	@Override
	public Role getById(String id) {
		return roleMapper.selectByPrimaryKey(id);
	}

	@Override
	public Role add(Role role) {
		roleMapper.insert(role);
		return role;
	}

	@Override
	public boolean delete(String id) {
		return roleMapper.deleteByPrimaryKey(id) > 0;
	}

	@Override
	public Role update(Role role) {
		roleMapper.updateByPrimaryKey(role);
		return role;
	}

	@Override
	public Role updateNotNull(Role role) {
		roleMapper.updateByPrimaryKeySelective(role);
		return role;
	}

	@Override
	public List<Role> getAll() {
		return roleMapper.getAll();
	}

}
