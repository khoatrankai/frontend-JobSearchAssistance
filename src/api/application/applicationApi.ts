import axiosClientRecruiter from '@/configs/axiosRecruiter';
import axiosClient from '../../configs/axiosClient';

const applicationApi = {
  updateApplication: (id: number, status: number,description=null) => {
    const URL = `/v1/application/update`;
    if(description){
      return axiosClientRecruiter.put(
        URL,
        {id, status,description},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
          },
        },
      );
    }
    return axiosClientRecruiter.put(
      URL,
      {id, status},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        },
      },
    );
  },
  applyAplication: (postId: Number) => {
    const URL = `/v1/application/create`;
    return axiosClient.post(
      URL,
      {postId},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },
  getRecruiterAplication: (post_id:any,application_id: Number) => {
    const URL = `/v1/history/recruiter/${post_id}/applications/${application_id}`;
    return axiosClientRecruiter.get(
      URL,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        },
      },
    );
  },
};

export default applicationApi;
