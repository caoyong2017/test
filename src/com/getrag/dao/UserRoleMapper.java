package com.getrag.dao;

import java.util.List;

import com.getrag.bean.Role;
import com.getrag.bean.UserRoleKey;

public interface UserRoleMapper {

	int deleteByPrimaryKey(UserRoleKey key);

    int insert(UserRoleKey record);

    /**
     * 获取指定用户所有的权限
     * @param userId
     * @return
     */
    public List<Role> getByUserId(String userId);
}