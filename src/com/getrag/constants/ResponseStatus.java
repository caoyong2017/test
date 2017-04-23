package com.getrag.constants;

/**
 * 响应状态码
 * @author zhaolianqi
 *
 */
public enum ResponseStatus {

	/**成功*/
	SUCCESS (0, "成功"),
	/**非法参数*/
	INVALIDE_PARAM (1, "非法参数"),
	/**删除失败*/
	DEL_FAILURE (2, "删除失败"),
	/**添加失败*/
	ADD_FAILURE (3, "添加失败"),
	/**对象不存在*/
	OBJ_NOT_FOUND (4, "对象不存在"),
	/**取消失败*/
	CANCEL_FAILURE (5, "取消失败"),
	/**用戶名或密碼錯誤*/
	USER_NAME_OR_PWD_WRONG (1001, "用户名或密码错误"),
	/**删除失败*/
	USER_DEL_FAILURE (1002, "删除失败"),
	/**该手机号已存在*/
	USER_PHONE_EXSITS (1003, "该手机号客户已存在"),
	/**密码错误*/
	USER_WRONG_PWD (1004, "密码错误"),
	/**该账号未分配门店*/
	USER_HAS_NO_SHOP (1005, "该账号未分配门店"),
	USER_CUSTNO_EXSITS (1006, "该会员卡号客户已存在"),
	/**门店不存在*/
	SHOP_NOT_FOUND (2001, "门店不存在"),
	/**无权限访问*/
	AUTH_FAILURE (4000, "无权限访问"),
	/**无权限操作*/
	AUTH_FAILURE2 (4001, "无权限操作"),
	/**房间被占用*/
	ROOM_USEING (5001, "房间被占用"),
	/**房间未清理*/
	ROOM_DIRTY (5002, "房间未清理"),
	/**房间维修中*/
	ROOM_REPAIRING (5003, "房间维修中"),
	/**请选择房间*/
	ROOM_NOT_CHOOSED (5004, "请选择房间"),
	/**请选择服务项目*/
	SERV_NOT_CHOOSED (6001, "请选择服务项目"),
	/**请选择调理时间*/
	TIME_NOT_CHOOSED (7001, "请选择调理时间"),
	/**调理日期未选择*/
	TIME_DATE_NOT_CHOOSED (7002, "调理日期未选择"),
	/**客户姓名不能为空*/
	CUSTOMER_EMPTY_NAME (8001, "客户姓名不能为空"),
	/**未选择调理师*/
	REG_NOT_CHOOSE_MASSAGER (9001, "未选择调理师")
	;
	private int code;
	private String msg;
	
	ResponseStatus(int code, String msg) {
		this.code = code;
		this.setMsg(msg);
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
