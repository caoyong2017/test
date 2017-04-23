package com.getrag.service;

import java.util.List;

import com.getrag.bean.Role;

public interface RoleService {

	public Role getById(String id);
	
	public Role add(Role role);
	
	public boolean delete(String id);
	
	public Role update(Role role);
	
	public Role updateNotNull(Role role);
	
	public List<Role> getAll();
}
