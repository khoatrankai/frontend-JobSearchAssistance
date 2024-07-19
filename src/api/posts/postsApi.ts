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
      `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/posts/newest?` +
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
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/posts/${id}?lang=${lang}`;
    return axiosClient.get(URL);
  },
  getPostV3Recruiter: (id: number, lang: string) => {
    const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/posts/${id}?lang=${lang}`;
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
  updatePostedInfo: async(updatePost: any,des:any,postId:any) => {
    const URL = `/v1/posts/inf`
    const deleteRes:any = await axiosClientRecruiter.delete(`${V3}/api/v3/cvs-posts`,{data:{type: 1,postId:postId}})

    if(deleteRes?.statusCode === 200){
      const res = await axiosClientRecruiter.put(URL, updatePost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
          ' Content-Type': 'multipart/form-data',
        },
      })
      if(res){
        const listCV = await axiosClientRecruiter.get(`${V3}/api/v3/cvs-posts/cvs?postId=${postId}`)
        if(listCV){
          const urlAI = 'https://aitraining.onrender.com/aiFilterCV/'
          const dataFilterCV = await axiosClientRecruiter.post(urlAI,{contentPost: des,listCV: listCV.data.data[0].cvs})
        
          if(dataFilterCV){
            const urlMapLoad = `${V3}/api/v3/cvs-posts`
            const dataUpdate = await axiosClientRecruiter.post(urlMapLoad,{data: dataFilterCV.data.map((dt:any)=>{
              return{...dt,type:1,postId:postId}
            })})
            return {...dataUpdate,postId:postId,code:200}
          } 
        }
        
      }
    }
    return {code:403}
   
  },
  updatePostedInfoNoAI: async(updatePost: any,des:any,postId:any) => {
    const URL = `/v1/posts/inf`
    const deleteRes:any = await axiosClientRecruiter.delete(`${V3}/api/v3/cvs-posts`,{data:{type: 1,postId:postId}})

    if(deleteRes?.statusCode === 200){
      const res = await axiosClientRecruiter.put(URL, updatePost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
          ' Content-Type': 'multipart/form-data',
        },
      })
      return res
    }
    return {code:403}
      
    

   
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
        const urlAI = 'https://aitraining.onrender.com/aiFilterCV/'
        // //console.log(des,listCV.data.data.cvs)
        const dataFilterCV = await axiosClientRecruiter.post(urlAI,{contentPost: des,listCV: listCV.data.data[0].cvs})
        if(dataFilterCV){
          // //console.log(dataFilterCV)
          const urlMapLoad = `${V3}/api/v3/cvs-posts`
          const dataUpdate = await axiosClientRecruiter.post(urlMapLoad,{data: dataFilterCV.data.map((dt:any)=>{
            return{...dt,postId:dataPost.data.postId,type:1}
          })})
          return {...dataUpdate,postId:dataPost.data.postId}
        }
      }
      
    }
    // return 0
  },
  createPostNoAI : async(newPost: any,des:any) => {
    // //console.log(des)
    const URL = `v1/posts`
    const dataPost:any = await axiosClientRecruiter.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return dataPost
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
  },
  deletePost: (id:any)=>{
    const URL = `${V3}/api/v3/posts/by-user/${id}`
    return axiosClientRecruiter.delete(URL,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`
      },
    })
  }
};

export default postsApi;
