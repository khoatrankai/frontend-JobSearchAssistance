/* eslint-disable react-hooks/rules-of-hooks */
"use client";
/* eslint-disable react/jsx-key */
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Passion from "../PDF/Sample/Passion/Passion";

import { usePDFJS } from "@/util/ConvertPdfToImg";
import { captureElementAsFile } from "@/util/ConvertPdf";
import { useSrollContext } from "@/context/AppProvider";

// import convertImg from "@/util/ConvertPdfToImg";

// const ConvertImg: any = async () => {
//   return convertPdfToImages;
// };

type Props = { id: any; funcLibrary: any };

const ToolBar = (props: Props) => {
  const { id, funcLibrary } = props;
  const {
    updateHandleAlert,
    setContentAlert,
    handlePersistGateLoaded,
    setTitleIsLoading,
  } = useSrollContext();
  const [tabColorTopic, setTabColorTopic] = useState<boolean>(false);
  const [urlSave, setUrlSave] = useState<any>("");
  const [pdfExport, setPdfExport] = useState<any>();
  const handlePdfSave = (blob: any) => {
    console.log("save cv");
    setPdfExport(blob);
    return "Lưu và tải xuống";
  };
  const handleSavePdf = async () => {
    if (dataLoad) {
      // const blob = await pdf(<Passion funcLibrary={funcLibrary} />).toBlob();
      // return blob;
      return pdfExport;
    }
  };
  const refBtnMenu = useRef<any>();
  const {
    dataForm,
    nameCv,
    setNameCv,
    dataRequest,
    dataGhostDrag,
    handleCheckPass,
    checkActive,
    handleOnClickPart,
    checkGhost,
    handleOnClickRow,
    handleOnMouseMoveRow,
    BGChooseCol,
    checkLayout,
    BGCol,
    BGChoosePart,
    BGPart,
    BGRow,
    BGToolPart,
    handleBtnSave,
    BGToolRow,
    handleChangeColor,
    handleToolMouseMoveTransRow,
    setCheckLayout,
    dataLoad,
    setDataLoad,
    setDataForm,
    handleChangeLayout,
    handleResetActive,
    BGLayout,
    handleNext,
    handlePrev,
    backNext,
    setBackNext,
  } = funcLibrary;
  // useEffect(() => {
  //   if (urlSave !== "") {
  //     usePDFJS(async (pdfjs) => {
  //       //console.log(pdfjs);
  //     });
  //   }
  // }, [urlSave]);

  return (
    <>
      <div className="fixed top-20 flex justify-between py-6 w-full z-40 gap-x-10 bg-white  px-8">
        <div className="flex-1">
          <input
            className="outline-none text-lg font-semibold h-full w-full"
            type="text"
            value={nameCv ?? ""}
            placeholder="Tiêu đề"
            onChange={(e: any) => {
              setNameCv(e.target.value);
            }}
          />
        </div>
        <div className={`flex w-fit gap-x-4  text-white`} ref={refBtnMenu}>
          <div
            className="flex gap-x-2 relative items-center p-2 border-r-2 hover:bg-blue-50 cursor-pointer"
            onClick={() => {
              setTabColorTopic(!tabColorTopic);
            }}
          >
            <p className="text-black">Màu chủ đề</p>
            <div
              className="rounded-full w-4 h-4"
              style={{
                backgroundColor:
                  dataForm.colorTopic?.split(",")[dataForm.indexTopic],
              }}
            ></div>
            <div
              className={` w-96 h-80 absolute top-full left-0 bg-white rounded-lg border-2 shadow-lg p-4 translate-y-4 ${
                !tabColorTopic && "hidden"
              }`}
            >
              <p className="text-black">Bảng màu gợi ý</p>
              <div className="flex gap-x-2">
                {dataForm.colorTopic?.split(",").map((dt: any, index: any) => {
                  return (
                    <div
                      className="w-6 h-6 rounded-xl"
                      style={{ backgroundColor: dt }}
                      onClick={() => {
                        setDataForm({ ...dataForm, indexTopic: index });
                        setBackNext({
                          ...backNext,
                          back: backNext,
                          present: {
                            ...backNext.present,
                            dataLoad: backNext.present.dataLoad,
                            dataForm: { ...dataForm, indexTopic: index },
                          },
                          next: {},
                        });
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
          {true && (
            <div className="flex gap-x-2 text-black text-3xl  pr-4 border-r-2">
              <button
                className={`p-2 rounded-xl  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
                  false ? "cursor-not-allowed" : " hover:bg-blue-50"
                }`}
                onMouseDown={() => {
                  if (backNext.back != undefined) {
                    if (Object?.keys(backNext.back).length > 0) {
                      handlePrev();
                    }
                  }
                }}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                className={`p-2 rounded-xl  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  ${
                  false ? "cursor-not-allowed" : " hover:bg-blue-50"
                }`}
                // onClick={handleNext}
                onMouseDown={() => {
                  if (backNext.next != undefined) {
                    if (Object?.keys(backNext.next).length > 0) {
                      handleNext();
                    }
                  }
                }}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          )}

          <button
            className="p-2 font-semibold text-blue-500  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border-2 hover:bg-blue-500 hover:text-white rounded-lg"
            // onClick={handleBtnSave}
            onClick={(e: any) => {}}
          >
            <PDFDownloadLink
              className="href-link-pdf"
              document={<Passion funcLibrary={funcLibrary} />}
              fileName={`${nameCv ? nameCv : "CV-old"}-${id}.pdf`}
            >
              {({ blob, url, loading, error }) => handlePdfSave(blob)}
            </PDFDownloadLink>
          </button>
          <button
            className="p-2 font-semibold bg-blue-500 rounded-lg"
            onClick={() => {
              handleResetActive();

              handleBtnSave(handleSavePdf);
            }}
          >
            Lưu lại
          </button>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
