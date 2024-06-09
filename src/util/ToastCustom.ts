import { useRouter } from 'next/navigation';
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {

}

const ToastCustom = () => {
  const route = useRouter()

  const hdSuccess = (success:any,path="")=>{
    toast.success(success, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    if(path !== ""){
      route.push(path)
    }

    
  }
  const hdError = (error:any)=>{


    toast.error(error, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  
  return {hdSuccess,hdError}
}

export default ToastCustom