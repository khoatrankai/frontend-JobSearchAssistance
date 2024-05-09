import axiosClient from '@/configs/axiosClient';
import axiosClientRecruiter from '@/configs/axiosRecruiter';

const postsApi = {
  getPostNewestV3: (
    childrenCategoryId: number[] | null,
    parentCategoryId: number | null,
    districtIds: any[] | null,
    provinceId: number | null,
    limit: number | null,
    threshold: number | null,
    lang: string,
    page: number | null
  ) => {
    console.log(page)
    const URL =
      `http://localhost:1902/api/v3/posts/newest?` +
      `${
        childrenCategoryId
          ? `${childrenCategoryId
              ?.map((n: any, index) => `childrenCategoryId=${n}`)
              .join('&')}&`
          : ``
      }` +
      `${
        parentCategoryId && parentCategoryId !== 1
          ? `&parentCategoryId=${parentCategoryId}&`
          : ``
      }` +
      `${
        districtIds
          ? `${districtIds
              ?.map((n: any, index) => `districtIds=${n}`)
              .join('&')}&`
          : ``
      }` +
      `${provinceId ? `provinceId=${provinceId}&` : ``}` +
      `limit=${limit}${threshold ? `&threshold=${threshold}` : ``}` +
      `&lang=${lang}` + `&page=${page}` ;
    return axiosClient.get(URL);
  },

  getPostbyId: (params: number, lang: string) => {
    const URL = `/v1/posts/${params}?lang=${lang}`;
    return axiosClient.get(URL);
  },

  getPostByThemeId: (
    themeId: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string,
    page:number | null
  ) => {
    const URL = `v1/posts/theme?${
      themeId ? `tid=${themeId}&` : `tid=1&`
    }limit=${limit}${threshold ? `&threshold=${threshold}` : ``}&lang=${lang}`+ `&page=${page}`;
    return axiosClient.get(URL);
  },

  getPostV3: (id: number, lang: string) => {
    const URL = `http://localhost:1902/api/v3/posts/${id}?lang=${lang}`;
    return axiosClientRecruiter.get(URL);
  },
  updateStatusPost: (id: number, status: number) => {
    const URL = `/v1/posts/sta`;
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
  updatePostedInfo: (updatePost: any) => {
    const URL = `/v1/posts/inf`

    return axiosClientRecruiter.put(URL, updatePost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        ' Content-Type': 'multipart/form-data',
      },
    })
  },
  createPost: (newPost: any) => {
    const URL = `v1/posts`
    return axiosClientRecruiter.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },

};

export default postsApi;
