import categoryApi from "@/api/category/categoryApi";
import keywordNotifyApi from "@/api/keywordNotify/keywordNotifyApi";
import locationApi from "@/api/location/locationApi";
import { useSrollContext } from "@/context/AppProvider";
import ToastCustom from "@/util/ToastCustom";
import { Button, Input, Select, Switch } from "antd";
import { text } from "node:stream/consumers";
import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

type Props = {};

const KeywordProfile = (props: Props) => {
  const { hdError, hdSuccess } = ToastCustom();
  const { Option } = Select;
  const { updateHandleAlert, setContentAlert } = useSrollContext();
  const [listCategories, setListCategories] = useState<any>([]);
  const [listProvinces, setListProvinces] = useState<any>([]);
  const [idProvinces, setIdProvinces] = useState<any>();
  const [tabModal, setTabModal] = useState<boolean>(false);
  const [dataRequest, setDataRequest] = useState<any>({
    category_status: 1,
    district_status: 1,
  });
  const [listDistricts, setListDistricts] = useState<any>([]);
  const [listKeyword, setListKeyword] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const dataCategories = await categoryApi.getParentCategory("vi");
      setListCategories(dataCategories.data);
      const dataProvinces = await locationApi.getAllProvinces("vi");
      setListProvinces(dataProvinces.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const dataDistricts = await locationApi.getDistrictsById(
        idProvinces,
        "vi"
      );
      setListDistricts(dataDistricts.data);
    };
    if (idProvinces) {
      fetchData();
    }
  }, [idProvinces]);
  useEffect(() => {
    handleGetKeyword();
  }, []);

  const handleReset = () => {
    setDataRequest({
      category_status: 1,
      district_status: 1,
    });
  };
  const handleGetKeyword = async () => {
    setListKeyword([]);

    const data = await keywordNotifyApi.getListKeyword();
    if (data) {
      setListKeyword(data.data.keywords);
    }
  };
  const handleChange = async (id: any, status: any) => {
    const dataRes: any = await keywordNotifyApi.changeStatusKeyword(id, status);
    if (dataRes && dataRes.success) {
      if (status) {
        hdSuccess("Bật keyword tìm việc thành công");
      } else {
        hdSuccess("Tắt keyword tìm việc thành công");
      }
    } else {
      if (status) {
        hdSuccess("Bật keyword tìm việc không thành công");
      } else {
        hdSuccess("Tắt keyword tìm việc không thành công");
      }
    }
  };
  const handleDelete = async (id: any) => {
    const dataRes: any = await keywordNotifyApi.deleteKeyword(id);
    if (dataRes && dataRes.success) {
      hdSuccess("Xóa keyword tìm việc thành công");
      handleGetKeyword();
    } else {
      hdError("Xóa keyword tìm việc không thành công");
    }
  };
  const handleAdd = async () => {
    const dataRes: any = await keywordNotifyApi.createKeyword(dataRequest);
    if (dataRes && dataRes.code === 201) {
      hdSuccess("Tạo keyword tìm việc thành công");

      handleGetKeyword();
      setTabModal(false);
      handleReset();
    } else {
      hdError("Tạo keyword tìm việc không thành công");
    }
  };
  return (
    <div className="mt-4 bg-white p-3 rounded-lg flex flex-col gap-4">
      <div className="mb-4 flex items-center gap-2">
        <p className="text-2xl font-bold ">Cài đặt từ khóa tìm việc</p>
        <IoAddCircle
          className="text-blue-600 text-4xl cursor-pointer"
          onClick={() => {
            handleReset();
            setTabModal(true);
          }}
        />
      </div>
      <div className="flex flex-col gap-4 max-h-[630px] overflow-y-scroll">
        {listKeyword.map((dt: any, ikey: any) => {
          return (
            <>
              <div
                className="flex flex-col p-4 border-2 rounded-md gap-2 max-w-2xl"
                key={ikey}
              >
                <div className="flex justify-between pb-2 border-b-2">
                  <p>
                    Từ khóa:<span className="font-semibold">{dt.keyword}</span>
                  </p>
                  <div className="flex gap-2 items-center">
                    <MdDeleteForever
                      className="text-2xl hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        setContentAlert({
                          title: "Bạn có muốn xóa keyword này",
                          confirmAgain: "Bạn chắc chắn chưa",
                        });
                        updateHandleAlert(() => {
                          handleDelete(dt.id);
                        });
                      }}
                    />

                    <Switch
                      className="bg-black"
                      defaultValue={dt.status === 1}
                      onChange={(e: any) => {
                        handleChange(dt.id, e ? 1 : 0);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-2 pb-2 border-b-2">
                  <div className="p-1 rounded-md bg-blue-500 text-white flex gap-1 items-center">
                    <FaSearchLocation />
                    <span>{dt.district.name}</span>
                  </div>
                  <div className="p-1 rounded-md bg-blue-500 text-white flex gap-1 items-center">
                    <BiSolidCategory />
                    <span>{dt.category.name}</span>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div className="text-blue-600 font-semibold text-sm">
                    Xem việc làm
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {tabModal && (
        <div
          className="z-40 fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => {
            setTabModal(false);
            handleReset();
          }}
        >
          <div
            className="bg-white w-full max-w-3xl p-8 rounded-md flex flex-col gap-4"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <p className="text-xl font-semibold text-center mb-4">
              Thông tin từ khóa
            </p>
            <Input
              placeholder="Từ khóa"
              className="rounded-md"
              onChange={(e: any) => {
                setDataRequest({ ...dataRequest, keyword: e.target.value });
              }}
            />
            <Select
              placeholder={"Chọn thành phố"}
              className="rounded-md"
              onChange={(e: any) => {
                setIdProvinces(e);
              }}
            >
              {listProvinces.map((dt: any, ikey: any) => {
                return (
                  <Option key={ikey} value={dt.id}>
                    {dt.name}
                  </Option>
                );
              })}
            </Select>
            <Select
              placeholder={"Chọn quận/huyện"}
              className="rounded-md"
              onChange={(e: any) => {
                setDataRequest({ ...dataRequest, district_id: e.toString() });
              }}
            >
              {listDistricts.map((dt: any, ikey: any) => {
                return (
                  <Option key={ikey} value={dt.id}>
                    {dt.full_name}
                  </Option>
                );
              })}
            </Select>

            <Select
              placeholder={"Chọn danh mục"}
              className="rounded-md"
              onChange={(e: any) => {
                setDataRequest({ ...dataRequest, category_id: e });
              }}
            >
              {listCategories.map((dt: any, ikey: any) => {
                return (
                  <Option key={ikey} value={dt.id}>
                    {dt.name}
                  </Option>
                );
              })}
            </Select>
            <div className="flex justify-end gap-2 mt-2 w-full">
              <Button
                onClick={() => {
                  setTabModal(false);
                  handleReset();
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  handleAdd();
                }}
              >
                Thêm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordProfile;
