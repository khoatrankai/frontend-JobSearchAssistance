import axiosClientRecruiter from "@/configs/axiosRecruiter";
import { V1,V3 } from "@/api/linkLocal";

const roleApi = {
  getRoleRecruiter: () => {
    const URL = `${V3}/api/v3/company-roles`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  
  
  
};
export default roleApi;
