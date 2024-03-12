'use client';
import { RootState } from '@/redux';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdMarkEmailUnread } from "react-icons/md";
import apiAccount from '@/api/candidate/apiAccount';

const Page = () => {
    const profileV3 = useSelector((state: RootState) => state.profile.profile);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
            if (window.innerWidth < 992) {
                setIsTablet(true);
            } else {
                setIsTablet(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleVerifyEmail = () => {
        const fetchVerifyEmail = async () => {
            const response = await apiAccount.verifyEmail(profileV3?.email, profileV3?.name);

            if (response.data.statusCode === 200) {
                setIsSuccess(true);
            }
        }
        fetchVerifyEmail();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {profileV3?.email !== null ? (
                <div className={isTablet ? "rounded-lg bg-slate-200 w-[90%] p-3 flex flex-col gap-2" : "gap-2 rounded-lg bg-slate-200 w-2/4 p-5 flex flex-col"}>
                    <div className='font-bold text-2xl text-center mb-4'>
                        Xác thực email đăng nhập
                    </div>
                    {isSuccess ? (
                        <div className='text-red-800 font-bold bg-blue-400 p-3'>
                            Email xác thực đã được gửi đến <span>{profileV3?.email}</span>. Vui lòng kiểm tra email và làm theo hướng dẫn.
                        </div>
                    ) : null}
                    <div>
                        Xác thực email của bạn để được đảm bảo quyền lợi và sự hỗ trợ tốt nhất từ Jobs.
                    </div>
                    <div>
                        Để xác thực email, bấm nút Nhận email xác thực dưới đây, sau đó đăng nhập email <span className='text-green-600 font-bold'>
                            {profileV3?.email}
                        </span> và làm theo hướng dẫn trong email.
                    </div>
                    <div>
                        Trường hợp không nhận được email, bạn vui lòng bấm nút Nhận email xác thực dưới đây.
                    </div>
                    <button className='bg-green-600 text-white rounded-md p-2 mt-2 flex items-center gap-2 w-fit mb-5' onClick={() => {
                        handleVerifyEmail();
                    }}>
                        <MdMarkEmailUnread />
                        Nhận email xác thực
                    </button>
                    <div>
                        Mọi thắc mắc vui lòng liên hệ bộ phận CSKH của JOBS:
                        <div className='flex flex-col'>
                            <span className='font-bold'>Hotline:</span> 1900 636 729
                            <span className='font-bold'>Email: </span> email@gmail.com
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Page;
