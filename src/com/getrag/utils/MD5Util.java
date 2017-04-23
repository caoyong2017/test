package com.getrag.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * md5工具类
 * @author zhaolianqi
 * 2016-10-27 下午03:43:35
 */
public class MD5Util {
	
	/**
	 * 将一个字符串加密成一个md5字符串
	 * @param input 要加密的字符串
	 * @return 加密后的字符串
	 */
    public static String string2MD5(String input) {
        MessageDigest messageDigest;
		try {
			messageDigest = MessageDigest.getInstance("MD5");
			byte[] inputByteArray = input.getBytes();
			messageDigest.update(inputByteArray);
			byte[] resultByteArray = messageDigest.digest();
			return byteArrayToHex(resultByteArray);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
    }

    /**
     * 将字节数组的内容转成16进制的字符串
     * @param byteArray 字节数组
     * @return 转换后的16进制字符串
     */
    public static String byteArrayToHex(byte[] byteArray) {
        char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        char[] resultCharArray = new char[byteArray.length * 2];
        int index = 0;
        for (byte b : byteArray) {
            resultCharArray[index++] = hexDigits[b >>> 4 & 0xf];
            resultCharArray[index++] = hexDigits[b & 0xf];
        }
        return new String(resultCharArray);
    }
}
