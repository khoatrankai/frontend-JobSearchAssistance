export class ValidationProfile {
  constructor(
    public name: string,
    public birthday: string,
    public gender: Number,
    public address: Number,
    public jobTypeName: string,
    
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
   

    if (this.address?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập địa chỉ',
      };
    }
    if (this.name?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập họ tên',
      };
    }
    if (this.gender?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập giới tính',
      };
    }
    if (this.birthday?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập ngày sinh',
      };
    }
    
  }
}
