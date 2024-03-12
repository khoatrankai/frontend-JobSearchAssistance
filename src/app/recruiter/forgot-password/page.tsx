'use client';
import React, { useEffect, useState } from 'react';
import './style.scss';
import Button from '@mui/material/Button';
import { Input } from 'antd';
import { MdEmail } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";

const Page = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [email, setEmail] = useState('');
    const [isClickEmail, setIsClickEmail] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setIsTablet(true);
            }
            if (window.innerWidth < 768) {
                setIsMobile(true);
            }
            if (window.innerWidth > 1200) {
                setIsTablet(false);
            }
            if (window.innerWidth > 768) {
                setIsMobile(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="flex bg-gray-100 h-screen">
            <div className={isTablet ? 'w-full p-4 flex items-center justify-center' : 'w-2/3 p-4 flex items-center justify-center'}>
                <div className={isMobile ? 'w-full rounded-lg shadow-lg p-3' : 'w-3/5 rounded-lg shadow-lg p-3'} >
                    <div className='back cursor-pointer' onClick={() => {
                        router.push('/recruiter/login');
                    }}>
                        <IoIosArrowBack />
                    </div>
                    <div>
                        <div className='flex justify-center'>
                            <img src="/logo/2025.png" alt="logo" width={170} height={170} />
                        </div>
                    </div>
                    <div className='header mb-6 flex flex-col gap-1'>
                        <h1 className='text-2xl font-bold'>Quên mật khẩu</h1>
                    </div>
                    <div className='login'>
                        <label className='block mb-1'>
                            Email:
                        </label>
                        <div className='mb-3'>
                            <Input
                                size="large"
                                placeholder="Email"
                                status={(isClickEmail && email === '') ? 'error' : ''}
                                suffix={(isClickEmail && email === '') ? <CiCircleInfo className='text-red-700' /> : ''}
                                onChange={(e) => setEmail(e.target.value)}
                                onClick={() => {
                                    setIsClickEmail(true);
                                }}
                                prefix={<span style={{ marginRight: '8px' }}><MdEmail /></span>}
                            />
                        </div>
                        {isClickEmail && email === '' && (
                            <div>
                                <p className='basic text-red-700'>
                                    Vui lòng nhập email của bạn. Chúng tôi sẽ gửi một liên kết để đặt lại mật khẩu của bạn.
                                </p>
                            </div>
                        )}
                        <div className='flex mt-4 align-top'>
                            <p className='basic agreement-social-login'>
                                Bằng việc thực hiện đổi mật khẩu, bạn đã đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi
                            </p>
                        </div>

                        <Button sx={{
                            backgroundColor: '#ffcc00',
                            color: 'black',
                            marginTop: '20px',
                            '&:hover': {
                                backgroundColor: '#ffcc00',
                                color: 'black'
                            }

                        }} className='w-full'>
                            Cập nhật mật khẩu
                        </Button>
                        <div className='mt-3 gap-1 text-center flex flex-col'>
                            <p className='basic'>
                                Bạn gặp khó khăn khi tạo tài khoản?
                            </p>
                            <p className='basic'>
                                Liên hệ với chúng tôi qua email: <span className='text-blue-500 cursor-pointer'>job@gmail.com
                                </span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            {!isTablet && (
                <div className='w-1/3 h-screen bg-right'></div>
            )}
        </div>
    );
}

export default Page;