"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./styles.scss";
import { useRouter } from "next/navigation";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { IoIosClose } from "react-icons/io";
import { TextareaAutosize } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";
import axiosClient from "@/configs/axiosClient";
import { useSrollContext } from "@/context/AppProvider";

const ChatRoll: React.FC = () => {
  const [showButton, setShowButton] = useState(true);
  const { reponsiveMobile: reponsiveMobileCheck } = useSrollContext();
  const [questionSurvey, setQuestionSurvey] = useState<any>([
    {
      question: "Khi làm việc, bạn có xu hướng",
      answer: [
        "Tập trung vào chi tiết và thực tế",
        "Tìm kiếm ý tưởng mới và khám phá",
      ],
      type: ["S", "N"],
    },
    {
      question: "Đối với công việc, bạn muốn",
      answer: [
        "Một môi trường chuyên nghiệp và có quy tắc rõ ràng",
        "Một môi trường linh hoạt và sáng tạo",
      ],
      type: ["J", "P"],
    },
    {
      question: "Khi giao tiếp với người khác, bạn thích",
      answer: [
        "Diễn đạt ý kiến một cách trực tiếp và logic",
        "Quan tâm đến cảm xúc và tạo môi trường hòa đồng",
      ],
      type: ["T", "F"],
    },
    {
      question: "Khi đối mặt với thách thức, bạn có xu hướng",
      answer: [
        "Áp dụng logic và phân tích để tìm giải pháp",
        "Dựa vào trực giác và cảm tính để đưa ra quyết định",
      ],
      type: ["T", "F"],
    },
    {
      question: "Trong cuộc sống hàng ngày, bạn thích",
      answer: [
        "Có thời gian một mình và tập trung vào nội tâm",
        "Tương tác với người khác và thích tham gia vào xã hội",
      ],
      type: ["I", "E"],
    },
    {
      question: "Khi làm việc nhóm, bạn thích",
      answer: [
        "Có kế hoạch cụ thể và tuân thủ quy trình",
        "Tạo ra sự linh hoạt và sáng tạo trong quá trình làm việc",
      ],
      type: ["J", "P"],
    },
    {
      question: "Khi đối mặt với sự thay đổi, bạn có xu hướng",
      answer: [
        "Ưu tiên sự ổn định và giữ nguyên trạng thái hiện tại",
        "Linh hoạt và sẵn lòng chấp nhận sự thay đổi",
      ],
      type: ["S", "N"],
    },
    {
      question: "Trong việc lựa chọn thiết kế và phong cách, bạn thích",
      answer: [
        "Phong cách truyền thống và thanh lịch",
        "Phong cách sáng tạo và độc đáo",
      ],
      type: ["S", "N"],
    },
  ]);
  const [mbti, setMBTI] = useState<any>([
    "tinh tế",
    "hiện đại",
    "chuyên nghiệp",
    "tiêu chuẩn",
    "chuyên gia",
    "thời đại",
    "thanh lịch",
    "thích nhiều màu",
    "đam mê",
    "trang trọng",
    "đơn giản",
    "thành đạt",
    "cổ điển",
  ]);
  const [listAnswer, setListAnswer] = useState<any>([]);
  const [turnQuestion, setTurnQuestion] = useState<any>(0);
  const [tabChoose, setTabChoose] = useState<any>(0);
  const [listChat, setListChat] = useState<any>([]);
  const [idChat, setIdChat] = useState<any>(null);
  const [reponsiveMobile, setReponsiveMobile] = useState<boolean>(false);
  const [waitLoading, setWaitLoading] = useState<boolean>(false);
  const [tabSurvey, setTabSurvey] = useState<boolean>(true);
  const [contentMess, setContentMess] = useState<any>("");
  const refMess = useRef<any>();
  const router = useRouter();
  const handleScrollMess = () => {
    if (refMess && listChat.length > 2)
      refMess.current.scrollTop = refMess.current.scrollHeight;
  };
  const handleCheckCV = () => {
    let itemMang = "";
    const uniqueNames = listAnswer.filter((name: any, index: any) => {
      return listAnswer.indexOf(name) === index;
    });
    uniqueNames.forEach((dt: any) => {
      if (dt === "S") {
        itemMang = itemMang + mbti[0] + mbti[6] + mbti[10] + mbti[12];
      }
      if (dt === "N") {
        itemMang = itemMang + mbti[1] + mbti[5];
      }
      if (dt === "J") {
        itemMang = itemMang + mbti[2] + mbti[3] + mbti[6] + mbti[9] + mbti[11];
      }
      if (dt === "T") {
        itemMang = itemMang + mbti[4] + mbti[8];
      }
      if (dt === "F") {
        itemMang = itemMang + mbti[8];
      }
      if (dt === "P") {
        itemMang = itemMang + mbti[10];
      }
    });
    return itemMang + ":" + "http://localhost:3000/cv/create-v2/1/new";
  };
  const handleChatBot = async () => {
    // const data: any = await axios.pó("https://aitraining.onrender.com/aiJob/");
    // //console.log(data);
    const dataVip: any = await axiosClient.post(
      "https://aitraining.onrender.com/aiChat/",
      {
        id: idChat.toString(),
        content: listChat?.[listChat.length - 1]?.content,
      }
    );
    if (dataVip) {
      setListChat([...listChat, { role: "bot", content: dataVip.data }]);
      setWaitLoading(false);
    }
  };
  const handleAddMess = () => {
    if (!waitLoading) {
      setListChat([...listChat, { role: "user", content: contentMess }]);
      setContentMess("");
      setWaitLoading(true);
    }
  };
  const handleCreateAI = async () => {
    const dataId = await axiosClient.post(
      "https://aitraining.onrender.com/aiStartChat/"
    );
    console.log(dataId);
    if (dataId) {
      setIdChat(dataId.data);
      setListChat([
        { role: "bot", content: "Xin chào bạn mình là AI của JOBIT2024 ^^" },
        { role: "bot", content: "Bạn cần mình giúp gì không ạ ?" },
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleChatBot();
    };

    if (waitLoading) {
      fetchData();
    }
  }, [waitLoading, listChat]);
  useEffect(() => {
    handleScrollMess();
  }, [listChat]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1350) {
        setReponsiveMobile(true);
      } else {
        setReponsiveMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (listAnswer.length === questionSurvey.length) {
      setListChat([
        ...listChat,
        {
          role: "bot",
          content: handleCheckCV(),
        },
      ]);
    }
  }, [listAnswer]);
  return (
    <div className="roll-top-container relative z-40">
      {showButton && (
        <div
          className={`group flex border-4 justify-center items-center rounded-full cursor-pointer ${
            reponsiveMobileCheck < 800 ? "hidden" : ""
          } ${
            reponsiveMobile
              ? "roll-chat-btn-mobile bottom-[125px]"
              : "roll-chat-btn bottom-[130px]"
          }`}
          // shape="circle"
          // icon={

          // }
          // onClick={() => {
          //   router.push("/chat-bot");
          // }}
        >
          <SmartToyIcon className="text-white group-hover:text-blue-500" />
          <div className="group-hover:w-80 px-4 group-hover:h-96 max-h-96 h-0 w-0 opacity-0 group-hover:opacity-100 absolute group-hover:right-full right-0 bottom-0 transition-all duration-500">
            <div className="w-full h-full flex flex-col justify-between rounded-md overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="h-12 bg-blue-700 bg-chat flex justify-between px-4  items-center">
                <SmartToyIcon className="text-white" />
                <div className="flex items-center gap-2">
                  <button className="p-1">
                    <SlOptionsVertical className="text-white text-base" />
                  </button>
                  {/* <button className="p-1">
                    <IoIosClose className="text-white" />
                  </button> */}
                </div>
              </div>

              {idChat >= 0 && idChat != null && tabChoose === 1 && (
                <div
                  className="flex-1 bg-white overflow-y-scroll my-4 px-4"
                  ref={refMess}
                >
                  <div className="h-full w-full flex flex-col gap-4">
                    {listChat.map((dt: any) => {
                      if (dt.role === "bot") {
                        return (
                          <>
                            <div className="w-full flex justify-end">
                              <div className="flex gap-2 w-full items-end">
                                <div className="w-8 h-8 rounded-full bg-blue-900 min-w-8 p-2 flex items-center justify-center">
                                  <SmartToyIcon className="!w-4 text-white" />
                                </div>

                                <div className=" flex-1 items-center w-4/5">
                                  <p className="px-2 break-words text-wrap text-sm text-start font-medium text-black/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white py-1 w-fit max-w-full rounded-t-lg rounded-br-lg">
                                    {dt.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                      return (
                        <>
                          <div className="w-full flex justify-end">
                            <div className="flex gap-2 w-full items-end">
                              <div className=" flex-1 items-center w-4/5 flex justify-end">
                                <p className="px-2 break-words text-wrap text-sm font-medium text-start text-white py-1 w-fit max-w-full  bg-blue-600 rounded-t-lg rounded-bl-lg">
                                  {dt.content}
                                </p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-black min-w-8"></div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    {waitLoading && (
                      <div className="w-full flex justify-end">
                        <div className="flex gap-2 w-full items-end">
                          <div className="w-8 h-8 rounded-full bg-blue-900 min-w-8 p-2 flex items-center justify-center">
                            <SmartToyIcon className="!w-4 text-white" />
                          </div>

                          <div className=" flex-1 items-center w-4/5">
                            <p className="px-2 break-words text-wrap text-2xl font-bold text-black/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] loading-text bg-white py-1 w-fit max-w-full rounded-t-lg rounded-br-lg">
                              <span className="char">.</span>
                              <span className="char">.</span>
                              <span className="char">.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {tabChoose === 2 && (
                <div
                  className="flex-1 bg-white overflow-y-scroll my-4 px-4"
                  ref={refMess}
                >
                  <div className="h-full w-full flex flex-col gap-4">
                    {listChat.map((dt: any) => {
                      if (dt.role === "bot") {
                        return (
                          <>
                            <div className="w-full flex justify-end">
                              <div className="flex gap-2 w-full items-end">
                                <div className="w-8 h-8 rounded-full bg-blue-900 min-w-8 p-2 flex items-center justify-center">
                                  <SmartToyIcon className="!w-4 text-white" />
                                </div>

                                <div className=" flex-1 items-center w-4/5">
                                  <p className="px-2 break-words text-wrap text-sm text-start font-medium text-black/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white py-1 w-fit max-w-full rounded-t-lg rounded-br-lg">
                                    {dt.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                      return (
                        <>
                          <div className="w-full flex justify-end">
                            <div className="flex gap-2 w-full items-end">
                              <div className=" flex-1 items-center w-4/5 flex justify-end">
                                <p className="px-2 break-words text-wrap text-sm font-medium text-start text-white py-1 w-fit max-w-full  bg-blue-600 rounded-t-lg rounded-bl-lg">
                                  {dt.content}
                                </p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-black min-w-8"></div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    {turnQuestion !== -1 && (
                      <div className="w-full flex flex-col justify-end ">
                        <p className="w-full text-xs text-black/40 font-semibold">
                          Lựa chọn khảo sát
                        </p>
                        <div className="flex gap-2 w-full items-end justify-between py-1">
                          <div className=" flex-1 items-center flex flex-col w-4/5 justify-end gap-2">
                            {questionSurvey?.[turnQuestion]?.answer.map(
                              (dt: any, i: any) => {
                                return (
                                  <>
                                    <button
                                      className="px-2 text-sm w-full text-start font-medium text-blue-800 break-words text-wrap py-1 hover:bg-blue-800 hover:text-white  border-[1px] border-blue-800 rounded-t-lg rounded-bl-lg"
                                      onClick={() => {
                                        if (
                                          questionSurvey.length - 1 ===
                                          turnQuestion
                                        ) {
                                          setListChat([
                                            ...listChat,
                                            { role: "user", content: dt },
                                            {
                                              role: "bot",
                                              content:
                                                "Đợi tôi tìm CV phù hợp với bạn nhé ^^",
                                            },
                                          ]);
                                          setTurnQuestion(-1);
                                          // setWaitLoading(true);
                                          setListAnswer([
                                            ...listAnswer,
                                            questionSurvey[turnQuestion]?.type[
                                              i
                                            ],
                                          ]);
                                        } else {
                                          setListChat([
                                            ...listChat,
                                            { role: "user", content: dt },
                                            {
                                              role: "bot",
                                              content:
                                                questionSurvey[turnQuestion + 1]
                                                  ?.question + ":",
                                            },
                                          ]);
                                          setTurnQuestion(turnQuestion + 1);
                                          setListAnswer([
                                            ...listAnswer,
                                            questionSurvey[turnQuestion]?.type[
                                              i
                                            ],
                                          ]);
                                        }
                                      }}
                                    >
                                      {dt}
                                    </button>
                                  </>
                                );
                              }
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {tabChoose === 0 && (
                <div
                  className="flex-1 w-full flex flex-col gap-4 items-center justify-center px-12"
                  ref={refMess}
                >
                  <button
                    className="p-2 rounded-md border-blue-700 w-full flex justify-center text-black/70 text-sm font-semibold border-[1px] hover:text-white hover:bg-blue-700"
                    onClick={() => {
                      setTabChoose(1);
                      handleCreateAI();
                    }}
                  >
                    Trò chuyện với AI
                  </button>
                  {/* <button
                    className="p-2 rounded-md border-blue-700 w-full flex justify-center break-words text-wrap text-black/70 text-sm font-semibold border-[1px] hover:text-white hover:bg-blue-700"
                    onClick={() => {
                      setTabChoose(2);
                      setTurnQuestion(0);
                      setListAnswer([]);
                      setListChat([
                        ...listChat,
                        {
                          role: "bot",
                          content: questionSurvey[0]?.question + ":",
                        },
                      ]);
                    }}
                  >
                    Khảo sát công việc phù hợp với bạn
                  </button> */}
                </div>
              )}

              <div className="bg-blue-600 h-10 flex px-4 py-2 gap-2  items-center">
                <div className="flex flex-1 h-full overflow-y-scroll !bg-scroll">
                  <TextareaAutosize
                    value={contentMess}
                    onKeyUp={(e: any) => {
                      if (tabChoose === 1) {
                        if (e.keyCode == 13 && contentMess !== "") {
                          handleAddMess();
                          setContentMess("");
                        }
                      }
                    }}
                    onChange={(e: any) => {
                      if (tabChoose === 1) {
                        setContentMess(e.target.value);
                      }
                    }}
                    placeholder="Nhập tin nhắn"
                    className="bg-transparent text-sm resize-none w-full text-white outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <IoSend
                    className=" text-white hover:text-blue-800 text-base"
                    onClick={() => {
                      if (contentMess !== "" && tabChoose === 1) {
                        handleAddMess();
                        setContentMess("");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoll;
