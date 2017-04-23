package com.getrag.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.util.PropertyFilter;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSON;
import com.getrag.bean.Role;

public class ManagerUtil {
	private static final String[] allowTypes = {"String", "Date", "Integer","int", "Long","long", "byte"};//复制对象属性所允许的类型
	private ManagerUtil(){}
	private static Logger log = Logger.getLogger(ManagerUtil.class);
	
	
	/**
	 * 获取密码字符串加密后的值
	 * @param pwd
	 * @return
	 */
	public static String getPasswordEncod(String pwd){
		return MD5Util.string2MD5(pwd);
	}
	
	/**
	 * 将一个对象里面的属性的值赋值到另一个对象里面相同的属性上，不包括null
	 * <br>（将bean转换成对应的dto对象）
	 * @param <T> 
	 * @param <E> 
	 * @param t 要转换的bean对象(from)
	 * @param e 对应的dto对象(to)
	 */
	public static <T, E> void beanTrans2Dto(T t, E e){
		ManagerUtil.beanTrans2Dto(t, e, false);
	}
	
	/**
	 * 将一个对象里面的属性的值赋值到另一个对象里面相同的属性上
	 * <br>（将bean转换成对应的dto对象）
	 * @param <T>
	 * @param <E>
	 * @param t 要转换的bean对象(from)
	 * @param e 对应的dto对象(to)
	 * @param keepNull 是否转换null值，true:转换，false:不转
	 */
	public static <T, E> void beanTrans2Dto(T t, E e, boolean keepNull){
		if (t == null)
			return;
		Method[] tms = t.getClass().getMethods();
        Method[] tes = e.getClass().getMethods();
        boolean canContinue = false;
        String returnType = "";
        Object value = null;
        for(Method m1:tms){
        	returnType = m1.getReturnType().toString();
            if(m1.getName().startsWith("get") && !returnType.startsWith("interface") && constainsType(allowTypes, returnType)){
            	String mNameSubfix=m1.getName().substring(3);
                String forName="set"+mNameSubfix;
                for(Method m2:tes){
                    if(m2.getName().equals(forName)){
                        // 如果类型一致，或者m2的参数类型是m1的返回类型的父类或接口
                        canContinue = m2.getParameterTypes()[0].isAssignableFrom(m1.getReturnType());
                        if (canContinue) {
                            try {
                            	value = m1.invoke(t);
                            	if (value != null || keepNull)
                            		m2.invoke(e, value);
                                break;
                            } catch (InvocationTargetException ex) {
                                ex.printStackTrace();
                            } catch (IllegalAccessException ex) {
								ex.printStackTrace();
							} catch (IllegalArgumentException ex) {
								ex.printStackTrace();
							}
                        }
                    }
                }
            }
        }
	}
	/**
	 * 检查属性类型是不是所允许的类型
	 * @param types
	 * @param type
	 * @return
	 */
	private static boolean constainsType(String[] types, String type){
		if (StringUtils.isEmpty(type))
			return false;
		for (String s : types)
			if (type.endsWith(s))
				return true;
		return false;
	}
	
	/**
	 * 生成昵称
	 * @return
	 */
	public static String generateNickName(){
		return "lg" + (1000000 + (int)(Math.random() * 9000000));//随机生成一个昵称，规则：xrh+7位数字
	}
	
	/**
	 * 检查对象指定的属性里面有没有为空的属性<br>
	 * 例子：检查user对象的age、nickname属性是否为空：ManagerUtil.checkFieldsNull(user, "age", "nickname");<br>
	 * 注意：只要有任意一个属性为空，就返回true，整个对象为null也返回true
	 * @param obj 指定对象
	 * @param fields 属性名称列表
	 * @return
	 */
	public static boolean checkFieldsNull(Object obj, String... fields){
		if (obj == null)
			return true;
		boolean re = false;
		Field[] fd = obj.getClass().getDeclaredFields();
		for (Field fd1 : fd){
			for (String fd2 : fields){
				if (fd1.getName().equals(fd2)){
					fd1.setAccessible(true);
					try {
						if (StringUtils.isEmpty(fd1.get(obj)))
							return true;
					} catch (IllegalArgumentException e) {
						log.error(e);
					} catch (IllegalAccessException e) {
						log.error(e);
					}
					break;
				}
			}
		}
		return re;
	}
	
	/**
	 * 将结果以输出流的方式写入到客户端
	 * @param response
	 * @param obj
	 */
	public static void writeResultByStream(HttpServletResponse response, Object obj){
		writeResultByStream(response, obj, null);
	}
	
	/**
	 * 将结果以输出流的方式写入到客户端
	 * @param response
	 * @param obj
	 * @param jsonConfig 
	 */
	public static void writeResultByStream(HttpServletResponse response, Object obj, PropertyFilter filter){
		response.setHeader("Content-type", "text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.write(JSON.toJSONString(obj));
		} catch (IOException e) {
			log.error(e);
		} finally {
			if (writer != null)
				writer.close();
		}
	}
	
	/**
	 * 是否具备某个权限
	 * @param roleList 用户的权限列表
	 * @param roleId 指定的权限id
	 * @return
	 */
	public static boolean checkPermission(List<Role> roleList, String roleId){
		if (StringUtils.isEmpty(roleId))
			return false;
		if (roleList == null || roleList.size() == 0)
			return false;
		for (Role r : roleList){
			if (roleId.equals(r.getId()))
				return true;
		}
		return false;
	}
	
}

