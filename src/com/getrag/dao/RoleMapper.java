package com.getrag.dao;

import java.util.List;

import com.getrag.bean.Role;

public interface RoleMapper {
    
    int deleteByPrimaryKey(String id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
    
    public List<Role> getAll();
}