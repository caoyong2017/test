package com.getrag.vo.req.impl;

import com.getrag.model.Page;
import com.getrag.vo.req.RequestVO;

public class PageReqVO implements RequestVO {

	/**分页*/
	private Page page;

	public void setPage(Page page) {
		this.page = page;
	}

	public Page getPage() {
		return page;
	}
}
