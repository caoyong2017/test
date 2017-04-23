package com.getrag.listener;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.getrag.constants.ConstantData;

/**
 * Application Lifecycle Listener implementation class OnlineCounter
 *
 */
public class OnlineCounter implements HttpSessionListener {

    /**
     * Default constructor. 
     */
    public OnlineCounter() {
        // TODO Auto-generated constructor stub
    }

	/**
     * @see HttpSessionListener#sessionCreated(HttpSessionEvent)
     */
    public void sessionCreated(HttpSessionEvent event)  {
		ServletContext context = event.getSession().getServletContext();
		Integer count = (Integer) context.getAttribute(ConstantData.ONLINE_COUNTER_KEY);
		if (count == null)
			count = 0;
		count += 1;
		context.setAttribute(ConstantData.ONLINE_COUNTER_KEY, count);
    }

	/**
     * @see HttpSessionListener#sessionDestroyed(HttpSessionEvent)
     */
    public void sessionDestroyed(HttpSessionEvent event)  {
    	ServletContext context = event.getSession().getServletContext();
    	Integer count = (Integer) context.getAttribute(ConstantData.ONLINE_COUNTER_KEY);
    	if (count != null && count > 0){
    		count -= 1;
    		context.setAttribute(ConstantData.ONLINE_COUNTER_KEY, count);
    	}
    }
	
}
