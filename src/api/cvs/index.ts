import axiosClient from "@/configs/axiosClient"
import { V1,V3 } from "../linkLocal"
import axiosClientRecruiter from "@/configs/axiosRecruiter";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";
const cvsApi = {
    totalPosts: async(dataLoad:any,dataForm:any,cvIndex:any) => {
        let result = true
        const delete1 = (await axiosClient.delete(
            "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-information",
            { data: { cvindex: cvIndex } } as any
          )) as unknown as any;
          const delete2 = (await axiosClient.delete(
            "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-extra-information",
            { data: { cvindex: cvIndex } } as any
          )) as unknown as any;
          const delete3 = (await axiosClient.delete(
            "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-project",
            { data: { cvindex: cvIndex } } as any
          )) as unknown as any;
          const delete4 = (await axiosClient.delete(
            `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-layout/${cvIndex}`)) as unknown as any;
        
          const delete5 =   (await axiosClient.delete(
            `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-categories`, { data: { cvIndex: cvIndex }})) as unknown as any;
          
          if (
            delete1?.statusCode === 200 &&
            delete2?.statusCode === 200 &&
            delete3?.statusCode === 200 &&
            delete4?.statusCode === 200 &&
            delete5?.statusCode === 200
          ) {
            const dataInfo = dataLoad.filter((dt: any) => {
              return dt.type === "info_person";
            })[0];
            if (dataInfo) {
              const dataMoreInfo = dataInfo.moreCvInformations?.map((dt: any) => {
                return { cvInformationId: dataInfo.cvIndex, ...dt };
              }) || [];
      
              const formData = new FormData();
              for (let i in dataInfo) {
                if (i === "avatar") {
                  if (dataInfo.avatar?.includes("http")) {
                    formData.append("avatarPath", dataInfo.avatar);
                  }
                } else {
                  if (i === "images") {
                    dataInfo[i]?.forEach((image: any) => {
                      formData.append("images", image);
                    });
                  } else {
                    if (i !== "id" && i !== "moreCvInformations")
                      formData.append(i, dataInfo[i]);
                  }
                }
              }
              const res3 = (await axiosClient.post(
                "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-information",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )) as any;
  
              if (res3 && res3.statusCode === 201) {
                if (dataMoreInfo.length > 0) {
                  const res4 = (await axiosClient.post(
                    "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-more-information",
                    { data: dataMoreInfo }
                  )) as any;
                  if (!res4 || !(res4.statusCode === 201)) {
                    return false
                  }
                }
              }else{
                return false
              }
            }
            const dataExtraInfo = dataLoad.filter((dt: any) => {
              return dt.type !== "info_person" && dt.type !== "info_project";
            });
            if (dataExtraInfo.length > 0) {
              const res = (await axiosClient.post(
                "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-extra-information",
                { data: dataExtraInfo }
              )) as unknown as any;
              if(!res || !(res.statusCode === 201)){
                return false
              }
            }
            const dataProject = dataLoad.filter((dt: any) => {
              return dt.type === "info_project";
            });
            if (dataProject.length > 0) {
              const res2 = (await axiosClient.post(
                "https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-project",
                { data: dataProject }
              )) as unknown as any;
              if(!res2 || !(res2.statusCode === 201)){
                return false
              }
            }
            if(dataForm){
                const resForm = await axiosClient.post(`${V3}/api/v3/cv-layout`,dataForm) as any
                if(!resForm || !(resForm.statusCode === 201)){
                   return false
                  }
            }
          }else{
            return false
          }
          return result

    },
    checkWarCV : async(dataLoad:any) => {
       const URL =  `https://jeffrey-diverse-writers-vsnet.trycloudflare.com/checkWar/`
       const res = await axiosClientRecruiter.post(URL,{content:dataLoad})
       if(res?.data == 1){
        return false
       }else{
        return true
       }

  },
    postCvIndex: async(name:any,cvIndex:any,templateId:any,file:any,images:any = null,type:any = 0)=>{
      const URL =  `${V3}/api/v3/profiles-cvs`
      const formData = new FormData()
      formData.append('name',name)
      formData.append('cvIndex',cvIndex)
      formData.append('templateId',templateId)
      formData.append('file',file)
      images && formData.append('images',images)
      formData.append('type',type)
      const res3 = (await axiosClient.post(URL
       ,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )) as any;
      return res3
    },
    postCV: async(dataCV:any,cvId:any,accountId:any)=>{
      const urlFilterAI = 'https://jeffrey-diverse-writers-vsnet.trycloudflare.com/jobFit/'
      // //console.log(dataCV)
      const dataFilterAI = await axiosClient.post(urlFilterAI,{content:dataCV})
      if(dataFilterAI){
        const dataMap = dataFilterAI.data.map((dt:any)=>{
          return {...dt,cvIndex:cvId}
        })
        const urlV3 = `${V3}/api/v3/cv-categories`
        const updateAICV = await axiosClient.post(urlV3,{data: dataMap})
        if(updateAICV){
          const dataPost = await axiosClient.get(urlV3 +`?cvIndex=${cvId}`)
          if(dataPost){
            // //console.log(dataCV,dataPost)
            const dataFilterPost = await axiosClient.post('https://jeffrey-diverse-writers-vsnet.trycloudflare.com/aiFilterPOST/',{contentCV: dataCV,listPost: dataPost.data})
            if(dataFilterPost){
              // //console.log(dataFilterPost)
              const updateDataFilter = await axiosClient.post(`${V3}/api/v3/cvs-posts`,{data: dataFilterPost.data.map((dt:any)=>{
                return {...dt,type: 0,cvIndex: cvId,accountId:accountId}
              })})
              if(updateDataFilter){
                return updateDataFilter
              }
            }
          }
        }
      }
     
    }
    ,
    cvDocs: async(file:any)=>{
      const URL =  `${V3}/api/v3/cv-information/read`
      const formData = new FormData()
      formData.append('file',file)
      const res3 = (await axiosClient.post(URL
        ,
         formData,
         {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         }
       )) as any;
       return res3
    },
    cvsIdPost: async(cvId:any,accountId:any)=>{
      const updateDataFilter = await axiosClient.get(`${V3}/api/v3/cvs-posts?type=0&accountId=${accountId}&cvIndex=${cvId}`)
      if(updateDataFilter){
        return updateDataFilter
      }
    },
    getCVidPort: async(postId:any,accountId:any)=>{
     const res = await axiosClientRecruiter.get(`https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cvs-posts?accountId=${accountId}&type=${1}&postId=${postId}`)
     return res
    },
    
}

export default cvsApi