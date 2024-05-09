import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

type Props = {}

const CheckPageLogin = () => {
    // const profile = useSelector((state: any) => state.profile.profile);
    const accessToken = localStorage.getItem('accessToken')
    console.log(accessToken)
    const router = useRouter();
    useEffect(() => {       
       
      if (accessToken) {
        router.push("/");
      }
    }, []);
  
}

export default CheckPageLogin