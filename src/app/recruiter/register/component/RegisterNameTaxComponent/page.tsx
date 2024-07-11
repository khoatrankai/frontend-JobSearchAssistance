"use client";
import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";

import "./style.scss";
type IEditNameFaxCompany = {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
};

const ModifyNameTaxComponent: React.FC<any> = (props: IEditNameFaxCompany) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { dataCompany, setDataCompany, is_profile } = props;
  const [isClickName, setIsClickName] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleEditCompanyFax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      taxCode: value,
    }));
  };

  const handleEditCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      name: value,
    }));
  };

  return (
    <div className="flex flex-nowrap gap-3">
      <div className="w-1/2">
        <Typography
          className="basic"
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {languageRedux === 1 ? "Tên công ty" : "Company name"}{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editCompany"
          name="title"
          value={dataCompany?.name}
          onChange={(e) => {
            handleEditCompanyName(e);
            setName(e.target.value);
          }}
          onClick={() => {
            setIsClickName(true);
          }}
          size="small"
          sx={{
            width: "100%",
            marginTop: "8px",
            border: isClickName && !name ? "1px solid red" : "none",
            borderRadius: isClickName && !name ? "5px" : "",
          }}
          placeholder={
            languageRedux === 1 ? "Nhập tên công ty" : "Enter company name"
          }
          disabled={is_profile ? true : false}
        />
        {isClickName && !name && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {languageRedux === 1
              ? "Tên công ty không được để trống"
              : "Company name cannot be empty"}
          </p>
        )}
      </div>
      <div className="w-1/2">
        <Typography
          className="basic"
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {languageRedux !== 1 ? "Tax code" : "Mã số thuế"}{" "}
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.taxCode}
          onChange={handleEditCompanyFax}
          size="small"
          sx={{ width: "100%", marginTop: "8px" }}
          placeholder={
            languageRedux === 1 ? "Nhập mã số thuế" : "Enter tax code"
          }
          disabled={is_profile ? true : false}
        />
      </div>
    </div>
  );
};

export default memo(ModifyNameTaxComponent);
