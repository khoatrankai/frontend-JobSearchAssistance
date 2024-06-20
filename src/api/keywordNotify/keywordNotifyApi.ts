import axiosClient from '@/configs/axiosClient';
import { V1 } from '../linkLocal';



const keywordNotifyApi = {
  createKeyword: async(data: any) => {
    const URL = `${V1}/api/v1/notification/keyword`;
    return axiosClient.post(URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
    });
  },
  getListKeyword: async() => {
    const URL = `${V1}/api/v1/notification/keyword`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
    });
  },
  deleteKeyword: async(id:any) => {
    const URL = `${V1}/api/v1/notification/keyword/delete`;
    return await axiosClient.delete(URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },data:{
          keywordNotificationIds:[id]
        }
    });
  },
  changeStatusKeyword:async(id:any,status:any) => {
    const URL = `${V1}/api/v1/notification/keyword/update-status`;
    const dataReq:any =  {
      "id": id,
      "status": status
    }
    return await axiosClient.put(URL,dataReq, {
        headers: {
            'Authorization': `Bearer ${ localStorage.getItem('accessToken')}`
        }
    }
    );
  },

  

};

export default keywordNotifyApi;
