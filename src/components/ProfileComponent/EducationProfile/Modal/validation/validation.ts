export class ValidationProfile {
  constructor(
    public companyName: string,
    public major: string,
    public startDate: Number,
    public endDate: Number,
    public academicTypeId: string,
    
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
   

    
    
    if (this.companyName?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập tên trường',
      };
    }
    if (this.major?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập chuyên ngành',
      };
    }
    if (this.startDate?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập ngày bắt đầu',
      };
    }
    if (this.endDate?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập ngày kết thúc',
      };
    }
    
    if (this.academicTypeId?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập mô tả',
      };
    }
    
  }
}
