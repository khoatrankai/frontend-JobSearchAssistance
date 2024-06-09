import historyRecruiter from "@/api/history/historyRecruiter";
import postsApi from "@/api/posts/postsApi";
import { useSrollContext } from "@/context/AppProvider";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";

type Props = {};

const RecruitmentRejectList = (props: Props) => {
  const [listData, setListData] = useState<any>([]);
  const { reponsiveMobile } = useSrollContext();
  const { pushBlank } = useRouterCustom();
  const [idPost, setIdPost] = useState<any>(null);
  const [listDataFilter, setListDataFilter] = useState<any>([]);
  const [listDataApply, setListDataApply] = useState<any>([]);
  const handleChangeID = (id: any) => {
    setIdPost(id);
  };
  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (value !== "") {
      const dataFil = listDataApply.filter((dt: any) => {
        const dataDes = dt.name + dt.name + dt.phone;
        if (dataDes.includes(value)) {
          return dt;
        }
      });
      setListDataFilter(dataFil);
    } else {
      setListDataFilter(listDataApply);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await historyRecruiter.getApplicationAll(idPost);
      if (data) {
        const dataFil = data.data.applications.filter((dt: any) => {
          if (dt.application_status === 3) {
            return dt;
          }
        });
        setListDataApply(dataFil);
      }
    };
    if (idPost) {
      fetchData();
    }
  }, [idPost]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await postsApi.ownPost();
      setListData(data.data);
      setIdPost(data.data?.[0]?.post_id);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setListDataFilter(listDataApply);
  }, [listDataApply]);
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-bold">Ứng viên</p>

      <div
        className={`flex justify-between gap-2 ${
          reponsiveMobile < 700 && "flex-col"
        }`}
      >
        <div className="flex text-xs font-semibold gap-2">
          <button className="border-r-[1px] px-2">
            Tất cả<span>({listDataFilter.length})</span>
          </button>
          <div className="flex gap-1 items-center">
            <p>Chọn ID bài viết :</p>
            <Select onChange={handleChangeID} value={idPost} className="w-32">
              {listData.map((dt: any) => {
                return (
                  <>
                    <Option value={dt.post_id}>{dt.post_id}</Option>
                  </>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="flex gap-x-1 items-center">
          <label>Tìm kiếm:</label>
          <input
            placeholder="Từ khóa"
            onChange={handleSearch}
            className="outline-none bg-gray-50 rounded-sm px-1 py-[2px] font-semibold w-56"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 py-2 px-4 rounded-md bg-gray-50 overflow-x-scroll">
        <div className="flex gap-x-2 min-w-[1152px]">
          <p className="basis-1/6">STT</p>
          <p className="basis-1/6">Tên ứng viên</p>
          <p className="basis-1/6">Email</p>
          <p className="basis-1/6">Số điện thoại</p>
          <p className="basis-1/6">ID Bài viết</p>
          <p className="basis-1/6">Chức năng</p>
        </div>
        <div className="flex flex-col gap-y-2 max-h-[315px]  min-w-[1152px] overflow-y-scroll">
          {listDataFilter.map((dt: any, index: any) => {
            return (
              <>
                <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
                  <p className="basis-1/6">{index + 1}</p>
                  <p className="basis-1/6">{dt.name}</p>
                  <p className="basis-1/6">{dt.email}</p>
                  <p className="basis-1/6">{dt.phone}</p>
                  <p className="basis-1/6">{idPost}</p>
                  <div className="basis-1/6 text-xs font-bold">
                    <button
                      className="p-2 rounded-md text-blue-500 hover:underline"
                      onClick={() => {
                        pushBlank(
                          `/recruiter/candidate-detail/${dt.id}POST${idPost}`
                        );
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentRejectList;
