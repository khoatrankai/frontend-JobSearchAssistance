"use client"
import React from 'react'
import { PDFDocument, rgb } from 'pdf-lib';
// import { saveAs } from 'file-saver';
type Props = {}

const ConvertImgToPdf = () => {
    const convertImgtoPdf = async(imageFile:any)=>{
        const arrayBuffer = await imageFile.arrayBuffer();
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
      
        const img = await pdfDoc.embedJpg(arrayBuffer);
        const { width, height } = img.scale(1);
      
        page.setSize(width, height);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        // saveAs(blob, 'converted.pdf');
        return blob
    }
    return {convertImgtoPdf}
   
}

export default ConvertImgToPdf