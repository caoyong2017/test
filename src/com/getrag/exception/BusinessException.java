package com.getrag.exception;

public class BusinessException extends Exception {

	private static final long serialVersionUID = -1537758370408256726L;

	public BusinessException() {
		super();
	}
	public BusinessException(String msg){
		super(msg);
	}
	public BusinessException(String msg, Throwable cause){
		super(msg, cause);
	}
}
