import { fetchProfileRecruiter } from '@/redux/reducer/profileReducer/profileSliceRecruiter';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DelayCustom from './DelayCustom';

type Props = {}

const CheckLoginRecruiter = () => {

  const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profileRecruiter.profile);
    const accessToken = localStorage.getItem('accessTokenRecruiter')
    const {useDebounce} = DelayCustom()
    //console.log(accessToken)
    const router = useRouter();
    const checkLogin =()=>{
      console.log(profile)
      if(Object.keys(profile).length > 0){
        const backUrl = localStorage.getItem('backurlrecruiter')
        console.log(backUrl)
        if(backUrl){
          router.push(backUrl)
          localStorage.removeItem('backurlrecruiter')
        }else{
          router.push('/recruiter')
        }
      }
    }
    const handleDebounce = useDebounce(checkLogin,200)

    useEffect(() => {       
      if(accessToken){
        if(Object.keys(profile).length === 0){
          dispatch(fetchProfileRecruiter("vi") as any);
         }
        handleDebounce()
      }
    }, [accessToken,profile]);
  
}

export default CheckLoginRecruiter