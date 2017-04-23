package com.zyg.security.md5;  
  
import java.io.UnsupportedEncodingException;  
import java.security.NoSuchAlgorithmException;  
import java.util.HashMap;  
import java.util.Map;  
  
public class Client {  
    private static Map users = new HashMap();  
    private static final String HEX_NUMS_STR="0123456789ABCDEF";  
    private static final Integer SALT_LENGTH = 12;  
    public static void main(String[] args){  
    	String inStr ="E10ADC3949BA59ABBE56E057F20F883E";
    	  
    	      System.out.println(hexStringToByte(inStr).toString());
    }  
    /**   
     * 将16进制字符串转换成字节数组   
     * @param hex   
     * @return   
     */  
    public static byte[] hexStringToByte(String hex) {   
        int len = (hex.length() / 2);   
        byte[] result = new byte[len];   
        char[] hexChars = hex.toCharArray();   
        for (int i = 0; i < len; i++) {   
            int pos = i * 2;   
            result[i] = (byte) (HEX_NUMS_STR.indexOf(hexChars[pos]) << 4    
                            | HEX_NUMS_STR.indexOf(hexChars[pos + 1]));   
        }   
        return result;   
    }   
  

    /** 
     * 加密解密算法 执行一次加密，两次解密 
     */   
    public static String convertMD5(String inStr){  
  
        char[] a = inStr.toCharArray();  
        for (int i = 0; i < a.length; i++){  
            a[i] = (char) (a[i] ^ 't');  
        }  
        String s = new String(a);  
        return s;  
  
    }  
    /** 
     * 注册用户 
     *  
     * @param userName 
     * @param password 
     */  
    public static void registerUser(String userName,String password){  
        String encryptedPwd = null;  
        try {  
            encryptedPwd = MyMD5Util.getEncryptedPwd(password);  
              
            users.put(userName, encryptedPwd);  
              
        } catch (NoSuchAlgorithmException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        } catch (UnsupportedEncodingException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
    }  
      
    /** 
     * 验证登陆 
     *  
     * @param userName 
     * @param password 
     * @return 
     * @throws UnsupportedEncodingException  
     * @throws NoSuchAlgorithmException  
     */  
    public static boolean loginValid(String userName,String password)   
                throws NoSuchAlgorithmException, UnsupportedEncodingException{  
        String pwdInDb = (String)users.get(userName);  
        if(null!=pwdInDb){ // 该用户存在  
                return MyMD5Util.validPassword(password, pwdInDb);  
        }else{  
            System.out.println("不存在该用户！！！");  
            return false;  
        }  
    }  
}  