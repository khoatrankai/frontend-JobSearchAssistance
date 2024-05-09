import axiosClientRecruiter from "@/configs/axiosRecruiter";
import { V1,V3 } from "@/api/linkLocal";

const DashboardApi = {
  getAnalyticViewers: (lang: string) => {
    const URL = `${V3}/api/v3/profiles/recruiter/analyst/viewd`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  getViewsMonth : (month:any) =>{
    const URL = `${V3}/api/v3/profiles/recruiter/analyst/viewd/month/${month}`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  getAnalyticApplications: () => {
    const URL = `${V3}/api/v3/profiles/recruiter/analyst/applications`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  getDetailMonth : (month:any) =>{
    const URL = `${V3}/api/v3/profiles/recruiter/analyst/applications/month/${month}`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  getDetailPercent : () =>{
    const URL = `${V3}/api/v3/profiles/recruiter/analyst/percents`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  
};
export default DashboardApi;
