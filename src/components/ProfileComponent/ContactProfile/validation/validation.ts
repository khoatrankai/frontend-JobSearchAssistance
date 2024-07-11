export class ValidationProfile {
  constructor(
    public email: string,
    
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
   

    // if (this.address?.toString().trim() === '') {
    //   return {
    //     status: false,
    //     message: 'Vui lòng nhập địa chỉ',
    //   };
    // }
    // if (this.phone?.toString().trim() === '') {
    //   return {
    //     status: false,
    //     message: 'Vui lòng nhập số điện thoại',
    //   };
    // }
    // if (this.gender?.toString().trim() === '') {
    //   return {
    //     status: false,
    //     message: 'Vui lòng nhập giới tính',
    //   };
    // }
    if (this.email?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập email',
      };
    }
    
  }
}
