import candidateSearch from "@/api/candidate/apiCandidates";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

function CompanyViewProfileComponent() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await candidateSearch.getViewProfile();

      if (response && response.status === 200) {
        setData(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  //console.log(data);
  return (
    <div className="flex flex-col h-full">
      <div>
        {data.length > 0 ? (
          data.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-between flex-row bg-white p-3 mt-3 rounded-lg cursor-pointer"
                onClick={() => {
                  router.push(`/company-detail/${item.company?.id}`);
                }}
                style={{
                  border: "1px solid rgb(239, 239, 239)",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex gap-3">
                  <div className="flex flex-col">
                    <img
                      src={item?.company?.logoPath}
                      alt=""
                      width={70}
                      height={70}
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold">
                      {item.company?.name}
                    </div>
                    <div className="flex gap-1 items-center">
                      <FaAddressCard />
                      <div>{item.company?.address}</div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <CgWebsite />
                      <div>{item.company?.website}</div>
                    </div>
                  </div>
                </div>
                <div className="flex font-bold font-serif text-[13px] text-red-500">
                  <div>{item.company.companyRole.name}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="flex justify-center items-center h-40">
              <div className="text-lg font-bold items-center mt-32 flex flex-col gap-2">
                <img
                  className="m-auto"
                  src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1710311631/images/icons/oby2vzqlpl7wby3twn8m.png"
                  alt=""
                  width={150}
                  height={150}
                />

                <div className="flex justify-center">
                  Chưa có nhà tuyển dụng xem hồ sơ
                </div>
                <div
                  className="flex justify-center font-bold text-blue-500 cursor-pointer text-sm"
                  onClick={() => {
                    router.push("/company-all");
                  }}
                >
                  Theo dõi công ty để nhận tin sớm nhất
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyViewProfileComponent;
