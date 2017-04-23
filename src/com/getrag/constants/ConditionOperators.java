package com.getrag.constants;

/**
 * 查询数据的操作符
 * @author Administrator
 */
public class ConditionOperators {
	/**IN*/
	public static final String IN = "in";
	/**LIKE**/
	public static final String LIKE = "like";
	/**小于*/
	public static final String LT = "lt";
	/**大于*/
	public static final String GT = "gt";
	/**不等于*/
	public static final String NE = "ne";
	/**等于*/
	public static final String EQ = "eq";
	/**小于等于*/
	public static final String LEQ = "leq";
	/**大于等于*/
	public static final String GEQ = "geq";
	/**升序*/
	public static final String ASC = "asc";
	/**倒序*/
	public static final String DESC = "desc";
	/**is null*/
	public static final String IS_NULL = "is null";
	/**is not null*/
	public static final String IS_NOT_NULL = "is not null";
	/**null判断*/
	public static final Integer NULL_JUDGE = 0;

	private ConditionOperators(){
		
	}
}
