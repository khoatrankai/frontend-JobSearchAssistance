export class ValidationProfile {
  constructor(
    public info: any,
    
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
    if (this.info?.address?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập địa chỉ',
      };
    }
    if (this.info?.wardID?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập phường , quận, thành phố',
      };
    }
    if (this.info?.phone?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập số điện thoại',
      };
    }
    if (this.info?.email?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập email',
      };
    }
    if (this.info?.companyRoleId?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn vai trò',
      };
    }
    if (this.info?.companySizeId?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn quy mô',
      };
    }
    if (this.info?.categoryId?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn danh mục',
      };
    }
    if (this.info?.logo?.toString().trim() === '') {
      return {
        status: false,
        message: 'Vui lòng thêm ảnh logo',
      };
    }
    
  }
}
