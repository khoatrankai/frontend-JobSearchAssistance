/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { useState, useEffect, memo } from "react";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import locationApi from "@/api/location/locationApi";
import { fetchLocation } from "@/redux/reducer/locationReducer";
import MapComponent from "@/components/MapComponent/MapComponent";
import mapApi from "@/api/map/map";
import DelayCustom from "@/util/DelayCustom";
const styleLabel = {
  fontWeight: 700,
  color: "#000000",
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const EditAddressCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { useDebounce } = DelayCustom();
  const [dataLocation, setDataLocation] = useState<any>({
    address: "",
    latitude: 10.6,
    longitude: 107.6,
    ...props.dataCompany,
  });
  const { setDataCompany, dataCompany, is_profile } = props;
  const [tabMap, setTapMap] = useState<boolean>(true);
  const [dataDistricts, setDataDistrict] = useState<any>(null);
  const [dataWards, setDataWard] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const [isClickProvince, setIsClickProvince] = useState(false);
  const [isClickDistrict, setIsClickDistrict] = useState(false);
  const [isClickWard, setIsClickWard] = useState(false);
  const [isClickAddress, setIsClickAddress] = useState(false);

  const dataProvinces = useSelector(
    (state: RootState) => state.dataLocation.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocation("vi") as any);
  }, []);

  useEffect(() => {
    if (dataProvinces && !selectedProvince) {
      setSelectedProvince(
        dataProvinces?.find(
          (dataProvince: any) =>
            dataProvince?.province_fullName ===
            dataCompany?.companyLocation?.district?.province?.fullName
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProvinces, languageRedux]);

  useEffect(() => {
    if (dataDistricts && !selectedDistrict) {
      setSelectedDistrict(
        dataDistricts?.find(
          (dataDistrict: any) =>
            dataDistrict?.full_name ===
            dataCompany?.companyLocation?.district?.fullName
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDistricts, languageRedux]);

  useEffect(() => {
    if (dataWards && !selectedWard) {
      setSelectedWard(
        dataWards?.find(
          (dataWard: any) =>
            dataWard?.full_name === dataCompany?.companyLocation?.fullName
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWards, languageRedux]);

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (
        dataCompany?.companyLocation?.district?.province?.id &&
        dataDistricts === null
      ) {
        const districts = await locationApi.getDistrictsById(
          dataCompany?.companyLocation?.district?.province?.id,
          languageRedux === 1 ? "vi" : "en"
        );
        if (districts) {
          setDataDistrict(districts?.data);
        }
      } else {
        if (selectedProvince) {
          const districts = await locationApi.getDistrictsById(
            selectedProvince?.province_id,
            languageRedux === 1 ? "vi" : "en"
          );
          if (districts) {
            setDataDistrict(districts?.data);
          }
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handleSearchLocation = async (data: any) => {
    setTapMap(false);
    const dataGet: any = await mapApi.getMapLocation(
      data +
        " " +
        selectedWard?.full_name +
        " " +
        selectedDistrict?.full_name +
        " " +
        selectedProvince?.province_fullName,
      "pk.eyJ1IjoiaGJ0b2FuIiwiYSI6ImNsd29tc2h2NjFhOTEyaW54MmFnYWt3ZDQifQ.ljik1w_nZErIaDyhwXh68w"
    );

    if (dataGet) {
      const dataOK = dataGet.features.filter((dt: any) => {
        return dt.id.includes("neighborhood");
      })[0];
      if (dataOK) {
        setTapMap(true);

        setDataLocation({
          ...dataCompany,
          address: data ?? dataLocation?.address,
          latitude: dataOK?.center?.[1],
          longitude: dataOK?.center?.[0],
        });
      } else {
        setTapMap(true);

        setDataLocation({
          ...dataCompany,
          address: data ?? dataLocation?.address,

          latitude: dataGet.features?.[2]?.center?.[1],
          longitude: dataGet.features?.[2]?.center?.[0],
        });
      }
    }
  };
  const handleDebounce = useDebounce(handleSearchLocation, 500);
  // get All ward by ward id
  const getDataWard = async () => {
    try {
      if (dataDistricts && dataWards === null) {
        const allward = await locationApi.getWardsId(
          dataCompany?.companyLocation?.district?.id,
          languageRedux === 1 ? "vi" : "en"
        );

        if (allward) {
          setDataWard(allward?.data);
        }
      } else {
        if (selectedDistrict) {
          const allward = await locationApi.getWardsId(
            selectedDistrict?.id,
            languageRedux === 1 ? "vi" : "en"
          );
          if (allward) {
            setDataWard(allward?.data);
          }
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  React.useEffect(() => {
    getDataDistrict();
  }, [selectedProvince, languageRedux]);

  React.useEffect(() => {
    getDataWard();
  }, [selectedDistrict, languageRedux]);
  useEffect(() => {
    handleDebounce(undefined);
  }, [selectedDistrict, selectedProvince, selectedWard]);
  const handleProvinceChange = (event: any, value: any) => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedProvince(value);

    setDataWard([]);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
  };

  const handleChangeWardId = (event: any, value: any) => {
    setSelectedWard(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyLocation: {
        id: value?.id,
      },
    }));
  };

  const handleChangeAddress = (e: any) => {
    handleDebounce(e.target?.value);

    setDataCompany((preValue: any) => ({
      ...preValue,
      address: e.target?.value,
    }));
  };
  useEffect(() => {
    if (dataLocation) {
      setDataCompany({ ...dataCompany, ...dataLocation });
    }
  }, [dataLocation]);
  return (
    <div className="edit-address-company-container">
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="addressTitle"
          >
            {languageRedux === 1 ? "Thành phố " : "City "}
            <span style={{ color: "red" }}>*</span>
          </Typography>

          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) =>
              languageRedux === 1
                ? option?.province_fullName
                : option?.province_name || ""
            }
            value={selectedProvince || null}
            onOpen={() => {
              setIsClickProvince(true);
            }}
            onChange={(event: any, newValue: any | null) => {
              handleProvinceChange(event, newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1 ? "Thành phố" : "City"}
                size="small"
                value={selectedProvince?.province_fullName}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.province_fullName === value.province_fullName;
            }}
            style={{
              marginTop: "8px",
              border:
                isClickProvince && !selectedProvince ? "1px solid red" : "none",
              borderRadius: isClickProvince && !selectedProvince ? "5px" : "",
            }}
          />

          {isClickProvince && !selectedProvince && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {languageRedux === 1
                ? "Vui lòng chọn thành phố"
                : "Please select city"}
            </p>
          )}
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1 ? "Quận/Huyện " : "District "}{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataDistricts ? dataDistricts : []}
            getOptionLabel={(option: any) => option?.full_name || ""}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1 ? "Quận/Huyện " : "District "}
                size="small"
              />
            )}
            onOpen={() => {
              setIsClickDistrict(true);
            }}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{
              marginTop: "8px",
              border:
                isClickDistrict && !selectedDistrict ? "1px solid red" : "none",
              borderRadius: isClickDistrict && !selectedDistrict ? "5px" : "",
            }}
          />
          {isClickDistrict && !selectedDistrict && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {languageRedux === 1
                ? "Vui lòng chọn quận/huyện"
                : "Please select district"}
            </p>
          )}
        </div>
      </div>
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1 ? "Phường/Xã " : "Ward "}{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataWards ? dataWards : []}
            getOptionLabel={(option: any) => option?.full_name || ""}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            onOpen={() => {
              setIsClickWard(true);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1 ? "Phường/Xã " : "Ward "}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{
              marginTop: "8px",
              border: isClickWard && !selectedWard ? "1px solid red" : "none",
              borderRadius: isClickWard && !selectedWard ? "5px" : "",
            }}
          />
          {isClickWard && !selectedWard && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {languageRedux === 1
                ? "Vui lòng chọn phường/xã"
                : "Please select ward"}
            </p>
          )}
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1
              ? "Tên đường, toà nhà, số nhà "
              : "Street name, building name, house number "}{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={dataCompany?.address}
            onChange={handleChangeAddress}
            size="small"
            onClick={() => {
              setIsClickAddress(true);
            }}
            sx={{
              width: "100%",
              marginTop: "8px",
              border:
                isClickAddress && !dataCompany?.address
                  ? "1px solid red"
                  : "none",
              borderRadius:
                isClickAddress && !dataCompany?.address ? "5px" : "",
            }}
            placeholder={
              languageRedux === 1
                ? "Tên đường, toà nhà, số nhà "
                : "Street name, building name, house number "
            }
            disabled={is_profile ? true : false}
          />
          {isClickAddress && !dataCompany?.address && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {languageRedux === 1
                ? "Vui lòng nhập địa chỉ"
                : "Please enter address"}
            </p>
          )}
        </div>
      </div>
      <div className="w-full h-96 overflow-hidden rounded-md">
        {tabMap && (
          <MapComponent data={dataLocation} setData={setDataLocation} />
        )}
      </div>
    </div>
  );
});

export default memo(EditAddressCompany);
