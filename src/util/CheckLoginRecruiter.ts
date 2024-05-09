import { fetchProfileRecruiter } from '@/redux/reducer/profileReducer/profileSliceRecruiter';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {}

const CheckLoginRecruiter = () => {
    // const profile = useSelector((state: any) => state.profile.profile);
  //   const dispatch = useDispatch();

  // const profile = useSelector((state: any) => state.profileRecruiter.profile);
  // useEffect(() => {
  //   dispatch(fetchProfileRecruiter("vi") as any);
  // }, []);
  // useEffect(() => {
    
  // }, [profile]);
    const accessToken = localStorage.getItem('accessTokenRecruiter')
    const router = useRouter();
    useEffect(() => {       
       
      if (accessToken) {
        router.push("/recruiter");
      }
    }, []);
  
}

export default CheckLoginRecruiter