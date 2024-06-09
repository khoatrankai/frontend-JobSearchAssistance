import React from 'react'
import { getCookie,setCookie } from '@/cookies'; 

const CookieCustom = () => {
    function setCookieCustom(name:any, value:any) {

        // const date = new Date();
        // date.setFullYear(date.getFullYear() + 10); // Đặt thời gian hết hạn là 10 năm sau
        // const expires = "expires=" + date.toUTCString();
        // document.cookie = name + "=" + (valueJson || "") + ";" + expires + ";path=/";
        localStorage.setItem(name, JSON.stringify(value));
        
    }
    function getCookie(name:any) {
        // const nameEQ = name + "=";
        // const ca = document.cookie.split(';');
        // for (let i = 0; i < ca.length; i++) {
        //     let c = ca[i];
        //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        //     if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        // }
        // return null;
        const data:any = localStorage.getItem(name);
        return JSON.parse(data)

    }
 return {setCookieCustom,getCookie}
}

export default CookieCustom