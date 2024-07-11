import axiosClient from '@/configs/axiosClient'
import axios from 'axios'
import { V3,V1 } from './linkLocal'

const loadingserverApi = {
  loading: async() => {
    const res1 = await axiosClient.get(`${V3}/api/v3/company-roles`)
    const res2 = await axiosClient.get(`${V1}/api/v1/categories`)
    const res3 = await axiosClient.get(`https://train-django.onrender.com/jobFit`)
    if(res1 && res2 && res3){
        return true
    }
    return false
    // const res1 = await axiosClient.get(`${V3}/api/v3/level-types`)
  },

 
}

export default loadingserverApi

