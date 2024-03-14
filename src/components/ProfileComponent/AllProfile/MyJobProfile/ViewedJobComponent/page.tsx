import sortData from "@/util/SortDataHistory/sortData";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import { IoIosTime } from "react-icons/io";
import NoDataComponent from "@/util/NoDataPage";
import { apiViewJob } from "@/api/apiViewJob/apiViewJob";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";

function ViewedJobComponent() {
  const [data, setData] = useState([]);
  const [newOld, setnewOld] = useState("Mới nhất");
  const router = useRouter();

  const checkTitle = (title: string) => {
    if (title?.length > 50) {
      return title.slice(0, 50) + "...";
    } else {
      return title;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiViewJob.getAllViewJob() as any;
        if (response && response.status === 200) {
          setData(sortData.sortDataByDate(newOld, response.data));
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchData();
  }, []);

  const handleBookmark = async (postId: number, bookmark: any) => {
    try {
      const fetchData = async () => {
        if (bookmark?.length === 0) {
          const response = await bookMarkApi.createBookMark(postId) as any;
          if (response) {
            const responseData = await apiViewJob.getAllViewJob() as any;
            if (responseData && responseData.status === 200) {
              setData(sortData.sortDataByDate(newOld, responseData.data));
            }
          }
        } else {
          const response = await bookMarkApi.deleteBookMark(postId) as any;
          if (response) {
            const responseData = await apiViewJob.getAllViewJob() as any;
            if (responseData && responseData.status === 200) {
              setData(sortData.sortDataByDate(newOld, responseData.data));
            }
          }
        }
      }
      fetchData();
    } catch (error) {

    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <Select
          defaultValue="Mới nhất"
          style={{ width: 120 }}
          onChange={(value) => {
            setnewOld(value);
            setData(sortData.sortDataByDate(value, data));
          }}
        >
          <Select.Option value="Mới nhất">Mới nhất</Select.Option>
          <Select.Option value="Cũ nhất">Cũ nhất</Select.Option>
        </Select>
        <div className="mt-5">
          {data && data.length > 0 ? data.map((item: any, index: number) => {
            return <div key={index} className="justify-between flex gap-3" onClick={() => {
              router.push(`/post-detail/${item.postData.id}`);
            }} style={{
              border: '1px solid #e5e7eb',
              padding: '10px',
              marginTop: '10px',
              borderRadius: '10px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <div className="flex gap-2">
                <div>
                  <img src={item.postData.image} alt="" width={100} height={100} className="rounded-lg shadow-2xl" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="font-serif font-bold text-[17px]">
                    {checkTitle(item.title)}
                  </div>
                  <div className="flex gap-1 items-center">
                    <div>
                      <FaAddressCard />
                    </div>
                    <div>
                      {item?.postData.companyName}
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-1 items-center">
                      <div>
                        <IoIosTime />
                      </div>
                      <div>
                        {item?.postData.createdAtText}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={(e) => {
                e.stopPropagation();
                handleBookmark(item.postData.id, item?.postData.bookmarks);
              }}>
                {item?.postData.bookmarks.length > 0 ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
              </div>
            </div>
          }) : <NoDataComponent />}

        </div>
      </div>
    </div>
  );
}

export default ViewedJobComponent;