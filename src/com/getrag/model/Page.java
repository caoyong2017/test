package com.getrag.model;

import java.util.ArrayList;
import java.util.List;

public class Page<E> {

	/**当前页，从0开始*/
	private Integer pageNo = 1;
	/**一页多少条记录*/
	private Integer pageSize = 10;
	/**总数*/
	private Long totalCount = 0l;
	/**总页数*/
	private Integer totalPage;
	/**排序条件*/
	private List<Condition> orders = new ArrayList<Condition>();
	/**查询条件*/
	private List<Condition> conditions = new ArrayList<Condition>();
	/**结果集*/
	private List<E> results;
	
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}
	public Integer getTotalPage() {
		if (totalPage == null && totalCount != null && pageSize != null){
			totalPage = (int) ((totalCount+pageSize - 1) / pageSize);
		}
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public void setResults(List<E> results) {
		this.results = results;
	}
	public List<E> getResults() {
		return results;
	}
	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}
	public List<Condition> getConditions() {
		return conditions;
	}
	public void setOrders(List<Condition> orders) {
		this.orders = orders;
	}
	public List<Condition> getOrders() {
		return orders;
	}
	
}
