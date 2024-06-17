import html2canvas from 'html2canvas';
import { overflow } from 'html2canvas/dist/types/css/property-descriptors/overflow';

export async function captureElementAsFile(element: any,fileName:any) {
    const boundingRect = element.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.width = boundingRect.width;
  canvas.height = boundingRect.height;

  const options = {
    scale: 1,
    canvas: canvas,
    logging: false,
    width: boundingRect.width,
    height: boundingRect.height,
    useCORS:true,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    scrollY: -window.scrollY,
     x: 0,
    allowTaint: true,
    
    letterRendering:true,
  };

  await html2canvas(element, options);

  const dataURL = canvas.toDataURL('image/jpeg');
  const base64String = dataURL.split(',')[1]; // Lấy chuỗi Base64 từ dataURL

  const blob = await fetch(dataURL).then((res) => res.blob());
  const file = new File([blob], fileName, { type: 'image/jpeg' });

  //console.log(dataURL)
  return file
}