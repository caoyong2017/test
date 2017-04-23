package com.getrag.vo.req.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.getrag.model.Condition;
import com.getrag.vo.req.RequestVO;

public class GetRegListByDayReq implements RequestVO {

	private Date date;
	/**调理师id*/
	private String massager;
	/**登记状态*/
	private Integer reg_status;
	/**排序*/
	private List<Condition> orders = new ArrayList<Condition>();
	
	private String shopId;
	
	public void setDate(Date date) {
		this.date = date;
	}

	public Date getDate() {
		return date;
	}

	public void setMassager(String massager) {
		this.massager = massager;
	}

	public String getMassager() {
		return massager;
	}

	public void setReg_status(Integer reg_status) {
		this.reg_status = reg_status;
	}

	public Integer getReg_status() {
		return reg_status;
	}

	public void setShopId(String shopId) {
		this.shopId = shopId;
	}

	public String getShopId() {
		return shopId;
	}

	public void setOrders(List<Condition> orders) {
		this.orders = orders;
	}

	public List<Condition> getOrders() {
		return orders;
	}
}
