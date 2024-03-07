// Import necessary components and styles
'use client';
import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space } from 'antd';
import { MdEmail, MdOutlineWifiPassword } from 'react-icons/md';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import './style.scss';


const Page = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible);
    };

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
                    <div className='header mb-6 flex flex-col gap-1'>
                        <h1 className='text-2xl font-bold'>Chào mừng bạn đã quay trở lại</h1>
                        <p className='text-gray-600'>
                            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
                        </p>
                    </div>
                    <div className='login'>
                        <label className='block mb-1'>
                            Email:
                        </label>
                        <div className='mb-3'>
                            <Input
                                size="large"
                                placeholder="Email"
                                prefix={<span style={{ marginRight: '8px' }}><MdEmail /></span>}
                            />

                        </div>
                        <label className='block mb-1'>
                            Mật khẩu:
                        </label>
                        <div className='mb-3'>
                            <Input size="large" placeholder="Mật khẩu" prefix={<span style={{ marginRight: '8px' }}><MdOutlineWifiPassword /></span>} suffix={
                                <Space onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                    {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
                                </Space>
                            } />
                        </div>
                        <p className='text-blue-500 hover:underline cursor-pointer text-right basic' onClick={() => {
                            router.push('/forgot-password');
                        }}>
                            Quên mật khẩu?
                        </p>
                        <p className='or'>Hoặc đăng nhập bằng</p>
                        <div className='flex gap-3'>
                            <Button sx={{
                                backgroundColor: '#3b5998',
                                width: '50%',
                                color: 'white',
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: '#3b5998'
                                }
                            }}>
                                Facebook
                            </Button>
                            <Button sx={{
                                backgroundColor: '#ff0000',
                                width: '50%',
                                color: 'white',
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: '#ff0000'
                                }
                            }}>
                                Google
                            </Button>
                        </div>
                        <div className='flex mt-4 align-top'>
                            <Checkbox defaultChecked={false} />
                            <p className='ml-2 basic agreement-social-login'>
                                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của JOBS
                            </p>
                        </div>
                        <div className='mt-3 justify-center flex'>
                            <div className='basic text-[#6f7882]'>
                                Bạn chưa có tài khoản?
                            </div>
                            <div className='basic register cursor-pointer' onClick={() => {
                                router.push('/sign-up');
                            }}>
                                Đăng ký
                            </div>
                        </div>
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
                        Đăng nhập
                    </Button>
                </div>
            </div>
            {!isTablet && (
                <div className='w-1/3 h-screen bg-right'></div>
            )}
        </div>
    );
}

export default Page;
