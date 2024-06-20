export class ValidationProfile {
  constructor(
    public companyName: string,
    public major: string,

    
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
   

    
    
    if (this.companyName?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập tên giải thưởng',
      };
    }
    if (this.major?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập mô tả',
      };
    }
    
    
  }
}
