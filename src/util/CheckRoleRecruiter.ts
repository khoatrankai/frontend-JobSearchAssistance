"use client"
import { fetchProfileRecruiter } from '@/redux/reducer/profileReducer/profileSliceRecruiter';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useRouterCustom from './useRouterCustom/useRouterCustom';

type Props = {}

const CheckRoleRecruiter = () => {
    const accessToken = localStorage.getItem('accessTokenRecruiter')
    const {pushRouter} = useRouterCustom()       
      if (!accessToken) {
        pushRouter("/recruiter/login");
      }
  
}

export default CheckRoleRecruiter