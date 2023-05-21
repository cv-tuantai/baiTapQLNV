function DSNV() {
  this.arr = [];

  // Thêm NV
  this.addNV = function (nv) {
    this.arr.push(nv);
  };

  // Xóa NV
  this.delNV = function (tk) {
    var index = this.findIndex(tk);
    this.arr.splice(index, 1);
  };

  // Tìm index
  this.findIndex = function (tk) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].taiKhoan === tk) {
        index = i;
        break;
      }
    }
    return index;
  };

  // Lấy data mảng
  this.getInfo = function (tk) {
    var index = this.findIndex(tk);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  };

  // cập nhật NV
  this.updateNV = function (nv) {
    var index = this.findIndex(nv.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };

  // Tìm NV
  this.searchNV = function (keyword) {
    var searchArr = [];

    // chuyển keyword thành lowercase
    var keyLower = keyword.toLowerCase();

    for (var i = 0; i < this.arr.length; i++) {
      // Chuyển chuỗi xepLoai thành lowercase
      var xepLoai = this.arr[i].xepLoai.toLowerCase();

      // kiểm tra keyLower trong chuỗi
      if (xepLoai.indexOf(keyLower) !== -1) {
        searchArr.push(this.arr[i]);
      }
    }
    return searchArr;
  };
}
