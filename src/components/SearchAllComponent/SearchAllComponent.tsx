import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  setSearchActive?: any;
};

const SearchAllComponent = (props: Props) => {
  const { setSearchActive } = props;
  const [activeSearch, setActiveSearch] = useState<any>(false);
  const preventScroll = (e: any) => {
    e.preventDefault();
  };
  const funcStopScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const funcScroll = () => {
    document.body.style.overflow = "scroll";
  };

  useEffect(() => {
    if (activeSearch) {
      funcStopScroll();
    } else {
      funcScroll();
    }
  }, [activeSearch]);
  return (
    <>
      <div
        className={`w-full ${
          activeSearch ? " max-w-6xl" : ""
        } peer h-14 rounded-3xl w-full  border-4 border-black/50 transition-all duration-300 peer cursor-pointer p-3 flex items-center gap-x-2 relative z-40 bg-white`}
        onClick={() => {
          setActiveSearch(true);
          if (setSearchActive) setSearchActive(true);
        }}
      >
        <FaSearch fontSize="1.4em" />
        <input
          className=" outline-none w-full"
          placeholder="Tìm kiếm công việc, kỹ năng, công ty"
        />
        <div
          className={`absolute inset-0 rounded-xl top-16 transition-all duration-300 bg-white ${
            activeSearch ? " h-96" : "h-0"
          }`}
        ></div>
      </div>
      <div
        className={`inset-0 ${
          activeSearch ? "opacity-100" : "invisible opacity-0"
        } fixed transition-all duration-300 bg-black/50 z-30`}
        onClick={() => {
          setActiveSearch(false);
          if (setSearchActive) setSearchActive(false);
        }}
      ></div>
    </>
  );
};

export default SearchAllComponent;
