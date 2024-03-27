import React from 'react';
import './style.scss';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/navigation';

type Prop = {
    profile: any,
    isCheckAllCv: boolean,
    setIsCheckAllCv: (value: boolean) => void,
    setCvType: (value: string) => void,
    setIdSelectFromAllCv: (value: number) => void,
    idSelectFromAllCv: number,
}
const Page = (prop: Prop) => {
    const { profile, setIsCheckAllCv, isCheckAllCv, setCvType, setIdSelectFromAllCv, idSelectFromAllCv } = prop;
    const router = useRouter();

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCvType('all');
        setIsCheckAllCv(event.target.checked);
    }

    return (
        <>
            {profile && profile.profilesCvs ? (
                <div className="container">
                    <FormControlLabel
                        control={<Radio checked={isCheckAllCv} onChange={handleRadioChange} />}
                        label={<span style={{ fontSize: '13px', fontWeight: 'bold', color: 'blue' }}>Chọn CV khác trong thư viện CV của tôi: </span>}
                    />

                    {isCheckAllCv && (
                        <>
                            {profile.profilesCvs.map((cv: any, index: number) => (
                                <div key={index} className={idSelectFromAllCv !== cv.id ? 'item-all-cv cursor-pointer' : 'item-all-cv select-item cursor-auto'} onClick={() => {
                                    setIdSelectFromAllCv(cv.id);
                                }}>
                                    <div>{cv.name}</div>
                                    <span
                                        className="bold-item cursor-pointer"
                                        onClick={() => {
                                            router.push(cv.pdfURL); 
                                        }}
                                    >
                                        Xem
                                    </span>
                                </div>
                            ))}
                        </>
                    )}

                </div>
            ) : (
                <div>Profile hoặc profile.profilesCvs không tồn tại</div>
            )}
        </>
    );
};

export default Page;