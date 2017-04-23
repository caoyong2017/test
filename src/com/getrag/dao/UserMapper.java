package com.getrag.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.getrag.bean.User;

public interface UserMapper {
	
    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    /**
     * 获取指定门店下的用户列表
     * @param shopId 店id
     * @return
     */
	List<User> selectAll(String shopId);
	
	/**
	 * 通过登陆名和密码查询用户
	 * @param loginName
	 * @param loginPwd
	 * @return
	 */
	User selectByLoginNameAndPwd(@Param("login_name") String loginName, @Param("login_pwd") String loginPwd);
	
	/**
	 * 获取店长列表
	 * @param creator 创建者id
	 * @return
	 */
	public List<User> shopAdminList(String creator);
	
	/**
	 * 通过手机号查询用户
	 * @param phone 手机号
	 * @return
	 */
	public User getByPhone(String phone);
}