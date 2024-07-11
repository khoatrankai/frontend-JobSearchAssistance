import { RootState } from "@/redux";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const ShowActiveRecruiter = (props: Props) => {
  const profileInfoV3 = useSelector(
    (state: RootState) => state.profileRecruiter.profile
  );
  const { pushRouter } = useRouterCustom();
  useEffect(() => {
    console.log(profileInfoV3);
  }, [profileInfoV3]);
  return (
    <>
      {Object.keys(profileInfoV3).length !== 0 &&
        !profileInfoV3?.companyInfomation?.isActive && (
          <div className="fixed z-50 bottom-0 inset-x-0">
            <div className="w-full bg-red-700/70 flex justify-center text-white">
              <button
                onClick={() => {
                  pushRouter("/recruiter/help-contact");
                }}
              >
                Vui lòng chờ xác thực hoặc{" "}
                <span className="underline">liên hệ</span>{" "}
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default ShowActiveRecruiter;
