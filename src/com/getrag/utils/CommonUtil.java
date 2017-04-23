package com.getrag.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;

import sun.misc.BASE64Encoder;


/**
 * 工具类
 * 
 * @author zhanghong
 */
public class CommonUtil {
	
	/**
	 * 获取异常详细信息
	 * 
	 * @param t
	 * @return
	 * @throws IOException
	 */
	public static String getExpDetail(Throwable t) {
		if (t == null)
			return null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			t.printStackTrace(new PrintStream(baos));
		} finally {
			try {
				baos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return baos.toString();
	}
	
	/**
	 * 该方法将一个图片转换成base64字符串
	 * @param in
	 * @return
	 */
	public static String imgToBase64Str(InputStream in) {
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int len = 0;
			while ((len = in.read(buf)) != -1){
				bos.write(buf, 0, len);
			}
			BASE64Encoder encoder = new BASE64Encoder();
			return encoder.encode(bos.toByteArray());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (in != null)
					in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	/**
	 * 判断字符串数组是否包含某一个字符串
	 * @param arr 字符串数组
	 * @param str 要检测的字符串
	 * @return
	 */
	public static boolean strArrContains(String[] arr, String str){
		if (arr == null || arr.length == 0)
			return false;
		for (String s : arr){
			if (s.equals(str))
				return true;
		}
		return false;
	}
	
	public static String getPrefix(String fileName){
		return fileName.substring(fileName.lastIndexOf(".")+1);
	}
	
	/**
	 * 
	 * 替换url中的参数值
	 *
	 * @author zhanghong
	 * @date 2015年12月15日下午4:48:05
	 * @param url 旧的url
	 * @param paramName 参数名称
	 * @param newParamVal 新的参数值
	 * @return
	 */
	public static String replaceUrlParam(String url,String paramName,String newParamVal){
		if(StringUtils.isNotBlank(url)) {  
			url = url.replaceAll("(" + paramName +"=[^&]*)", paramName + "=" + newParamVal);  
        }  
        return url;  
	}
	
	/**
	 * 将json字符串转换成java对象
	 * @param <T>
	 * @param jsonStr 要转换的json字符串
	 * @param clas java 对象class
	 * @return
	 */
	public static <T> T jsonSting2JavaObj(String jsonStr, Class<T> clas){
		return JSON.toJavaObject(JSON.parseObject(jsonStr), clas);
	}
}
