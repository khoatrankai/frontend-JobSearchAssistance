import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShortText from "@/util/ShortText";
import communityApi from "@/api/community/apiCommunity";
type Props = {};

const BlogRecruiter = (props: Props) => {
  const { handleShortTextHome } = ShortText();
  const [dataBlog, setDataBlog] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await communityApi.getCommunityNews("0", "6", "cm", 0, "vi");

      if (res && res.status === 200) {
        setDataBlog(res.data.communications);
        console.log(res);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center bg-white py-10 px-5">
      <div className="max-w-6xl w-full overflow-hidden justify-center flex flex-col">
        <div className="w-full flex items-center justify-between mb-8">
          <p className="capitalize font-bold text-2xl ">Bài viết chia sẻ</p>
          <button className="text-blue-500 hover:text-blue-600 underline">
            Xem thêm
          </button>
        </div>

        <div className="flex gap-x-4 flex-wrap justify-center">
          {dataBlog.map((dt: any) => {
            return (
              <>
                <div className="rounded-xl max-w-[276px] min-w-[276px]  h-[400px] border-[1px] overflow-hidden bg-white group hover:border-blue-500">
                  <div className=" cursor-pointer">
                    <Image
                      className="w-full h-40"
                      src={dt.images[0].image}
                      alt=""
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className="px-4 pt-4 pb-3 flex flex-col gap-y-4">
                    <p className="text-xl font-bold group-hover:text-blue-500 cursor-pointer h-12">
                      {handleShortTextHome(dt.title, 20)}
                    </p>
                    <p className="text-sm">
                      {handleShortTextHome(dt.content, 130)}
                    </p>
                    <button
                      className="border-[1px] p-2 rounded-lg font-medium border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      onClick={() => {}}
                    >
                      Đọc thêm
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

export default BlogRecruiter;
