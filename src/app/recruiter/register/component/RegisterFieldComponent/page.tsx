/* eslint-disable react/display-name */
import React, { useState, useEffect, memo } from "react";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import apiCompany from "@/api/company/apiCompany";
import categoryApi from "@/api/category/categoryApi";

const styleLabel = {
  fontWeight: 700,
  color: "#000000",
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const ModifyFieldScaleCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { setDataCompany, dataCompany, is_profile } = props;
  const [dataSizes, setDataSizes] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [dataCategories, setDataCategories] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isClickSize, setIsClickSize] = useState(false);
  const [isClickField, setIsClickField] = useState(false);

  useEffect(() => {
    if (dataSizes && !selectedSize) {
      setSelectedSize(
        dataSizes?.find(
          (dataRole: any) =>
            dataRole?.nameText === dataCompany?.companySizeInfomation?.nameText
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSizes]);
  useEffect(() => {
    if (dataCategories && !selectedCategory) {
      setSelectedCategory(
        dataCategories?.find(
          (dataCate: any) =>
            dataCate?.parent_category_id === dataCompany?.companyCategory?.id
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategories]);

  const getSizes = async () => {
    try {
      const sizes = await apiCompany.getAllSizesCompany(
        languageRedux === 1 ? "vi" : "en"
      );

      if (sizes) {
        setDataSizes(sizes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCateogrys = async () => {
    try {
      const result = await categoryApi.getAllCategorise(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  useEffect(() => {
    if (is_profile === false) {
      getCateogrys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleEditCompanySize = (event: any, value: any) => {
    setSelectedSize(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companySizeInfomation: {
        id: value?.id,
      },
    }));
  };
  const handleEditCompanyCategory = (event: any, value: any) => {
    setSelectedCategory(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyCategory: {
        id: value?.parent_category_id,
      },
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
          {languageRedux === 1 ? "Lĩnh vực hoạt động" : "Field of activity"}{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>

        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataCategories ? dataCategories : []}
          getOptionLabel={(option: any) => option?.parent_category || ""}
          value={selectedCategory || null}
          onChange={handleEditCompanyCategory}
          onOpen={() => {
            setIsClickField(true);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                languageRedux === 1 ? "Chọn lĩnh vực" : "Select field"
              }
              size="small"
              value={selectedCategory?.parent_category}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.parent_category === value?.parent_category;
          }}
          style={{
            marginTop: "8px",
            border: isClickField && !selectedCategory ? "1px solid red" : "none",
            borderRadius: isClickField && !selectedCategory ? "5px" : "",
          }}
        />
        {
          isClickField && !selectedCategory && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {languageRedux === 1
                ? "Lĩnh vực hoạt động không được để trống"
                : "Field of activity cannot be empty"}
            </p>
          )
        }
      </div>

      <div className="w-1/2">
        <Typography
          className="basic"
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          {languageRedux === 1 ? "Quy mô công ty" : "Company scale"}{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>
        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataSizes ? dataSizes : []}
          getOptionLabel={(option: any) => option?.nameText || ""}
          value={selectedSize || null}
          onChange={handleEditCompanySize}
          onOpen={() => {
            setIsClickSize(true);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={languageRedux === 1 ? "Chọn quy mô" : "Select scale"}
              size="small"
              value={selectedSize?.nameText}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.nameText === value?.nameText;
          }}
          style={{
            marginTop: "8px",
            border: isClickSize && !selectedSize ? "1px solid red" : "none",
            borderRadius: isClickSize && !selectedSize ? "5px" : "",
          }}
        />
        {
          isClickSize && !selectedSize && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {languageRedux === 1
                ? "Quy mô công ty không được để trống"
                : "Company scale cannot be empty"}
            </p>
          )
        }
      </div>
    </div>
  );
});

export default memo(ModifyFieldScaleCompany);
