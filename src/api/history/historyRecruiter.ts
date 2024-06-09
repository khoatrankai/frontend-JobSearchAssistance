import axiosClient from '@/configs/axiosClient';
import axiosClientRecruiter from '@/configs/axiosRecruiter';

// api/productApi.js
const historyRecruiter = {
  getAllPosted: (
    page: number | null,
    limit: number,
    status: number | null,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/posts?threshold=${page}&limit=${limit}&status=${status}&lang=${lang}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  GetAllApplicationsOfAJob: (
    post_id: number,
    limit: number,
    threshold: number | null,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/${post_id}/applications?${
      threshold ? `threshold=${threshold}` : ''
    }limit=${limit}&lang=${lang}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  GetInformationAndCandidatesCount: (
    threshold: number,
    limit: number,
    status: string,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/applications?threshold=${threshold}&limit=${limit}&status=${status}&lang=${lang}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  GetAJobApplication: (
    post_id: number,
    application_id: string,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/${post_id}/applications/${application_id}?lang=${lang}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  }
  ,
  getApplicationAll:(postId:any)=>{
    const URL = `v1/history/recruiter/${postId}/applications?page=0&limit=100`
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    })
  }
};
export default historyRecruiter;
