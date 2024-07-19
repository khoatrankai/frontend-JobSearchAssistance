// import ToastCustom from '@/util/ToastCustom';
import axiosClient from '../../configs/axiosClient';
import { V1 } from '../linkLocal';

const profileAPi = {

  uploadAvatar: async(data:any)=>{
    // const {hdError,hdSuccess} = ToastCustom()
    const formData = new FormData()
    formData.append('images',data)
    const dataRes:any = await axiosClient.put(`${V1}/api/v1/profiles/avt`,formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return dataRes
  },
  getProfileV3: (lang: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/me?lang=${lang}`;

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  getProfileByAccountId: (lang: string, accountId: string) => {
    // unlock=${unclock}&
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/${accountId}?lang=${lang}&unlock=false`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  putProfileJobV3: (jobTypeId: number | null, isSearch: number | null) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/job`;
    return axiosClient.put(
      URL,
      {
        jobTypeId,
        isSearch,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    ); // Truyền email vào body của request
  },
  putSearchProfileJobV3: (cvIds: any | null, isSearch: number | null) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/job`;
    if(cvIds){
      return axiosClient.put(
        URL,
        {
          cvIds:cvIds,
          isSearch,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
    }else{
      return axiosClient.put(
        URL,
        {
          cvIds:[],
          isSearch:isSearch,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
    }
    // Truyền email vào body của request
  },

  recruitUpdatePassword: (
    newPassword: string,
    oldPassword: string,
    lang: string,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/users/recruit/update-password?lang=${lang}`;
    return axiosClient.post(
      URL,
      {
        password: newPassword,
        oldPassword: oldPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },

  activityLog: () => {
    const URL = `/v1/application/total`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  activityLogRecruiter: () => {
    const URL = `/v1/application/total/recruiter`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  deleteAccount : (email:any)=>{
    const URL = `/v1/disable`;
    return axiosClient.post(URL,
      {
        email: email
      }
      , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }
};
export default profileAPi;
