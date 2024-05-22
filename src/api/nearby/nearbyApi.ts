import axiosClient from '@/configs/axiosClient';

const nearByApi = {
  getNearByJob: (
    // pvId: any[] | null,
    // pcid: number | null,
    // ccid: number | null,
    limit: Number,
    page: Number | null,
    search?: string,
  ) => {
    const URL =search ?`/v1/posts/nearby?`+
    `limit=${limit}&page=${page ? page : ''}&search=${search}` :
      `/v1/posts/nearby?`+
      `limit=${limit}&page=${page ? page : ''}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};

export default nearByApi;
