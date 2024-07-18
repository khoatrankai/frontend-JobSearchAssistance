import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
const text = ")"
export const createDocument = async (dataOk:any) => {
    const dataOK = dataOk
    console.log(dataOK)
    const createInfo_person = (data:any,index:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text} Thông tin chung:`),
                createSpaceN(),
                createTextRunTitle(`Địa chỉ: “${data?.address ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Avatar: “${data?.avatar ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Email: “${data?.email ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mục tiêu: “${data?.intent ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Link cá nhân: “${data?.link ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Tên: “${data?.name ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Số điện thoại: “${data?.phone ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_project = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Dự án ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Tên dự án: “${data?.name ??""}`),
                createSpaceN(),
                createTextRunTitle(`Vị trí: “${data?.position ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Link: “${data?.link ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: “${data?.time ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Số lượng người tham gia: “${data?.participant ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Chức năng: “${data?.functionality ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Công nghệ sử dụng: “${data?.technology ??""}”`),
                createSpaceN(),
                createSpaceN(),
                
            ]
        })
    }
    const createInfo_exp = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Kinh nghiệm ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Vị trí: “${data?.position ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Công ty: “${data?.company ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: “${data?.time ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_activate = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Hoạt động ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Vị trí: “${data?.position ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Tổ chức: “${data?.company ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: “${data?.time ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_edu = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Học vấn ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Chuyên ngành: “${data?.position ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Trường: “${data?.company ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: “${data?.time ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_skill = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Kỹ năng ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Tên kỹ năng: “${data?.company ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_achivement = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Hoạt động ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: “${data?.time ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_hobby = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Sở thích ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Mô tả sở thích: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_more = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Thông tin thêm ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_award = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${data?.count}${text}  Giải thưởng ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: “${data?.time ??""}”`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: “${data?.description ??""}”`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    // const arrayType = [
    //     {
    //         type:['info_person','Thông tin chung'],


    //     }
    // ]
    const createTextRunTitle = (text:any)=>{
        return new TextRun({text})
           
    }
    const createSpaceN = ()=>{
        return new TextRun({break:1})
           
    }
    const createParagraph = ()=>{
        let count = 0
        const dataMap = dataOK?.map((dt:any)=>{
            if(dt?.type === 'info_person'){
                count = count + 1
                return {...dt,count}
            }else{
                if(dt?.type === 'info_project'){
                    const moreCvProjects = dt?.moreCvProjects?.map((dtt:any)=>{
                        count = count + 1
                        return {...dtt,count}
                    })
                    return {...dt,moreCvProjects}

                }else{
                    const moreCvExtraInformations = dt?.moreCvExtraInformations?.map((dtt:any)=>{
                        count = count + 1
                        return {...dtt,count}
                    })
                    return {...dt,moreCvExtraInformations}
                }
            }
        })
        const dataRen:any = dataMap.map((dt:any,index:any)=>{
            if(dt?.type === "info_person"){
                console.log(index)
                return createInfo_person(dt,index)
            }
            if(dt?.type === 'info_award'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if((dtt?.time && dtt?.time!== "") || (dtt?.description && dtt?.description !== ""))
                    return createInfo_award(dtt,index,i)
                        
                })
                return moreCvExtraInformations
            }
            if(dt?.type === 'info_activate'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if((dtt?.time && dtt?.time!== "" )|| (dtt?.description && dtt?.description !== "" )|| (dtt?.company && dtt?.company !== "")|| (dtt?.position && dtt?.position !== ""))

                    return createInfo_activate(dtt,index,i)

                })
                return moreCvExtraInformations
                
            }
            if(dt?.type === 'info_hobby'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if(dtt?.description && dtt?.description !== "")

                    return createInfo_hobby(dtt,index,i)
                           
                })
                return moreCvExtraInformations
                
            }
            if(dt?.type === 'info_achivement'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if((dtt?.time && dtt?.time!== "") || (dtt?.description && dtt?.description !== ""))

                    return createInfo_achivement(dtt,index,i)
                            
                })
                return moreCvExtraInformations
            
            }
            if(dt?.type === 'info_more'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if( dtt?.description && dtt?.description !== "")

                    return createInfo_more(dtt,index,i)
                })
                return moreCvExtraInformations
            }
            if(dt?.type === 'info_project'){
                console.log(index)
                const moreCvProjects :any = dt?.moreCvProjects?.map((dtt:any,i:any)=>{
                    if((dtt?.time && dtt?.time!== "" )||( dtt?.participant && dtt?.participant !== "" )||(dtt?.name && dtt?.name !== "")||( dtt?.position && dtt?.position !== "") ||(dtt?.functionality && dtt?.functionality !== "")||(dtt?.link && dtt?.link !== "")||(dtt?.technology && dtt?.technology !== ""))
                    return createInfo_project(dtt,index,i)
                })
                return moreCvProjects
            
            }
            if(dt?.type === 'info_study'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if((dtt?.time && dtt?.time!== "" )|| (dtt?.description && dtt?.description !== "" )|| (dtt?.company && dtt?.company !== "")|| (dtt?.position && dtt?.position !== ""))
                    return createInfo_edu(dtt,index,i)
                })
                return moreCvExtraInformations
            }
            if(dt?.type === 'info_experience'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if((dtt?.time && dtt?.time!== "" )|| (dtt?.description && dtt?.description !== "" )|| (dtt?.company && dtt?.company !== "")|| (dtt?.position && dtt?.position !== ""))
                    return createInfo_exp(dtt,index,i)
                })
                return moreCvExtraInformations
                
            }
            if(dt?.type === 'info_skill'){
                console.log(index)
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    if((dtt?.description && dtt?.description !== "" )|| (dtt?.company && dtt?.company !== ""))
                    return createInfo_skill(dtt,index,i)
                })
                return moreCvExtraInformations
           
            }
        })

        return dataRen.flat()
    }
    console.log(createParagraph())
    const doc = new Document({
        sections: [
            {
                children: createParagraph()
            },
        ],
      });
  
      Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
      });
};