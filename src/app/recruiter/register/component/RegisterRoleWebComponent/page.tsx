/* eslint-disable react/display-name */
import React, { useState, useEffect, memo } from "react";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import apiCompany from "@/api/company/apiCompany";

const styleLabel = {
  fontWeight: 700,
  color: "#000000",
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const ModifyRoleWebComponent: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { setDataCompany, dataCompany, is_profile } = props;
  const [dataRoles, setDataRoles] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isClickRole, setIsClickRole] = useState(false);
  const [isClickWeb, setIsClickWeb] = useState(false);

  useEffect(() => {
    if (dataRoles && !selectedRole) {
      setSelectedRole(
        dataRoles?.find(
          (dataRole: any) =>
            dataRole?.nameText === dataCompany?.companyRoleInfomation?.nameText
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoles]);

  const getRoles = async () => {
    try {
      const roles = await apiCompany.getAllRolesCompany(
        languageRedux === 1 ? "vi" : "en"
      );

      if (roles) {
        setDataRoles(roles);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (is_profile === false) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleEditCompanyRole = (event: any, value: any) => {
    setSelectedRole(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyRoleInfomation: {
        id: value?.id,
      },
    }));
  };

  const handleEditCompanyWeb = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      website: value,
    }));
  };

  return (
    <div className="flex gap-3">
      <div className="w-1/2">
        <Typography
          className="basic"
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {languageRedux === 1 ? "Vai trò của bạn" : "Your role"}{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>

        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataRoles ? dataRoles : []}
          getOptionLabel={(option: any) => option?.nameText || ""}
          value={selectedRole || null}
          onChange={handleEditCompanyRole}
          onOpen={() => {
            setIsClickRole(true);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={languageRedux === 1 ? "Chọn vai trò" : "Select role"}
              size="small"
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option.nameText === value.nameText;
          }}
          style={{
            marginTop: "8px",
            border: isClickRole && !selectedRole ? "1px solid red" : "none",
            borderRadius: isClickRole && !selectedRole ? "5px" : "",
          }}
        />
        {isClickRole && !selectedRole && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {languageRedux === 1
              ? "Vai trò của bạn không được để trống"
              : "Your role cannot be empty"}
          </p>
        )}
      </div>

      <div className="w-1/2">
        <Typography
          className="basic"
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          Website <span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.website}
          onChange={handleEditCompanyWeb}
          size="small"
          sx={{
            width: "100%",
            marginTop: "8px",
            border:
              isClickWeb && !dataCompany?.website ? "1px solid red" : "none",
            borderRadius: isClickWeb && !dataCompany?.website ? "5px" : "",
          }}
          placeholder='http://"'
          disabled={is_profile ? true : false}
          onClick={() => {
            setIsClickWeb(true);
          }}
        />
        {isClickWeb && !dataCompany?.website && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {languageRedux === 1
              ? "Website không được để trống"
              : "Website cannot be empty"}
          </p>
        )}
      </div>
    </div>
  );
});

export default memo(ModifyRoleWebComponent);
