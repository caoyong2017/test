package com.getrag.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.getrag.bean.User;
import com.getrag.bean.UserRoleKey;
import com.getrag.constants.ConstantData;
import com.getrag.constants.ResponseStatus;
import com.getrag.dao.UserMapper;
import com.getrag.dao.UserRoleMapper;
import com.getrag.service.UserService;
import com.getrag.utils.MD5Util;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;


	@Override
	public User getUserById(String id) {
		return userMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<User> getListByShop(String shopId) {
		return userMapper.selectAll(shopId);
	}

	@Override
	public User insert(User userInfo) {
		User user = userMapper.getByPhone(userInfo.getPhone());
		if (user != null)
			return null;
		userInfo.setLogin_name(userInfo.getPhone());
		userInfo.setLogin_pwd(MD5Util.string2MD5("123456"));
		userMapper.insert(userInfo);
		return userInfo;
	}

	

	@Override
	public User login(String loginName, String loginPwd) {
		loginPwd = MD5Util.string2MD5(loginPwd);
		return userMapper.selectByLoginNameAndPwd(loginName, loginPwd);
	}

	@Override
	public ResponseStatus update(User user) {
		User u = userMapper.selectByPrimaryKey(user.getId());
		if (!u.getPhone().equals(user.getPhone())){
			if (userMapper.getByPhone(user.getPhone()) != null)
				return ResponseStatus.USER_PHONE_EXSITS;
		}
		userMapper.updateByPrimaryKey(user);
		return ResponseStatus.SUCCESS;
	}

	@Override
	public ResponseStatus updateNotNull(User user) {
		User u = userMapper.selectByPrimaryKey(user.getId());
		if (!u.getPhone().equals(user.getPhone())){
			if (userMapper.getByPhone(user.getPhone()) != null)
				return ResponseStatus.USER_PHONE_EXSITS;
		}
		user.setLast_modify_time(new Date());
		return ResponseStatus.SUCCESS;
	}

	@Override
	public List<User> shopAdminList(String creator) {
		return userMapper.shopAdminList(creator);
	}

	@Override
	public User addShopAdmin(User user) {
		// TODO 自动生成的方法存根
		return null;
	}

	@Override
	public boolean deleteById(String userId) {
		// TODO 自动生成的方法存根
		return false;
	}

	

}
