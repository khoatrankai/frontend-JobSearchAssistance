import React, { useState } from 'react';
import { FormControlLabel, FormControl, Radio } from '@mui/material';
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { IconButton } from '@mui/material';
import './style.scss';


type Prop = {
    profile: any,
    isUploadCv: boolean,
    setIsUploadCv: (value: boolean) => void,
    setCvType: (value: string) => void,
    setFilePDFParent: (value: File) => void,
}

const Page = (props: Prop) => {
    const { profile, isUploadCv, setIsUploadCv, setCvType, setFilePDFParent } = props;
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
            setFilePDFParent(file);
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
                        <div className='upload-cv text-center'>
                            <input
                                ref={hiddenInputRef}
                                type='file'
                                accept='.pdf'
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            {!uploadedFileName && (
                                <IconButton color="primary" aria-label="upload cv" component="span" onClick={handleIconClick} style={{
                                    fontSize: '50px',
                                    color: 'blue',
                                }}>
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
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Page;
