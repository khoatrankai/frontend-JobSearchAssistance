import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const createDocument = async () => {
    const dataOK = [ { "id": 1630, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_skill", "row": 1, "part": 0, "col": 0, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1631, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_achivement", "row": 2, "part": 0, "col": 0, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "ok", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1632, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_hobby", "row": 3, "part": 0, "col": 0, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1633, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_award", "row": 4, "part": 0, "col": 0, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1634, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_more", "row": 5, "part": 0, "col": 0, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1635, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_experience", "row": 0, "part": 0, "col": 1, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1636, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_activate", "row": 1, "part": 0, "col": 1, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 1637, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_study", "row": 2, "part": 0, "col": 1, "cvIndex": 1, "padIndex": 1, "moreCvExtraInformations": [ { "position": "", "time": "", "company": "", "description": "", "index": 0, "padIndex": 1 } ] }, { "id": 262, "accountId": "94f2b685-9ee6-45af-9e52-d34925cfc497", "type": "info_project", "row": 3, "part": 0, "col": 1, "cvIndex": 1, "padIndex": 1, "moreCvProjects": [ { "name": "", "time": "", "link": "", "participant": "", "position": "", "functionality": "", "technology": "", "index": 0, "padIndex": 1 } ] }, { "id": 309, "email": "khoanono963@gmail.com", "name": "Tran Tan Khoa", "phone": "a857454545", "address": "undefined", "intent": "01/01/1970", "type": "info_person", "avatar": null, "link": "null", "row": 0, "part": 0, "col": 0, "cvIndex": 1, "padIndex": 1, "moreCvInformations": [] } ]
    const createInfo_person = (data:any,index:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${index}. Thông tin chung:`),
                createSpaceN(),
                createTextRunTitle(`Địa chỉ: ${data?.address}`),
                createSpaceN(),
                createTextRunTitle(`Avatar: ${data?.avatar}`),
                createSpaceN(),
                createTextRunTitle(`Email: ${data?.email}`),
                createSpaceN(),
                createTextRunTitle(`Mục tiêu: ${data?.intent}`),
                createSpaceN(),
                createTextRunTitle(`Link cá nhân: ${data?.link}`),
                createSpaceN(),
                createTextRunTitle(`Tên: ${data?.name}`),
                createSpaceN(),
                createTextRunTitle(`Số điện thoại: ${data?.phone}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_project = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Dự án ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Tên dự án: ${data?.name}`),
                createSpaceN(),
                createTextRunTitle(`Vị trí: ${data?.position}`),
                createSpaceN(),
                createTextRunTitle(`Link: ${data?.link}`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: ${data?.time}`),
                createSpaceN(),
                createTextRunTitle(`Số lượng người tham gia: ${data?.participant}`),
                createSpaceN(),
                createTextRunTitle(`Chức năng: ${data?.functionality}`),
                createSpaceN(),
                createTextRunTitle(`Công nghệ sử dụng: ${data?.technology}`),
                createSpaceN(),
                createSpaceN(),
                
            ]
        })
    }
    const createInfo_exp = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Kinh nghiệm ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Vị trí: ${data?.position}`),
                createSpaceN(),
                createTextRunTitle(`Công ty: ${data?.company}`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: ${data?.time}`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: ${data?.description}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_activate = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Hoạt động ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Vị trí: ${data?.position}`),
                createSpaceN(),
                createTextRunTitle(`Tổ chức: ${data?.company}`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: ${data?.time}`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: ${data?.description}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_edu = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Học vấn ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Chuyên ngành: ${data?.position}`),
                createSpaceN(),
                createTextRunTitle(`Trường: ${data?.company}`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: ${data?.time}`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: ${data?.description}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_skill = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Kỹ năng ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Tên kỹ năng: ${data?.company}`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: ${data?.description}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_achivement = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Hoạt động ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: ${data?.time}`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: ${data?.description}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_hobby = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Sở thích ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Mô tả sở thích: ${data?.description}`),
                createSpaceN(),
                createSpaceN(),

            ]
        })
    }
    const createInfo_award = (data:any,index:any,i:any)=>{
        return new Paragraph({
            children:[
                createTextRunTitle(`${i+index}. Giải thưởng ${i+1}:`),
                createSpaceN(),
                createTextRunTitle(`Thời gian: ${data?.time}`),
                createSpaceN(),
                createTextRunTitle(`Mô tả: ${data?.description}`),
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
        const dataRen:any = dataOK.map((dt:any,index:any)=>{
            if(dt?.type === "info_person"){
                return createInfo_person(dt,index+1)
            }
            if(dt?.type === 'info_award'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_award(dtt,index+1,i)
                        
                })
                return moreCvExtraInformations
            }
            if(dt?.type === 'info_activate'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_activate(dtt,index+1,i)

                })
                return moreCvExtraInformations
                
            }
            if(dt?.type === 'info_hobby'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_hobby(dtt,index+1,i)
                           
                })
                return moreCvExtraInformations
                
            }
            if(dt?.type === 'info_achivement'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_achivement(dtt,index+1,i)
                            
                })
                return moreCvExtraInformations
            
            }
            if(dt?.type === 'info_project'){
                const moreCvProjects :any = dt?.moreCvProjects?.map((dtt:any,i:any)=>{
                    return createInfo_project(dtt,index+1,i)
                })
                return moreCvProjects
            
            }
            if(dt?.type === 'info_study'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_edu(dtt,index+1,i)
                })
                return moreCvExtraInformations
            }
            if(dt?.type === 'info_experiment'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_exp(dtt,index+1,i)
                })
                return moreCvExtraInformations
                
            }
            if(dt?.type === 'info_skill'){
                const moreCvExtraInformations :any = dt?.moreCvExtraInformations?.map((dtt:any,i:any)=>{
                    return createInfo_skill(dtt,index+1,i)
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