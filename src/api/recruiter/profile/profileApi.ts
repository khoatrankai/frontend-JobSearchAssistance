import axiosClientRecruiter from "@/configs/axiosRecruiter";
import { V1,V3 } from "@/api/linkLocal";

const profileApi = {
  getProfile: () => {
    const URL = `${V3}/api/v3/companies/account`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  postProfile: async(id:any,data:any) => {

    const URL = `${V3}/api/v3/companies/${id}`;

    return axiosClientRecruiter.patch(URL,data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        "Content-Type": "multipart/form-data"
      },
    });
  },
  getCompanySize: () => {
    const URL = `${V3}/api/v3/company-sizes`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  getCompanyCategory: () => {
    const URL = `${V1}/api/v1/categories/p`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  }
  
  
};
export default profileApi;
