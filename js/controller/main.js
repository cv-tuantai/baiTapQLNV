// Tạo đối tượng dsnv từ lớp đối tượng DSNV
var dsnv = new DSNV();

// lấy dữ liệu từ local storage
getLocalStorage();

// Tạo đối tượng validation từ lớp đối tượng Validation
var validation = new Validation();

// Tạo hàm getEle(id)
function getEle(id) {
  return document.getElementById(id);
}

// Tạo hàm getInfoNV
function getInfoNV(isAdd) {
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucVu").value;
  var gioLam = getEle("gioLam").value;

  /* Validation */
  var isValid = true;

  if (isAdd) {
    // Validation tài khoản
    isValid &=
      validation.checkEmpty(
        taiKhoan,
        "tbTKNV",
        "(*) Tài khoản không để trống",
      ) &&
      validation.checkLength(
        taiKhoan,
        "tbTKNV",
        "(*) Tài khoản phải từ 4 đến 6 ký tự",
        4,
        6,
      ) &&
      validation.checkDuplicate(
        taiKhoan,
        "tbTKNV",
        "(*) Tài khoản đã tồn tại",
        dsnv.arr,
      );
  }

  // validation họ tên
  isValid &=
    validation.checkEmpty(hoTen, "tbTen", "(*) Họ tên không để trống") &&
    validation.checkString(hoTen, "tbTen", "(*) Họ tên phải là chữ");

  // validation email
  isValid &=
    validation.checkEmpty(email, "tbEmail", "(*) Email không để trống") &&
    validation.checkEmail(email, "tbEmail", "(*) Vui lòng nhập đúng email");

  // validation mật khẩu
  isValid &=
    validation.checkEmpty(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu không để trống",
    ) &&
    validation.checkLength(
      matKhau,
      "tbMatKhau",
      "Mật khẩu phải từ 6 đến 10 ký tự",
      6,
      10,
    ) &&
    validation.checkPass(
      matKhau,
      "tbMatKhau",
      "Vui lòng chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt",
    );

  // validation ngày làm
  isValid &=
    validation.checkEmpty(ngayLam, "tbNgay", "(*) Ngày làm không để trống") &&
    validation.checkDate(
      ngayLam,
      "tbNgay",
      "Vui lòng nhập định dạng mm/dd/yyyy",
    );

  // validation lương cơ bản
  isValid &=
    validation.checkEmpty(
      luongCB,
      "tbLuongCB",
      "(*) Lương cơ bản không để trống",
    ) &&
    validation.checkValue(
      luongCB,
      "tbLuongCB",
      "Lương cơ bản từ 1.000.000 đến 20.000.000",
      1000000,
      20000000,
    );

  // validation chức vụ
  isValid &= validation.checkPosition(
    "chucVu",
    "tbChucVu",
    "(*) Phải chọn chức vụ hợp lệ",
  );

  // validation giờ làm
  isValid &=
    validation.checkEmpty(gioLam, "tbGiolam", "(*) Giờ làm không để trống") &&
    validation.checkValue(
      gioLam,
      "tbGiolam",
      "Số giờ làm trong tháng phải từ 80 đến 200 giờ",
      80,
      200,
    );

  if (!isValid) return null;

  //   Tạo đối tượng nhanVien từ lớp đối tượng NhanVien
  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam,
  );
  //   Tính tổng lương và xếp loại
  nhanVien.tinhLuong();
  nhanVien.loaiNV();
  return nhanVien;
}

// Tạo hàm renderTable
function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td style="display: flex">
            <button class="btn btn-info" onclick="editNV('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Sửa</button>
              <button class="btn btn-danger ml-1" onclick="deleteNV('${nv.taiKhoan}')">Xóa</button>
            </td>
        </tr>
        `;
  }

  getEle("tableDanhSach").innerHTML = content;
}

// Tạo hàm set localStorage
function setLocalStorage() {
  // convert json to string
  var dataString = JSON.stringify(dsnv.arr);
  // set localStorage
  localStorage.setItem("DSNV", dataString);
}

// Tạo hàm get localStorage
function getLocalStorage() {
  // check condition
  if (localStorage.getItem("DSNV")) {
    // get localStorage
    var dataString = localStorage.getItem("DSNV");

    // convert string to json
    dsnv.arr = JSON.parse(dataString);

    // render table
    renderTable(dsnv.arr);
  }
}

// Tạo hàm xóa nhân viên
function deleteNV(tk) {
  dsnv.delNV(tk);

  // cập nhật giao diện
  renderTable(dsnv.arr);

  // lưu vào local storage
  setLocalStorage();
}

// Tạo hàm sửa nhân viên
function editNV(tk) {
  var nvEdit = dsnv.getInfo(tk);
  if (nvEdit) {
    getEle("tknv").value = nvEdit.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = nvEdit.hoTen;
    getEle("email").value = nvEdit.email;
    getEle("password").value = nvEdit.matKhau;
    getEle("datepicker").value = nvEdit.ngayLam;
    getEle("luongCB").value = nvEdit.luongCB;
    getEle("chucVu").value = nvEdit.chucVu;
    getEle("gioLam").value = nvEdit.gioLam;
  }

  // khi nhấn sửa ta sẽ ẩn nút thêm, mà hiện nút cập nhật
  getEle("btnThemNV").disabled = true;
  getEle("btnCapNhat").disabled = false;
}

// Tạo sự kiện khi click vào nút thêm NV
getEle("btnThemNV").onclick = function () {
  var nhanVien = getInfoNV(true);

  //   Đưa đối tượng nhanVien vào mảng dsnv
  dsnv.addNV(nhanVien);

  //   Hiện thị danh sách nhân viên ra giao diện
  renderTable(dsnv.arr);

  // lưu vào local storage
  setLocalStorage();
};

// Tạo sự kiện khi click vào nút cập nhập NV
getEle("btnCapNhat").onclick = function () {
  var nhanVien = getInfoNV(false);

  // cập nhật đối tượng nhanVien vào mảng dsnv.arr
  dsnv.updateNV(nhanVien);

  // cập nhật ra giao diện
  renderTable(dsnv.arr);

  // lưu vào local storage
  setLocalStorage();
};

getEle("btnReset").onclick = function () {
  getEle("tknv").value = "";
  getEle("tknv").disabled = false;
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  getEle("chucVu").value = "Chọn chức vụ";
  getEle("gioLam").value = "";
};

// khi ấn thêm ta sẽ ẩn nút cập nhật và hiện nút thêm NV
getEle("btnThem").onclick = function () {
  getEle("btnThemNV").disabled = false;
  getEle("btnCapNhat").disabled = true;
};
