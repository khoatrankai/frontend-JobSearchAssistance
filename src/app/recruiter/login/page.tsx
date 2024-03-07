'use client';
import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space } from 'antd';
import { MdEmail, MdOutlineWifiPassword } from 'react-icons/md';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import './style.scss';

const Page = () => {
    const images = [
        {
            id: 1, src: 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1709741967/images/banners/tde00h9gzlhdax3skc7m.jpg'
        },
        {
            id: 2, src: 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1709741789/images/banners/oz7qggoyn5oyoxquq9x3.jpg'
        }
    ]
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) =>
                prevImage === images.length - 1 ? 0 : prevImage + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [currentImage, images.length]);
    return (
        <div className="flex bg-gray-100 h-screen">
            <div className={isTablet ? 'w-full p-4 flex items-center justify-center' : 'w-2/3 p-4 flex items-center justify-center'}>
                <div className={isMobile ? 'w-full rounded-lg shadow-lg p-3' : 'w-3/5 rounded-lg shadow-lg p-3'} >
                    <div className='header mb-6 flex flex-col gap-1'>
                        <h1 className='text-2xl font-bold'>Chào mừng bạn đã quay trở lại</h1>
                        <p className='text-gray-600'>
                            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel
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
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </Space>
                            } />
                        </div>
                        <p className='text-blue-500 hover:underline cursor-pointer text-right basic' onClick={() => {
                            router.push('/forgot-password');
                        }}>
                            Quên mật khẩu?
                        </p>
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
                </div>
            </div>
            {!isTablet &&
                images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className={`w-1/3 h-screen bg-right ${index === currentImage ? "visible" : "hidden"
                            }`}
                        animate={{ x: 0 }}
                        initial={{ x: index === 0 ? 0 : -1000 }}  // Chỉ set x = 0 cho ảnh đầu tiên
                        transition={{ duration: 1 }}
                    >
                        <img src={image.src} alt={`Image ${image.id}`} />
                    </motion.div>
                ))}

        </div>
    );
}

export default Page;
