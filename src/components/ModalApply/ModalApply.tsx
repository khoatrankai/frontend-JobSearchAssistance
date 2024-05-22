import { Modal } from "antd";
import { FaAddressBook } from "react-icons/fa";
import NearCvComponent from "./NearCvComponent/index";
import { useEffect, useMemo, useState } from "react";
import AllCvComponent from "./AllCvComponent";
import UpLoadCv from "./UploadCvComponent/index";
import WarningComponent from "./WarningComponent/index";
import "./style.scss";

type Prop = {
  namePost: string;
  openModalApply: boolean;
  setOpenModalApply: (value: boolean) => void;
  profile: any;
  handleApply: (value: any) => void;
  setFilePDFParent: (value: File) => void;
  setIdCv: (value: number) => void;
};

const ModalApply = (prop: Prop) => {
  const { profile, handleApply, setFilePDFParent, setIdCv } = prop;
  const [isCheckNearCv, setIsCheckNearCv] = useState<boolean>(false);
  const [isCheckAllCv, setIsCheckAllCv] = useState<boolean>(false);
  const [isUploadCv, setIsUploadCv] = useState<boolean>(false);
  const [cvType, setCvType] = useState<string>("");
  const [idSelectFromAllCv, setIdSelectFromAllCv] = useState<number>(0);

  const handleOk = () => {
    prop.setOpenModalApply(false);
  };

  const handleCancel = () => {
    prop.setOpenModalApply(false);
  };

  useEffect(() => {
    if (cvType === "near") {
      setIsUploadCv(false);
      setIsCheckAllCv(false);
    }
    if (cvType === "all") {
      setIsUploadCv(false);
      setIsCheckNearCv(false);
    }
    if (cvType === "upload") {
      setIsCheckNearCv(false);
      setIsCheckAllCv(false);
    }
  }, [cvType]);

  const memoizedNearCvComponent = useMemo(
    () => (
      <NearCvComponent
        profile={profile}
        isCheckNearCv={isCheckNearCv}
        setIsCheckNearCv={setIsCheckNearCv}
        setCvType={setCvType}
        setIdCv={setIdCv}
      />
    ),
    [profile, isCheckNearCv, setIdCv]
  );

  const memoizedAllCvComponent = useMemo(
    () => (
      <AllCvComponent
        profile={profile}
        isCheckAllCv={isCheckAllCv}
        setIsCheckAllCv={setIsCheckAllCv}
        setCvType={setCvType}
        setIdSelectFromAllCv={setIdSelectFromAllCv}
        idSelectFromAllCv={idSelectFromAllCv}
        setIdCv={setIdCv}
      />
    ),
    [profile, isCheckAllCv, idSelectFromAllCv, setIdCv]
  );

  const memoizedUploadCvComponent = useMemo(
    () => (
      <UpLoadCv
        profile={profile}
        isUploadCv={isUploadCv}
        setIsUploadCv={setIsUploadCv}
        setCvType={setCvType}
        setFilePDFParent={setFilePDFParent}
      />
    ),
    [profile, isUploadCv, setFilePDFParent]
  );

  const memoizedWarningComponent = useMemo(
    () => (
      <div>
        <WarningComponent />
      </div>
    ),
    []
  );

  return (
    <div>
      <Modal
        className="container-apply"
        open={prop.openModalApply}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>
            Ứng tuyển{" "}
            <span
              style={{
                color: "blue",
                fontWeight: "bold",
              }}
            >
              {prop.namePost}
            </span>
          </h1>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <FaAddressBook />
            <div
              style={{
                color: "blue",
                fontWeight: "bold",
              }}
            >
              Chọn CV để ứng tuyển
            </div>
          </div>
          {memoizedNearCvComponent}
          {memoizedAllCvComponent}
          {memoizedUploadCvComponent}
          {memoizedWarningComponent}

          <div className="wrapper-action">
            <button
              className="btn-cancel"
              onClick={() => {
                prop.setOpenModalApply(false);
              }}
            >
              Hủy
            </button>
            <button
              className="btn-apply"
              onClick={() => {
                handleApply(cvType);
              }}
            >
              Ứng tuyển
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalApply;
