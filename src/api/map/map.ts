import axiosClientRecruiter from '@/configs/axiosRecruiter';
import axiosClient from '../../configs/axiosClient';
import { V3 } from '../linkLocal';

const mapApi = {
  
  getMapLocation: async(addForMapbox:any,accessToken: any) => {
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addForMapbox}/forward.json?access_token=${accessToken}`;
    return await axiosClient.get(
      URL
    );
  },
  getSearchMapLocation: async(dataReq:any,dataLocation: any,page:any) => {
    const URL = `${V3}/api/v3/posts/post/gps?latitude=${dataLocation?.latitude}&longitude=${dataLocation?.longitude}&maxRadius=${dataLocation?.radius+0.5 ?? null}&salary_min=${dataReq?.salary_min ?? null}&salary_max=${dataReq?.salary_max??null}&money_type=${dataReq?.money_type??null}&jobTypeId=${dataReq.jobTypeId}${dataReq.category_ids === undefined ?'': dataReq?.category_ids?.map((dt:any)=>{
      return `&category_ids=${dt}`
    }).join("")}&page=${page??1}&limit=12`;
    return await axiosClient.get(
      URL
    );
  },
};

export default mapApi;
