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
        let truncatedText = data?.toString()
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
      const ChangeNumber = (data: any, type = true, typeSpace = ".") => {
        let data2 = data?.toString()
        if (!data2) {
          return 0;
        }
        if (type) {
          const numberArray = data2?.split("");
          if (numberArray.length <= 4) {
            return data2;
          }
          const lengthChange = Math.round(numberArray.length / 3 - 1);
          let vt = numberArray.length - (lengthChange * 3 + 1);
          for (let i = 0; i < lengthChange; i++) {
            numberArray.splice(vt, 0, ".");
            vt = vt + 4;
          }
          return numberArray.join("");
        } else {
          const numberArray = data2?.split("");
          if (numberArray.length <= 3) {
            return data2;
          }
          numberArray.push("");
          const lengthChange = Math.round(numberArray.length / 3 - 1);
          let vt = numberArray.length - (lengthChange * 3 + 1);
          for (let i = 0; i < lengthChange; i++) {
            numberArray.splice(vt, 0, typeSpace);
            vt = vt + 4;
          }
          numberArray.pop();
          return numberArray.join("");
        }
      };
 return{handleShortTextHome,handleShortValueNumber,handleConvertText,ChangeNumber}
}

export default ShortText