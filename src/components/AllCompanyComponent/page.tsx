/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import { ToastContainer } from "react-toastify";
import apiCompany from "@/api/company/apiCompany";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SkeletonAll from "@/util/SkeletonAll";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { fontStyle } from "html2canvas/dist/types/css/property-descriptors/font-style";
import SizeContext from "antd/es/config-provider/SizeContext";

// import { analytics } from "@/configs/firebase";
// import { logEvent } from "firebase/analytics";
type Props = {};

interface ICompany {
  status: number;
  data: any;
}

const AllCompanyComponent = (props: Props) => {
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    handleUpData,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(15);
  const [page, setPage] = useState<number>(0);
  const [listCompany, setListCompany] = useState<any[]>([]);
  const router = useRouter();
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [dataCompany, setDataCompany] = useState<any>([
    { name: "acer", link: "https://www.acer.com/" },
    // { name: "apple", link: "https://www.acer.com/" },
    { name: "asus", link: "https://www.acer.com/" },
    { name: "dell", link: "https://www.acer.com/" },
    { name: "hp", link: "https://www.acer.com/" },
    { name: "lenovo", link: "https://www.acer.com/" },
    { name: "microsoft", link: "https://www.acer.com/" },
    { name: "razer", link: "https://www.acer.com/" },
    { name: "rog", link: "https://www.acer.com/" },
    { name: "disney", link: "https://www.acer.com/" },
    { name: "hcmute", link: "https://www.acer.com/" },
    { name: "just", link: "https://www.acer.com/" },
    { name: "nike", link: "https://www.acer.com/" },
    { name: "nissan", link: "https://www.acer.com/" },
    { name: "tesla", link: "https://www.acer.com/" },
  ]);
  useEffect(() => {
    handleUpData();
  }, [listCompany]);

  const fetchData = async () => {
    const res = (await apiCompany.getAllCompany(
      page,
      10
    )) as unknown as ICompany;

    if (res && res.status === 200) {
      setListCompany(res.data?.companies);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePrevNewJob = () => {
    setPage(page - 1);
  };

  const handleNextNewJob = () => {
    setPage(page + 1);
  };

  const handleGetData = async (id: number) => {
    // logEvent(analytics, "select_company");
    router.push(`/company-detail/${id}`);
  };

  return (
    <div className="flex justify-center w-full px-5">
      <div className="pt-8 pb-4 max-w-6xl w-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-white">
            {language === 1 ? `Công ty nổi bật` : `Outstanding company`}
          </h1>

          <div className="flex items-center gap-5">
            {/* <div
              className="font-bold text-black hover:text-blue-500 hover:tex cursor-pointer  text-white"
              onClick={() => {
                router.push("/company-all");
              }}
            >
              {language === 1 ? "Xem thêm" : "See more"}
            </div> */}
          </div>
        </div>
        <SkeletonAll data={listCompany}>
          <div className="relative" style={{ marginBottom: "30px" }}>
            {checkPrev && (
              <div className="absolute group inset-y-0 flex items-center left-0 w-12 justify-center z-10">
                <button
                  className="p-1 border-[1px] hover:border-blue-500 hover:text-blue-500 text-white  rounded-full transition-all group-hover:p-2"
                  onClick={handlePrev}
                >
                  <MdKeyboardArrowLeft />
                </button>
              </div>
            )}

            <ul
              ref={ref_list_slider}
              className={` select-none inline-flex justify-center gap-[15px] duration-500`}
            >
              {listCompany &&
                listCompany?.length > 0 &&
                listCompany.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer w-[276.75px] h-[220px] p-4 rounded-xl bg-black shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[0px_0px_7px_0px_#63b3ed] transition-all duration-500 group border-[#dee0e2] flex flex-col border-2 justify-center overflow-hidden hover:border-blue-500"
                    onClick={() => {
                      if (checkClick) {
                        handleGetData(item.id);
                      } else {
                        setCheckClick(true);
                      }
                    }}
                  >
                    <div className="basis-7/12 flex items-end justify-center bg-black/10">
                      <img
                        src={
                          item.logoPath
                            ? `/company/logo${dataCompany[index].name}.png`
                            : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701273430/images/mailchimp/ads_mail/uk1usmfh6phaft7eqo8e.jpg"
                        }
                        className="pointer-events-none w-[180px] h-[96px] rounded-lg overflow-hidden object-contain"
                        width={186}
                        height={96}
                        alt="Kinh doanh"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement>
                        ) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697131521/images/mailchimp/ads_mail/logoCircle.png";
                        }}
                      />
                    </div>

                    <p className="mt-3 font-bold text-center text-sm text-white uppercase flex-1 flex justify-center bg-transparent group-hover:text-blue-500  transition-all duration-500">
                      {item.name}
                    </p>
                  </li>
                ))}
            </ul>
            {checkNext && (
              <div className="absolute group inset-y-0 flex items-center right-0 w-12 justify-center z-10">
                <button
                  className="p-1 border-[1px] hover:border-blue-500 hover:text-blue-500 text-white group-hover:p-2 transition-all rounded-full"
                  onClick={handleNext}
                >
                  <MdKeyboardArrowRight />
                </button>
              </div>
            )}
          </div>
        </SkeletonAll>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllCompanyComponent;
