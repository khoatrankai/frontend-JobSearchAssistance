import React from 'react'



const useRouterCustom = () => {
    const pushRouter = (link?:any)=>{
        window.location.href = link
    }
    const pushBlank = (link?:any)=>{
        window.open(link,'_blank')
    }
 return {pushRouter,pushBlank}
}

export default useRouterCustom