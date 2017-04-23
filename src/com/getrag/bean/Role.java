package com.getrag.bean;


/**
 * 权限 
 * @author Administrator
 *
 */
public class Role {

    private String id;

    /**
     * 名称
     */
    private String role_name;

    /**
     * 说明
     */
    private String content_l;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	public String getContent_l() {
		return content_l;
	}

	public void setContent_l(String content_l) {
		this.content_l = content_l;
	}

}