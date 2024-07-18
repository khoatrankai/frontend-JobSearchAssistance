import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShortText from "@/util/ShortText";
import communityApi from "@/api/community/apiCommunity";
import { useRouter } from "next/navigation";
import { useSrollContext } from "@/context/AppProvider";
import SkeletonAll from "@/util/SkeletonAll";
type Props = {};

const BlogRecruiter = (props: Props) => {
  const { handleShortTextHome } = ShortText();
  const [dataBlog, setDataBlog] = useState<any>([]);
  const { reponsiveMobile } = useSrollContext();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const res = await communityApi.getCommunityNews("0", "4", "cm", 0, "vi");

      if (res && res.status === 200) {
        setDataBlog(res.data.communications);
        //console.log(res);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center bg-white py-10 px-5">
      <div className="max-w-6xl w-full overflow-hidden justify-center flex flex-col">
        <div className="w-full flex items-center justify-between mb-8">
          <p className="capitalize font-bold text-2xl ">Bài viết chia sẻ</p>
          <a
            className="text-blue-500 hover:text-blue-600 underline"
            href="/blog"
          >
            Xem thêm
          </a>
        </div>

        <SkeletonAll data={dataBlog} type={3}>
          <div className="flex gap-4 flex-wrap justify-center">
            {dataBlog.map((dt: any, index: any) => {
              return (
                <div
                  className={`rounded-xl  flex flex-col   border-[1px] overflow-hidden bg-white group hover:border-blue-500 ${
                    reponsiveMobile < 615
                      ? "w-full h-[500px]"
                      : "flex-1 min-w-[276px] h-[400px]"
                  }`}
                  key={index}
                >
                  <div className=" cursor-pointer">
                    <Image
                      className={`w-full ${
                        reponsiveMobile < 615 ? "h-64" : " h-40"
                      }`}
                      src={dt.images?.[0]?.image}
                      alt=""
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className="px-4 pt-4 pb-3 flex flex-col gap-y-4 justify-between flex-1">
                    <p className="text-xl font-bold group-hover:text-blue-500 cursor-pointer h-12">
                      {handleShortTextHome(dt.title, 20)}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: dt.content }}
                      className="max-h-20 h-full overflow-hidden"
                    ></div>
                    {/* <p className="text-sm">
                      {handleShortTextHome(dt.content, 130)}
                    </p> */}
                    <button
                      className="border-[1px] p-2 rounded-lg font-medium border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      onClick={() => {
                        router.push(
                          `/detail-community?post-community=${dt.id}&type=0`
                        );
                      }}
                    >
                      Đọc thêm
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </SkeletonAll>
      </div>
    </div>
  );
};

export default BlogRecruiter;
