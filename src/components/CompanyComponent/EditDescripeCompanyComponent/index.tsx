import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
  fontSize: 14,
};

interface IEditDescripeCompany {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const EditDescripeCompany: React.FC<IEditDescripeCompany> = (props) => {
  const { dataCompany, setDataCompany, is_profile } = props;
  const [isClickDes, setIsClickDes] = React.useState(false);
  const handleEditCompanyDes = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      description: value,
    }));
  };

  return (
    <div className="edit-des-company-container">
      <div className="edit-des-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          Mô tả công ty <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          disabled={is_profile ? true : false}
          type="text"
          id="editCompany"
          multiline
          rows={12}
          onClick={() => setIsClickDes(true)}
          name="title"
          value={dataCompany?.description}
          onChange={handleEditCompanyDes}
          sx={{
            width: '100%', marginTop: '8px', fontSize: '14px',
            border: isClickDes && !dataCompany?.description ? '1px solid red' : 'none',
            borderRadius: isClickDes && !dataCompany?.description ? '5px' : ''
          }}
          placeholder="Nhập mô tả về công ty"
        />
        {
          isClickDes && !dataCompany?.description && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              Mô tả công ty không được để trống
            </p>
          )
        }
      </div>
    </div>
  );
};

export default memo(EditDescripeCompany);
