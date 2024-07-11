import { RootState } from "@/redux";
import NoDataComponent from "@/util/NoDataPage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { useRouter } from "next/navigation";
import sortData from "@/util/SortDataHistory/sortData";
import historyBookmark from "@/api/historyBookmark";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { Select } from "antd";
import ToastCustom from "@/util/ToastCustom";
import communityApi from "@/api/community/apiCommunity";
import ShortText from "@/util/ShortText";

function SavedBlogComponent() {
  const [lastPostId, setLastPostId] = useState(0);
  const { handleShortTextHome, handleConvertText } = ShortText();
  const { hdError, hdSuccess } = ToastCustom();
  const [dataBookmarks, setDataBookmarks] = useState<any>(null);
  const [newOld, setnewOld] = useState("Mới nhất");

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const router = useRouter();

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await communityApi.getCommunityBookmarkedRecruiter(0);

      if (result) {
        // setLastPostId(result.data[result.data.length - 1]?.bookmark_id);
        // setDataBookmarks(sortData.sortDataByDate(newOld, result.data));
        setDataBookmarks(result.data.communications);
      }
    } catch (error) {
      //console.log('error', error);
    }
  };

  useEffect(() => {
    getAllPosted(lastPostId);
  }, []);

  const handleBoookmark = async (id: number) => {
    try {
      const result = await communityApi.postCommunityBookmarkedRecruiter(id);
      if (result) {
        if (result.status === 200) {
          hdSuccess("Bỏ theo dõi thành công");
          setDataBookmarks(
            dataBookmarks.filter((dt: any) => {
              return dt.communicationData.id !== id;
            })
          );
        } else {
          hdError("Bỏ theo dõi không thành công");
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const checkTitle = (title: string) => {
    if (title.length > 60) {
      return title.slice(0, 20) + "...";
    } else {
      return title;
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        {/* <Select
          defaultValue="Mới nhất"
          style={{ width: 120 }}
          onChange={(value) => {
            // setnewOld(value);
            // setDataBookmarks(sortData.sortDataByDate(value, dataBookmarks));
          }}
        >
          <Select.Option value="Mới nhất">Mới nhất</Select.Option>
          <Select.Option value="Cũ nhất">Cũ nhất</Select.Option>
        </Select> */}
        <div className="mt-5 overflow-y-scroll h-[470px]">
          {dataBookmarks && dataBookmarks.length > 0 ? (
            dataBookmarks.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="justify-between flex gap-3"
                  onClick={() => {
                    router.push(`/post-detail/${item.communicationData.id}`);
                  }}
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={item.communicationData.images[0].image}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-lg shadow-2xl"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="font-serif font-bold text-[17px]">
                        {checkTitle(item.communicationData.title)}
                      </div>
                      <div className="flex gap-1 items-center">
                        <div>
                          <FaAddressCard />
                        </div>
                        <div>
                          {handleShortTextHome(
                            handleConvertText(item?.communicationData?.content),
                            20
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-1 items-center">
                          <div>
                            <IoIosTime />
                          </div>
                          <div>{item.communicationData?.createdAtText}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBoookmark(item.communicationData.id);
                    }}
                  >
                    {item.communicationData.bookmarked ? (
                      <SaveIconFill width={24} height={24} />
                    ) : (
                      <SaveIconOutline width={24} height={24} />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <NoDataComponent />
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedBlogComponent;
