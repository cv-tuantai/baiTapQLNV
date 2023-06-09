function Validation() {
  // kiểm tra rỗng
  this.checkEmpty = function (value, errorID, mess) {
    if (value === "") {
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    }
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  };

  //   kiểm tra chức vụ
  this.checkPosition = function (idSelect, errorID, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra số ký tự
  this.checkLength = function (value, errorID, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra chuỗi
  this.checkString = function (value, errorID, mess) {
    var re =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(re)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra email
  this.checkEmail = function (value, errorID, mess) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(re)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra mật khẩu
  this.checkPass = function (value, errorID, mess) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(re)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra ngày làm
  this.checkDate = function (value, errorID, mess) {
    var re =
      /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    if (value.match(re)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra giá trị nhập
  this.checkValue = function (value, errorID, mess, min, max) {
    if (value >= min && value <= max) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra trùng
  this.checkDuplicate = function (value, errorID, mess, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].taiKhoan === value) {
        getEle(errorID).innerHTML = mess;
        getEle(errorID).style.display = "block";
        return false;
      }
    }
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  };
}
