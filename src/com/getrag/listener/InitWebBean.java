package com.getrag.listener;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitWebBean implements InitializingBean {

	private final Logger LOG = Logger.getLogger(InitWebBean.class);
	@Autowired
	//private ConstantService constantService;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		LOG.info("==============================================================================");
		LOG.info("预加载系统常量......");
		LOG.info("==============================================================================");
		//constantsHandle(constantService.getAll());
	}
	
	/**
	 * 将常量进行分类缓存起来
	 * @param constants 常量列表
	 *//*
	private void constantsHandle(List<Constant> constants){
		for (Constant con : constants){
			if (con.getParent() != null && con.getParent().getId() == ConstantData.Constant.ROOM_TYPE){
				ROOM_TYPES.add(con);
			}
		}
	}*/
}
