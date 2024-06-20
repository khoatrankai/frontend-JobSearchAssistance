import React from 'react'

type Props = {}

const ShortText = () => {
    const handleShortTextHome = (data:any,maxText:any) =>{
        if(!data){
            return ""
        }
        let truncatedText = data.toString()
        if(truncatedText){
            if(truncatedText.length>maxText){
                truncatedText = truncatedText.substring(0, maxText) + "...";
    
            }
        }
        
        return truncatedText
    }
    const handleShortValueNumber = (data:any) =>{
        let truncatedText = data.toString()
        if(truncatedText){
            if(truncatedText.length>6){
                truncatedText = truncatedText.substring(0, truncatedText.length-6) + "tr";
    
            }else{
                if(truncatedText.length>3){
                    truncatedText = truncatedText.substring(0, truncatedText.length-3) + "N";
                }
            }
        }
        
        return truncatedText
    }
    const handleConvertText = (htmlString: any) => {
        var virtualElement = document.createElement("div");
    
        // Đặt chuỗi HTML vào phần tử ảo
        virtualElement.innerHTML = htmlString;
    
        // Lấy nội dung văn bản từ phần tử ảo
        var textContent = virtualElement.innerText || virtualElement.textContent;
        return textContent;
      };
 return{handleShortTextHome,handleShortValueNumber,handleConvertText}
}

export default ShortText