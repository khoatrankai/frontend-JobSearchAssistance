export class ValidationProfile {
  constructor(
    public companyName: string,
    public title: string,
    public startDate: Number,
    public endDate: Number,
    public academicTypeId: string,
    
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
   

    
    
    if (this.companyName?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập tên tổ chức',
      };
    }
    if (this.title?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập tên chức vụ',
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
