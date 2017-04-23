package com.getrag.vo.resp.impl;

import com.getrag.constants.ResponseStatus;
import com.getrag.model.Page;
import com.getrag.vo.resp.ResponseVO;

public class BaseRespVO<E> implements ResponseVO {

	/**响应状态码*/
	private int code;
	/**消息*/
	private String msg;
	/**响应对象*/
	private E content;
	/**分页对象*/
	private Page page;
	
	public BaseRespVO() {
		this(ResponseStatus.SUCCESS);
	}
	
	public BaseRespVO(ResponseStatus status) {
		this.code = status.getCode();
		this.msg = status.getMsg();
	}
	
	public BaseRespVO(E content) {
		this(ResponseStatus.SUCCESS);
		this.content = content;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public void setContent(E content) {
		this.content = content;
	}

	public E getContent() {
		return content;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public Page getPage() {
		return page;
	}
}
