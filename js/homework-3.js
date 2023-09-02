//BÀI TẬP 3

const PHAN_GIAM_TRU_PHU_THUOC = 16 * 10 ** 5;
const LUONG_CO_BAN = 4 * 10 ** 6;

function giaiBaiToanTinhThueThuNhap() {
    //Khai báo các biến để lấy dữ liệu người dùng nhập vào
    var hoTen = document.getElementById("homework-3-ho-ten").value;
    var tongThuNhapNam = document.getElementById("homework-3-thu-nhap-nam").value * 1;
    var soNguoiPhuThuoc = document.getElementById("homework-3-so-nguoi-phu-thuoc").value * 1;

    //Tính số tiền chịu thuế
    var tienChiuThue = tinhtienChiuThue(tongThuNhapNam, soNguoiPhuThuoc);

    //Báo lỗi nếu số tiền chịu Thuế < 0
    if (tienChiuThue < 0) {
        return thongBaoLoiHomework4();
    }

    //Tính toán số phần trăm thuế suất
    var thueSuat = tinhThueSuat(tienChiuThue);

    //Tính tiền Thuế 
    var thue = tinhThue(tienChiuThue, thueSuat);
    var formatThue = formatTienVietNam(thue);

    thongBaoHomework3(hoTen, formatThue);
}

//Logic tính số tiền chịu thuế
function tinhtienChiuThue(tongThuNhapNam, soNguoiPhuThuoc) {
    var ketQUa = tongThuNhapNam - LUONG_CO_BAN - soNguoiPhuThuoc * PHAN_GIAM_TRU_PHU_THUOC;
    return ketQUa;
}

//Logic tính phần trăm thuế suất
function tinhThueSuat(tienChiuThue) {
    //Tính theo donViTrieu cho dễ nhình bằng cách chia cho 1.000.000
    var donViTrieu = tienChiuThue / (10 ** 6);

    //Các TH kiểm tra thuế suất dựa vào tiền chịu thuế
    var ketQua;
    if (donViTrieu > 960) {
        ketQua = 0.35;
    } else
        if (donViTrieu > 624 && donViTrieu <= 960) {
            ketQua = 0.30;
        } else
            if (donViTrieu > 384 && donViTrieu <= 624) {
                ketQua = 0.25;
            } else
                if (donViTrieu > 210 && donViTrieu <= 384) {
                    ketQua = 0.20;
                } else
                    if (donViTrieu > 120 && donViTrieu <= 210) {
                        ketQua = 0.15;
                    } else
                        if (donViTrieu > 60 && donViTrieu <= 120) {
                            ketQua = 0.10;
                        } else
                            if (donViTrieu <= 60) {
                                ketQua = 0.05;
                            }
    return ketQua;
}

//Logic tính tiền thuế
function tinhThue(tienChiuThue, thueSuat) {
    var ketQua = tienChiuThue * thueSuat;
    return ketQua;
}

//Format lại tiền qua tiền Việt Name Đồng để cho đẹp
function formatTienVietNam(soTien) {
    //Format theo 1,000,000
    var ketQua = new Intl.NumberFormat('en-US').format(soTien);
    return ketQua;
}

//Trả kết quả cho người dùng
function thongBaoHomework3(hoTen, thue) {
    document.getElementById("homework-3-result").innerText = "Họ tên : " + hoTen + " có thuế thu nhập cá nhân là " + thue + " VND.";
}

//Trả kết quả lỗi chung
function thongBaoLoiHomework4() {
    document.getElementById("homework-3-result").innerText = "Xảy ra lỗi nhập";
}
