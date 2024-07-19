// api/productApi.js


import axiosClientRecruiter from '@/configs/axiosRecruiter';

export interface FormCommunity {
  title: string;
  content: string;
  images: File[] | null;
}

export interface FormPutCommunity {
  title: string;
  content: string;
  type: number;
  images: string[];
  categoryId: string[];
  id: number;
  status: number;
}

export interface FormPostCommunityComment {
  communicationId: number;
  content: string;
  images: string[];
}

const communityApi = {
  postCommunications: (newCommunity: FormCommunity) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications`;
    return axiosClientRecruiter.post(URL, newCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteComent: (postId: any, cmtId: any) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-comments/${postId}/${cmtId}`;
    return axiosClientRecruiter.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCommunitations: (
    page: string,
    limit: string,
    sort: string,
    type: number,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications?page=${page}&limit=${limit}&sort=${sort}&type=${type}`;
    return axiosClientRecruiter.get(URL);
  },

  getCommunityNews: (
    page: string,
    limit: string,
    sort: string,
    type: number,
    lang: any,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/news?page=${page}&limit=${limit}&sort=${sort}&type=${type}&lang=${lang}`;
    return axiosClientRecruiter.get(URL);
  },

  getCommunityWorkingStory: () => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/working-story`;
    return axiosClientRecruiter.get(URL);
  },

  getCommunityTodayByAccount: (page: string, limit: string, sort: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/today/by-account?page=${page}&limit=${limit}&sort=${sort}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  getCommunityByAccount: (
    page: string,
    limit: string,
    sort: string,
    lang: any,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/by-account?page=${page}&limit=${limit}&sort=${sort}&lang=${lang}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  putCommunityByAccount: (id: number, putCommunity: FormPutCommunity) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/${id}`;
    return axiosClientRecruiter.put(URL, putCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCommunityToday: (page: string, limit: string, sort: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/today?page=${page}&limit=${limit}&sort=${sort}`;
    return axiosClientRecruiter.get(URL);
  },

  getCommunityShareId: (id: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/share/${id}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  getCommunityDetailId: (id: string, lang: any) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/detail/${id}?lang=${lang}`;
    return axiosClientRecruiter.get(URL);
  },

  // ---------------------------------------------------------------------------------------- ADMIN
  postCommunityByAdmin: (newCommunityAdmin: FormCommunity) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/by-admin`;
    return axiosClientRecruiter.post(URL, newCommunityAdmin, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  putCommunityByAdmin: (id: number, newCommunityAdmin: FormPutCommunity) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/by-admin/${id}`;
    return axiosClientRecruiter.put(URL, newCommunityAdmin, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // ---------------------------------------------------------------------------------------- lIKE

  postCommunityLike: (communicationId: number) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-likes`;
    return axiosClientRecruiter.post(
      URL,
      {
        communicationId: communicationId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },

  getCommunityLike: (id: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-likes/${id}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  // ---------------------------------------------------------------------------------------- Comment

  postCommunityCommentByAdmin: (
    newCommentCommunity: FormPostCommunityComment,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communications/by-admin`;
    return axiosClientRecruiter.post(URL, newCommentCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  postCommunityComment: (newCommentCommunity: FormPostCommunityComment) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-comments`;
    return axiosClientRecruiter.post(URL, newCommentCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCommunityComment: (id: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-comments/${id}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  putCommunityComment: (
    communicationId: number,
    commentId: number,
    putCommunityComment: FormPutCommunity,
  ) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-comments/${communicationId}/${commentId}`;
    return axiosClientRecruiter.put(URL, putCommunityComment, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // ---------------------------------------------------------------------------------------- bookmarked

  postCommunityBookmarked: (communicationId: number) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-bookmarked`;
    return axiosClientRecruiter.post(
      URL,
      {
        communicationId: communicationId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },

  getCommunityBookmarked: (page: number) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/communication-bookmarked?page=${page}`;
    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
};

export default communityApi;
