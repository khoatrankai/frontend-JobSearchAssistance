import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DelayCustom from './DelayCustom';
import { fetchProfile } from '@/redux/reducer/profileReducer/profileSlice';

type Props = {}

const CheckPageLogin = () => {
  const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profile.profile);
    const accessToken = localStorage.getItem('accessToken')
    const {useDebounce} = DelayCustom()
    //console.log(accessToken)
    const router = useRouter();
    const checkLogin =()=>{
      console.log(profile)
      if(Object.keys(profile).length > 0){
        const backUrl = localStorage.getItem('backurl')
        console.log(backUrl)
        if(backUrl){
          router.push(backUrl)
          localStorage.removeItem('backurl')
        }else{
          router.push('/')
        }
      }
    }
    const handleDebounce = useDebounce(checkLogin,200)

    useEffect(() => {       
      if(accessToken){
        if(Object.keys(profile).length === 0){
          dispatch(fetchProfile("vi") as any);
         }
        handleDebounce()
      }
    }, [accessToken,profile]);
  
}

export default CheckPageLogin