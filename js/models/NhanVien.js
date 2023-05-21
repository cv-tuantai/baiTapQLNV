function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam,
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = 0;
  this.xepLoai = "";
  this.tinhLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = (this.luongCB * 3).toLocaleString();
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = (this.luongCB * 2).toLocaleString();
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = (this.luongCB * 1).toLocaleString();
    }
  };
  this.loaiNV = function () {
    if (this.gioLam >= 192) {
      this.xepLoai = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      this.xepLoai = "Nhân viên giỏi";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      this.xepLoai = "Nhân viên khá";
    } else if (this.gioLam < 160 && this.gioLam >= 0) {
      this.xepLoai = "Nhân viên trung bình";
    }
  };
}
