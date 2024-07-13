// api/productApi.js

import axiosClient from "@/configs/axiosClient"
import axiosClientRecruiter from "@/configs/axiosRecruiter"
import { V3 } from "../linkLocal"

const bannersApi = {
  getBannersApi: (lang: string, order: string | null ) => {
    const URL = `/v1/banners/ena?v=1${order ? `&order=${order}`: ""}&lang=${lang}`
    return axiosClient.get(URL)
  },
  getBannerCompany: () => {
    const URL = `${V3}/api/v3/theme-companies/own`
    return axiosClientRecruiter.get(URL)
  },
  createBanner: (formData:any) => {
    const URL = `${V3}/api/v3/theme-companies`
    return axiosClientRecruiter.post(URL,formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        "Content-Type": "multipart/form-data"
      },
    })
  },
  updateBanner: (formData:any,id:any) => {
    const URL = `${V3}/api/v3/theme-companies/${id}`
    return axiosClientRecruiter.put(URL,formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        "Content-Type": "multipart/form-data"
      },
    })
  }
}

export default bannersApi
