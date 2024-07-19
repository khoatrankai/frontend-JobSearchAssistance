import axiosClientRecruiter from "@/configs/axiosRecruiter";
import axiosClient from "@/configs/axiosRecruiter";

const profileAPi = {
  getProfileRecruiterV3: (lang: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/me?lang=${lang}`;

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  getProfileByAccountId: (lang: string, accountId: string) => {
    // unlock=${unclock}&
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/${accountId}?lang=${lang}&unlock=false`;
    axiosClientRecruiter.post('https://lending-advantage-pale-xp.trycloudflare.com/api/v3/view-profiles',{
      "profileId": accountId
    })
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  putProfileJobV3: (jobTypeId: number | null, isSearch: number | null) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/profiles/job`;
    return axiosClientRecruiter.put(
      URL,
      {
        jobTypeId,
        isSearch,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        },
      },
    ); // Truyền email vào body của request
  },
  recruitUpdatePassword: (
    newPassword: string,
    oldPassword: string,
    lang: string,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/users/recruit/update-password?lang=${lang}`;
    return axiosClientRecruiter.post(
      URL,
      {
        password: newPassword,
        oldPassword: oldPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        },
      },
    );
  },

  activityLog: () => {
    const URL = `/v1/application/total`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  activityLogRecruiter: () => {
    const URL = `/v1/application/total/recruiter`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
};
export default profileAPi;
