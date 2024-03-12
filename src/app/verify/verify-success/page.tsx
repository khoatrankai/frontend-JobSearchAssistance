'use client';

import { RootState } from "@/redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Page = () => {
    const profileV3 = useSelector((state: RootState) => state.profile.profile);
    const router = useRouter();

    return (
        <div className="flex justify-center items-center min-h-screen">

            {profileV3 && (
                <div className="flex flex-col">
                    <div className="flex justify-center items-center gap-5">
                        <img src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1710090646/images/icons/mjk1xcalzqwbwicq6hug.png" alt="verify-success" className="w-1/4" />
                        <div className="flex flex-col gap-2">
                            <div className="text-3xl font-bold">Xác thực email thành công</div>
                            <div className="text-lg">Cảm ơn bạn đã xác thực email</div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-3">
                        <button className="bg-blue-600 text-white rounded-md p-2 mt-5 flex items-center gap-2 w-fit mb-5">
                            <span onClick={() => {
                                if (profileV3.role === 3 ){
                                    router.push('/recruiter');
                                }
                                else {
                                    router.push('/');
                                }
                            }} >Trở về trang chủ</span>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Page;