export class ValidationProfile {
  constructor(
    public info: any,
    
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
   


    if (this.info?.link?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng link',
      };
    }
    if (this.info?.name?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập tên',
      };
    }
    if (this.info?.description?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập mô tả',
      };
    }
    if (this.info?.nameButton?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn tên nút',
      };
    }
    if (this.info?.logoData?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn ảnh logo',
      };
    }
    if (this.info?.imageData?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn ảnh bìa',
      };
    }

    
  }
}
