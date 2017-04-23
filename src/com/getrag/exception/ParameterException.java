package com.getrag.exception;

public class ParameterException extends Exception {
	
	private static final long serialVersionUID = 8778095432513416822L;

	public ParameterException() {
		super();
	}
	public ParameterException(String msg) {
		super(msg);
	}
	public ParameterException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
