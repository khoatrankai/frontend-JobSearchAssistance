import React, { useEffect, useState } from 'react';
import './style.scss';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type Prop = {
    profile: any,
    isCheckNearCv: boolean,
    setIsCheckNearCv: (value: boolean) => void,
    setCvType: (value: string) => void,
}

const Page = (prop: Prop) => {
    const { profile, isCheckNearCv, setIsCheckNearCv, setCvType } = prop;

    const [cvNew, setCvNew] = useState<any>(null);

    useEffect(() => {
        if (profile && profile.profilesCvs) {
            const cv = profile.profilesCvs.find((cv: any) => cv.isNew === 1);
            if (cv) {
                setCvNew(cv);
            }
        }
    }, [profile]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCvType('near');
        setIsCheckNearCv(event.target.checked);
    }

    return (
        cvNew ? (
            <div className='container'>
                <FormControl>
                    <FormControlLabel
                        control={<Radio checked={isCheckNearCv} onChange={handleRadioChange} />}
                        label={<span style={{ fontSize: '13px', fontWeight: 'bold', color: 'blue' }}>CV ứng tuyển gần đây nhất: {cvNew.name}</span>}
                    />

                    {isCheckNearCv && (
                        <div>
                            <div className='item-flex'>
                                <div>Họ và tên:</div>
                                <span className='bold-item'>{profile.name}</span>
                            </div>
                            <div className='item-flex'>
                                <div>Email:</div>
                                <span className='bold-item'>{profile.email}</span>
                            </div>
                            <div className='item-flex'>
                                <div>Số điện thoại:</div>
                                <span className='bold-item'>{profile.phone}</span>
                            </div>
                        </div>
                    )}
                </FormControl>
            </div>
        ) : (
            <React.Fragment>

            </React.Fragment>
        )
    );

}

export default Page;