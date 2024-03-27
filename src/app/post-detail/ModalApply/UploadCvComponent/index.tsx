import React, { useState } from 'react';
import { FormControlLabel, FormControl, Radio } from '@mui/material';
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { IconButton } from '@mui/material';
import './style.scss';
import { Input } from 'antd';
import { FaStarOfLife } from "react-icons/fa6";

type Prop = {
    profile: any,
    isUploadCv: boolean,
    setIsUploadCv: (value: boolean) => void,
    setCvType: (value: string) => void,
}

const Page = (props: Prop) => {
    const { profile, isUploadCv, setIsUploadCv, setCvType } = props;
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    const hiddenInputRef = React.useRef<HTMLInputElement>(null);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsUploadCv(checked);
        if (checked) {
            setCvType('upload');
        }
    }

    const handleIconClick = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setUploadedFileName(file.name);
        }
    }

    const handleRemoveFile = () => {
        setUploadedFileName('');
    }

    return (
        <>
            {profile && (
                <div className='container-upload'>
                    <FormControl>
                        <FormControlLabel
                            control={<Radio checked={isUploadCv} onChange={handleRadioChange} />}
                            label={<span style={{ fontSize: '13px', fontWeight: 'bold', color: 'blue' }}>Tải CV: </span>}
                        />
                    </FormControl>

                    {isUploadCv && (
                        <div className='upload-cv'>
                            <input
                                ref={hiddenInputRef}
                                type='file'
                                accept='.pdf'
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            {!uploadedFileName && (
                                <IconButton color="primary" aria-label="upload cv" component="span" onClick={handleIconClick}>
                                    <FaCloudUploadAlt />
                                </IconButton>
                            )}
                            {uploadedFileName && (
                                <div className="file-info">
                                    <span>{uploadedFileName}</span>
                                    <IconButton color="primary" aria-label="remove file" component="span" onClick={handleRemoveFile}>
                                        <FaTimes />
                                    </IconButton>
                                </div>
                            )}
                            {uploadedFileName && (<div>
                                <div style={{
                                    alignItems: 'center',
                                    marginTop: '10px',
                                    display: 'flex',
                                    gap: '3px'
                                }}>
                                    <div>Nhập tên Cv </div>
                                    <FaStarOfLife
                                        style={{
                                            color: 'red',
                                            fontSize: '6px',
                                        }}
                                    />:
                                </div>
                                <Input placeholder='Nhập tên....' style={{
                                    width: '100%',
                                    marginTop: '10px'
                                }} />
                            </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Page;
