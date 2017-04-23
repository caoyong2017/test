package com.getrag.bean;

import java.util.Date;

public class UserRoleKey {
    /**
     * 用户id
     *
     */
    private String user_id;

    /**
     * 角色id
     *
     */
    private String rol_id;
    
    private Date create_time;

	public String getRol_id() {
		return rol_id;
	}

	public void setRol_id(String rol_id) {
		this.rol_id = rol_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreate_time() {
		return create_time;
	}
}