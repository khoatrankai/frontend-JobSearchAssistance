import historyApplicator from "@/api/history/historyApplicator";
import JobCardHistory from "@/components/HistoryComponent/JobCardHistory/JobCardHistory";
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

function SavedJobComponent() {
  const [lastPostId, setLastPostId] = useState(0);
  const [dataBookmarks, setDataBookmarks] = useState<any>(null);
  const [newOld, setnewOld] = useState('Mới nhất');

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const router = useRouter();

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyBookmark.getAllBookmark(
        newCount,
        10,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setLastPostId(result.data[result.data.length - 1].bookmark_id);
        setDataBookmarks(sortData.sortDataByDate(newOld, result.data));
      }
    } catch (error) {
      console.log('error', error);
    }
  };


  useEffect(() => {
    getAllPosted(0);
  }, []);

  const handleBoookmark = (id: number) => {
    try {
      const fetchData = async () => {
        const response = await bookMarkApi.deleteBookMark(id) as any;
        if (response && response.code === 200) {
          getAllPosted(0);
        }

      }
      fetchData();
    } catch (error) {

    }
  }

  const checkTitle = (title: string) => {
    if (title.length > 60) {
      return title.slice(0, 20) + '...';
    } else {
      return title;
    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="mt-5">
          {dataBookmarks && dataBookmarks.length > 0 ? dataBookmarks.map((item: any, index: number) => {
            return <div key={index} className="justify-between flex gap-3" onClick={() => {
              router.push(`/post-detail/${item.post_id}`);
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
                  <img src={item.image} alt="" width={100} height={100} className="rounded-lg shadow-2xl" />
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
                      {item?.company_name}
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-1 items-center">
                      <div>
                        <IoIosTime />
                      </div>
                      <div>
                        {item?.created_at_text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={(e) => {
                e.stopPropagation();
                handleBoookmark(item.post_id)
              }}>
                {item.bookmark_id ? (
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

export default SavedJobComponent;
