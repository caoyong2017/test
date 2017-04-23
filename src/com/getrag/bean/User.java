package com.getrag.bean;

import java.util.Date;
import java.util.List;

import org.springframework.util.StringUtils;

import com.getrag.constants.ConstantData;
import com.getrag.utils.ManagerUtil;

public class User {
	
    private String id;

    /**
     * 登陆账号
     */
    private String login_name;

    /**
     * 登陆密码
     */
    private String login_pwd;
    /**旧密码，修改密码时的参数*/
    private String oldPwd;

    /**
     * 姓名
     */
    private String nickname;
    /**性别*/
    private Integer gender;
    /**性别*/
    private String gender_value;

    /**
     * 创建时间
     */
    private Date create_time;

    /**
     * 上次登陆时间
     */
    private Date last_login_time;

    /**
     * 上次修改时间
     */
    private Date last_modify_time;

    /**
     * 介绍
     */
    private String desc_l;
    
    /**
     * 手机号
     */
    private String phone;
    /**是不是店长，1：是，0或Null：不是*/
    private Integer is_admin;
    
    
    /**账号状态*/
    private Integer acc_state;
    /**权限列表*/
    private List<Role> roleList;
    
    /**是否是系统管理员*/
    private Boolean isSysAdmin;


    public String getLogin_name() {
		return login_name;
	}

	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}

	public String getLogin_pwd() {
		return login_pwd;
	}

	public void setLogin_pwd(String login_pwd) {
		this.login_pwd = login_pwd;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getLast_login_time() {
		return last_login_time;
	}

	public void setLast_login_time(Date last_login_time) {
		this.last_login_time = last_login_time;
	}

	public Date getLast_modify_time() {
		return last_modify_time;
	}

	public void setLast_modify_time(Date last_modify_time) {
		this.last_modify_time = last_modify_time;
	}

	public String getDesc_l() {
		return desc_l;
	}

	public void setDesc_l(String desc_l) {
		this.desc_l = desc_l;
	}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPhone() {
		return phone;
	}

	public void setAcc_state(Integer acc_state) {
		this.acc_state = acc_state;
	}

	public Integer getAcc_state() {
		return acc_state;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	public List<Role> getRoleList() {
		return roleList;
	}


	public void setIsSysAdmin(Boolean isSysAdmin) {
		this.isSysAdmin = isSysAdmin;
	}

	public Boolean getIsSysAdmin() {
		if (isSysAdmin == null)
			isSysAdmin = ManagerUtil.checkPermission(roleList, ConstantData.Permissions.SYS_ADMIN);
		return isSysAdmin;
	}



	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender_value(String gender_value) {
		this.gender_value = gender_value;
	}

	public String getGender_value() {
		if (StringUtils.isEmpty(gender_value)){
			if (StringUtils.isEmpty(gender)){
				this.gender_value = "保密";
				return gender_value;
			}
			this.gender_value = this.gender == 0?"女":"男";
		}
		return gender_value;
	}

	public void setIs_admin(Integer is_admin) {
		this.is_admin = is_admin;
	}

	public Integer getIs_admin() {
		return is_admin;
	}

	public void setOldPwd(String oldPwd) {
		this.oldPwd = oldPwd;
	}

	public String getOldPwd() {
		return oldPwd;
	}
}