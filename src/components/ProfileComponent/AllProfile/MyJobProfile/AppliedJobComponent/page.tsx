import historyApplicator from "@/api/history/historyApplicator";
import JobCardHistory from "@/components/HistoryComponent/JobCardHistory/JobCardHistory";
import { RootState } from "@/redux";
import NoDataComponent from "@/util/NoDataPage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Select } from "antd";
import sortData from "@/util/SortDataHistory/sortData";

function AppliedJobComponent() {
    const [dataApplied, setDataApplied] = useState<any>(null);
    const [lastPostId, setLastPostId] = useState(0);
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language
    );
    const [newOld, setnewOld] = useState('Mới nhất');
    const router = useRouter();
    const getAllApproved = async () => {
        try {
            const result = await historyApplicator.getAllSubmitedApplied(
                null,
                10,
                1,
                languageRedux === 1 ? 'vi' : 'en',
            );

            if (result) {
                setDataApplied(result.data);
                setLastPostId(result.data[result.data.length - 1].id);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getAllApproved();
    }, []);

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
                <Select
                    defaultValue="Mới nhất"
                    style={{ width: 120 }}
                    onChange={(value) => {
                        setnewOld(value);
                        setDataApplied(sortData.sortDataByDate(value, dataApplied));
                    }}
                >
                    <Select.Option value="Mới nhất">Mới nhất</Select.Option>
                    <Select.Option value="Cũ nhất">Cũ nhất</Select.Option>
                </Select>
                <div className="mt-5">
                    {dataApplied && dataApplied.length > 0 ? dataApplied.map((item: any, index: number) => {
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
                            <div>
                                {
                                    item.application_status === 1 && <div className="text-green-500 font-bold">
                                        {languageRedux === 1 ? 'Đang tuyển' : 'Currently recruiting'}
                                    </div>

                                }
                                {
                                    item.application_status === 3 && <div className="text-red-500 font-bold">
                                        {languageRedux === 1 ? 'Từ chối' : 'Not accepted'}
                                    </div>
                                }
                                {
                                    item.application_status === 4 && <div className="text-blue-500 font-bold">
                                        {languageRedux === 1 ? 'Đã được tuyển' : 'RRecruited'}
                                    </div>
                                }
                                {
                                    (item.application_status !== 1 && item.application_status !== 3 && item.application_status !== 4) && <div className="text-yellow-500 font-bold">
                                        {languageRedux === 1 ? 'Hết hạn' : 'Expired'}
                                    </div>

                                }
                            </div>
                        </div>
                    }) : <NoDataComponent />}
                </div>
            </div>
        </div>
    );
}

export default AppliedJobComponent;
