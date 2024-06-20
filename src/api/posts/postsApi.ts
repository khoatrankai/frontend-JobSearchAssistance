import axiosClient from '@/configs/axiosClient';
import axiosClientRecruiter from '@/configs/axiosRecruiter';
import { V3 } from '../linkLocal';

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
    // //console.log(page)
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
  getPostHot: (
  ) => {
    const URL = `${V3}/api/v3/posts/hot?limit=3`;
    return axiosClient.get(URL);
  },

  getPostbyId: (params: number, lang: string) => {
    const URL = `/v1/posts/${params}?lang=${lang}`;
    return axiosClient.get(URL);
  },
  getPostRecruiterbyId: (params: number, lang: string) => {
    const URL = `/v1/posts/${params}?lang=${lang}`;
    return axiosClientRecruiter.get(URL);
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
  createPost: async(newPost: any,des:any) => {
    // //console.log(des)
    const URL = `v1/posts`
    const dataPost:any = await axiosClientRecruiter.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    if(dataPost){
      const listCV = await axiosClientRecruiter.get(`${V3}/api/v3/cvs-posts/cvs?postId=${dataPost.data.postId}`)
      if(listCV){
        // //console.log(listCV)
        const urlAI = 'http://127.0.0.1:8000/aiFilterCV/'
        // //console.log(des,listCV.data.data.cvs)
        const dataFilterCV = await axiosClientRecruiter.post(urlAI,{contentPost: des,listCV: listCV.data.data[0].cvs})
        if(dataFilterCV){
          // //console.log(dataFilterCV)
          const urlMapLoad = `${V3}/api/v3/cvs-posts`
          const dataUpdate = await axiosClientRecruiter.post(urlMapLoad,{data: dataFilterCV.data.map((dt:any)=>{
            return{...dt,postId:dataPost.data.postId,type:1}
          })})
          return dataUpdate
        }
      }
      
    }
    // return 0
  },
  ownPost: ()=>{
    const URL = `v1/posts/own`
    return axiosClientRecruiter.get(URL,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateStatus: (id:any,status:any)=>{
    const URL = `v1/posts/sta`
    return axiosClientRecruiter.put(URL,{id:id,status:status},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`
      },
    })
  }

};

export default postsApi;
