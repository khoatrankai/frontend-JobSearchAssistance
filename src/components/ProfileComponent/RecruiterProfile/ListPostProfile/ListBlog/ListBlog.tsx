import communityApi from "@/api/community/apiCommunity";
import postsApi from "@/api/posts/postsApi";
import { useSrollContext } from "@/context/AppProvider";
import ShortText from "@/util/ShortText";
import ToastCustom from "@/util/ToastCustom";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import { Button, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";

type Props = {};

const ListBlog = (props: Props) => {
  const [listStatus, setListStatus] = useState<any>([0, 1]);
  const { setTabAlert, updateHandleAlert, reponsiveMobile } = useSrollContext();
  const { pushBlank, pushRouter } = useRouterCustom();
  const { hdError, hdSuccess } = ToastCustom();
  const { handleShortTextHome } = ShortText();
  const [listData, setListData] = useState<any>([]);
  const [listDataFilter, setListDataFilter] = useState<any>([]);
  const [idDelete, setIdDelete] = useState<any>();
  const [modalConfirm, setModalConfirm] = useState<any>(false);
  const handleUpdateStatus = async (id: any, status: any) => {
    const formData = new FormData();
    formData.append("status", status);
    const data = await communityApi.putCommunityByAccountRecruiter(
      id,
      formData
    );
    if (data) {
      hdSuccess("Cập nhật trạng thái bài " + id + " thành công");
    } else {
      hdError("Lỗi không thể cập nhật");
    }
  };
  const handleDeletePost = async () => {
    if (idDelete) {
      const res: any = await communityApi.deleteCommunityRecruiter(idDelete);
      if (res && res?.statusCode === 200) {
        setListData(
          listData?.filter((dt: any) => {
            return dt?.id != idDelete;
          })
        );
        hdSuccess("Xoá bài viết thành công");
        setModalConfirm(false);
      } else {
        hdError("Xóa bài viết thất bại");
      }
    }
  };
  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (value !== "") {
      const dataFil = listData.filter((dt: any) => {
        const dataDes = dt.post_id + dt.title;
        if (dataDes?.toLowerCase().includes(value?.toLowerCase())) {
          return dt;
        }
      });
      setListDataFilter(dataFil);
    } else {
      setListDataFilter(listData);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await communityApi.getCommunityByAccountRecruiter(
        "0",
        "20",
        "l",
        "vi"
      );
      // console.log(data);
      if (data) setListData(data.data.communications);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setListDataFilter(listData);
  }, [listData]);
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-bold">Các bài viết</p>
        <button
          className="p-2 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600"
          onClick={() => {
            pushRouter(`/recruiter/community-create`);
          }}
        >
          Tạo bài viết
        </button>
      </div>
      <div
        className={`flex justify-between gap-2 ${
          reponsiveMobile < 700 && "flex-col"
        }`}
      >
        <div className="flex text-xs font-semibold">
          <button>
            Tất cả<span>({listDataFilter.length})</span>
          </button>
          {/* <button className=" px-2">
            Ứng viên tiềm năng<span>(10)</span>
          </button> */}
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
      <div className="flex flex-col gap-y-4 py-2 px-4 rounded-md bg-gray-50 w-full overflow-x-scroll">
        <div className="flex gap-x-2 min-w-[1152px]">
          <p className="basis-1/12">ID Bài viết</p>
          <p className="basis-2/6">Tên bài đăng</p>
          <p className="basis-1/6">Ngày đăng</p>
          <p className="basis-1/6">Trạng thái</p>
          <p className="basis-1/4">Chức năng</p>
        </div>
        <div className="flex flex-col gap-y-2 max-h-[315px] overflow-y-scroll  min-w-[1152px]">
          {listDataFilter.map((dt: any) => {
            return (
              <>
                <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
                  <p className="basis-1/12">{dt.id}</p>
                  <p className="basis-2/6">
                    {handleShortTextHome(dt.title, 20)}
                  </p>
                  <p className="basis-1/6">{dt.createdAtText}</p>
                  <div className="basis-1/6">
                    <Select
                      onChange={(e: any) => {
                        handleUpdateStatus(dt.id, e);
                      }}
                      defaultValue={dt.type}
                      className="w-28"
                    >
                      {listStatus.map((dt: any) => {
                        if (dt === 0)
                          return (
                            <>
                              <Option value={dt}>Ẩn</Option>
                            </>
                          );
                        return (
                          <>
                            <Option value={dt}>Hiện</Option>
                          </>
                        );
                      })}
                    </Select>
                  </div>

                  <div className="basis-1/4 text-xs font-bold">
                    <button
                      className="p-2 rounded-md text-blue-500 hover:underline"
                      onClick={() => {
                        pushRouter(
                          `/recruiter/detail-community?post-community=${dt.id}`
                        );
                      }}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="p-2 rounded-md text-yellow-500 hover:underline"
                      onClick={() => {
                        pushRouter(
                          `/recruiter/community-create?post-community=${dt.id}`
                        );
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="p-2 rounded-md text-red-500 hover:underline"
                      onClick={() => {
                        setIdDelete(dt?.id);
                        setModalConfirm(true);
                      }}
                    >
                      Xóa
                    </button>
                    {/* <button
                      className="p-2 rounded-md text-green-500 hover:underline"
                      onClick={() => {
                        pushBlank(
                          `/recruiter/new-post-availabel/${dt.post_id}`
                        );
                      }}
                    >
                      Đăng lại
                    </button> */}
                    {/* <button className="p-2 rounded-md text-red-500 hover:underline">
                      Xóa
                    </button> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Modal
        width={500}
        centered
        title={
          <h3
            style={{
              fontFamily: "Roboto",
              fontSize: "24px",
              lineHeight: "24px",
              letterSpacing: "0em",
              textAlign: "center",
            }}
          >
            {true ? "Xác nhận xóa bài viết" : "Confirm deletion of post"}
          </h3>
        }
        footer={null}
        open={modalConfirm}
        onCancel={() => {
          setModalConfirm(false);
        }}
      >
        <p
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          {true
            ? "Bạn có chắc xoá bài viết này ?"
            : "Are you sure to delete this post?"}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handleDeletePost()}
            className="border-red-500 bg-red-500 mr-3 mt-2"
          >
            {true ? "Xóa" : "Delete"}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={() => {
              setModalConfirm(false);
            }}
            className="bg-slate-300"
          >
            {true ? "Hủy" : "Cancel"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListBlog;
