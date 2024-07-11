"use client"

// import { saveAs } from 'file-saver';
type Props = {}

const ConvertBase64ToImg = () => {
    const convertBaseToImg = async(base64Data:any,name="image/png")=>{
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

    
        return blob;
    }
   
   return {convertBaseToImg}
}

export default ConvertBase64ToImg