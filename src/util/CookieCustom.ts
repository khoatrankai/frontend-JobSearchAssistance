import React from 'react'
import { getCookie,setCookie } from '@/cookies'; 
import { signOut } from 'next-auth/react';
import { fetchProfileRecruiter } from '@/redux/reducer/profileReducer/profileSliceRecruiter';
import { fetchProfile } from '@/redux/reducer/profileReducer/profileSlice';
import { useDispatch } from 'react-redux';
import useRouterCustom from './useRouterCustom/useRouterCustom';
const CookieCustom = () => {
    const dispatch = useDispatch()
    const {pushRouter} = useRouterCustom()
    function setCookieCustom(name:any, value:any) {

        localStorage.setItem(name, JSON.stringify(value));
        
    }
    function getCookie(name:any) {

        const data:any = localStorage.getItem(name);
        return JSON.parse(data)

    }
    const removeCookie= (name:any)=>{
        localStorage.removeItem(name)
       
        
    }
    const signOutUser= ()=>{
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accountId')
        localStorage.removeItem('accessToken')
        signOut()
        dispatch(fetchProfile("vi") as any);
        pushRouter('/')
        
    }
    const signOutRecruiter= ()=>{
        localStorage.removeItem('refreshTokenRecruiter')
        localStorage.removeItem('accountIdRecruiter')
        localStorage.removeItem('accessTokenRecruiter')
        dispatch(fetchProfileRecruiter("vi") as any);
        pushRouter('/recruiter')
    
    }
   
 return {setCookieCustom,getCookie,signOutUser,signOutRecruiter,removeCookie}
}

export default CookieCustom