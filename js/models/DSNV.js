function DSNV() {
  this.arr = [];

  // Thêm NV
  this.addNV = function (nv) {
    this.arr.push(nv);
  };
  this.delNV = function (tk) {
    var index = this.findIndex(tk);
    this.arr.splice(index, 1);
  };
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
  this.getInfo = function (tk) {
    var index = this.findIndex(tk);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  };
  this.updateNV = function (nv) {
    var index = this.findIndex(nv.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
}
