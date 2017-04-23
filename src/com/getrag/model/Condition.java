package com.getrag.model;

import com.getrag.constants.ConditionOperators;

/**
 * 查询条件
 * @author Administrator
 */
public class Condition {

	/**数据库字段*/
	private String key;
	/**实际传入的值*/
	private String value;
	/**操作符*/
	private String op;
	/**判断类型，1：正常判断，0：is null/is not null判断*/
	private Integer judgeType = 1;
	
	public Condition(String key, String value){
		this.key = key;
		this.value = value;
		this.op = ConditionOperators.EQ;
	}
	public Condition(String key, String value, String op){
		this.key = key;
		this.value = value;
		this.op = op;
	}
	public Condition(String key, String value, Integer type){
		this.key = key;
		this.value = value;
		this.judgeType = type;
	}
	
	public void setOp(String op) {
		this.op = op;
	}
	public String getOp() {
		return op;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getValue() {
		return value;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getKey() {
		return key;
	}
	public void setJudgeType(Integer judgeType) {
		this.judgeType = judgeType;
	}
	public Integer getJudgeType() {
		return judgeType;
	}
}
