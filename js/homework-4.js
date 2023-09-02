//BÀI TẬP 4

const PHI_XU_LY_HOA_DON_NHA_DAN = 4.5;
const PHI_KET_NOI_NHA_DAN = 20.5;
const PHI_MOT_KENH_CAO_CAP_NHA_DAN = 7.5;
const PHI_XU_LY_HOA_DON_DOANH_NGHIEP = 15;
const PHI_KET_NOI_DOANH_NGHIEP = 75;
const PHI_KET_NOI_DOANH_NGHIEP_PHAT_SINH = 5;
const PHI_MOT_KENH_CAO_CAP_DOANH_NGHIEP = 50;
const SO_KET_NOI_DOANH_NGHIEP_TIEU_CHUAN = 10;

const OPTION_DOANH_NGHIEP = document.getElementById("kHBiz").value;
const OPTION_NHA_DAN = document.getElementById("kHHome").value;

//Tùy vào loại Khách Hàng mà thay đổi UI. Đi theo onchange của select Loại Khách Hàng
function thayUiTuyLoaiKhachHang() {
    var loaiKhachHang = document.getElementById("homework-4-loai-khach-hang").value;
    switch (loaiKhachHang) {
        case OPTION_DOANH_NGHIEP: chuyenUiDoanhNghiep();
            break;
        case OPTION_NHA_DAN: chuyenUiNhaDan();
            break;
        default: chuyenUiNhaDan();
            break;
    }
}

//Logic đổi UI khi loại KH là Nhà Dân: Sẽ ẩn hiển thị input Số Kết Nối
function chuyenUiNhaDan() {
    var soKetNoiElement = document.getElementById("homework-4-so-ket-noi")
    soKetNoiElement.value = "";
    soKetNoiElement.classList.add("input-hidden");
}

//Logic đổi UI khi loại KH là Doanh nghiệp: Sẽ cho hiển thị input Số Kết Nối
function chuyenUiDoanhNghiep() {
    var soKetNoiElement = document.getElementById("homework-4-so-ket-noi");
    soKetNoiElement.classList.remove("input-hidden");
}

//Giải bài toán Tính Giá Tiền Cáp. Sẽ được gọi khi ấn button Tính Giá Tiền.
function giaiBaiToanTinhGiaTienCap() {
    //Khai báo biến để lấy giá trị nhập từ người dùng
    var loaiKhachHang = document.getElementById("homework-4-loai-khach-hang").value;
    var maKhachHang = document.getElementById("homework-4-ma-khach-hang").value;
    var soKenhCaoCap = document.getElementById("homework-4-so-kenh-cao-cap").value * 1;
    var soKetNoi = tinhSoKetNoi(loaiKhachHang);

    //TH chưa có loại khách hàng => Báo kết quả lỗi
    if (loaiKhachHang !== OPTION_DOANH_NGHIEP && loaiKhachHang !== OPTION_NHA_DAN) {
        return guiLoiChuaChonLoaiKhachHang();
    }

    //TH khi số kênh cao cấp là số âm hoặc 0 => Báo kết quả lỗi
    if (soKenhCaoCap < 0) {
        return thongBaoLoiHomework4();
    }

    //TH khi doanh nghiệp có số kết nối là số âm hoặc 0 => Báo kết quả lỗi
    if (loaiKhachHang === OPTION_DOANH_NGHIEP && soKetNoi < 0) {
        return thongBaoLoiHomework4();
    }

    //Tính phí xử lý hóa đơn
    var phiXuLyHoaDon = tinhPhiXuLyHoaDon(loaiKhachHang);

    //Tính phí dịch vụ
    var phiDichVu = tinhPhiDichVu(loaiKhachHang, soKetNoi);

    //Tính phí thuê kênh cao cấp
    var phiThueKenhCaoCap = tinhPhiThueKenhCaoCap(loaiKhachHang, soKenhCaoCap);

    //Tính giá tiền cấp cuối cùng
    var giaTienCap = tinhGiaCap(phiXuLyHoaDon, phiDichVu, phiThueKenhCaoCap);

    //Format giá tiền theo đô la Mỹ cho đẹp
    var formatGiaTienCap = formatTienMy(giaTienCap);

    //Trả thông báo về cho người dùng
    thongBaoHomework4(maKhachHang, formatGiaTienCap);
}

//Logic tính số kết nối dựa vào loại Khách Hàng. Nếu là Nhà Dân thì sẽ không có số kết nối
function tinhSoKetNoi(loaiKhachHang) {
    var ketQua;
    switch (loaiKhachHang) {
        case OPTION_DOANH_NGHIEP: ketQua = document.getElementById("homework-4-so-ket-noi").value * 1;
            break;
        case OPTION_NHA_DAN: ketQua = 0;
            break;
        default: ketQua = 0;
            break;
    }
    return ketQua;
}

//Logic tính phí xử lý hóa đơn dựa vào loại Khách Hàng.
function tinhPhiXuLyHoaDon(loaiKhachHang) {
    var ketQua;
    switch (loaiKhachHang) {
        case OPTION_DOANH_NGHIEP: ketQua = PHI_XU_LY_HOA_DON_DOANH_NGHIEP;
            break;
        case OPTION_NHA_DAN: ketQua = PHI_XU_LY_HOA_DON_NHA_DAN;
            break;
        default: ketQua = 0;
            break;
    }
    return ketQua;
}

//Logic tính phí dịch vụ dựa vào loại Khách Hàng và số Kết nối.
//Nếu là Nhà Dân thì không tính toán gì về số kết nối.
function tinhPhiDichVu(loaiKhachHang, soKetNoi) {
    var ketQua;
    switch (loaiKhachHang) {
        case OPTION_DOANH_NGHIEP: ketQua = tinhPhiDichVuDoanhNghiep(soKetNoi);
            break;
        case OPTION_NHA_DAN: ketQua = PHI_KET_NOI_NHA_DAN;
            break;
        default: ketQua = 0;
            break;
    }
    return ketQua;
}

//Logic tính phí dịch vụ của riêng loại Khách Hàng là Doanh Nghiệp
//Công thức tính cũng sẽ khác nhau tùy số kết nối của doanh nghiệp
//Nếu số kết nối ít hơn hoặc bằng 10, thì sẽ lấy mức giá chuẩn (Không đủ 10 kết nối cũng lấy mức này)
//Nếu số kết nối lớn hơn 10, thì sẽ lấy mức giá tiêu chuẩn cộng với mức phí phát sinh thêm
//Phí phát sinh sẽ là phí phát sinh cho từng kết nối nhân với số kết nối phát sinh
//(Số kết nối phát sinh là tính từ kết nối thứ 11 trở đi, nên sẽ lấy số kết nối trừ 10 để lấy số kết nối phát sinh)
function tinhPhiDichVuDoanhNghiep(soKetNoi) {
    var ketQua;
    if (soKetNoi <= SO_KET_NOI_DOANH_NGHIEP_TIEU_CHUAN) {
        ketQua = PHI_KET_NOI_DOANH_NGHIEP;
    } else {
        var soKetNoiPhatSinh = soKetNoi - SO_KET_NOI_DOANH_NGHIEP_TIEU_CHUAN;
        ketQua = PHI_KET_NOI_DOANH_NGHIEP + (soKetNoiPhatSinh * PHI_KET_NOI_DOANH_NGHIEP_PHAT_SINH);
    }
    return ketQua;
}


//Logic tính phí thuê kênh cao cấp
function tinhPhiThueKenhCaoCap(loaiKhachHang, soKenhCaoCap) {
    var ketQua;
    switch (loaiKhachHang) {
        case OPTION_DOANH_NGHIEP: ketQua = PHI_MOT_KENH_CAO_CAP_DOANH_NGHIEP * soKenhCaoCap;
            break;
        case OPTION_NHA_DAN: ketQua = PHI_MOT_KENH_CAO_CAP_NHA_DAN * soKenhCaoCap;
            break;
        default: ketQua = 0;
            break;
    }
    return ketQua;
}


//Logic tính giá cáp thuê, gồm ba loại phí: phí xử lý hóa đơn, phí dịch vụ, phí thuê kênh cao cấp
function tinhGiaCap(phiXuLyHoaDon, phiDichVu, phiThueKenhCaoCap) {
    return phiXuLyHoaDon + phiDichVu + phiThueKenhCaoCap;
}

//Format lại tiền qua tiền đô la Mỹ để cho đẹp
function formatTienMy(soTien) {
    //Format theo 1,000,000
    return new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(soTien);
}

//Trả kết quả theo nội dung cho trước và giá trị truyền vào
function thongBaoHomework4(maKhachHang, giaTienCap) {
    document.getElementById("homework-4-result").innerText = "Mã Khách Hàng : " + maKhachHang + " cần thanh toán tổng giá cáp là: " + giaTienCap + ".";
}

//Trả câu báo lỗi chung
function thongBaoLoiHomework4() {
    document.getElementById("homework-4-result").innerText = "Xảy ra lỗi nhập";
}

//Trả câu báo lỗi TH chưa chọn loại khách hàng
function guiLoiChuaChonLoaiKhachHang() {
    document.getElementById("homework-4-result").innerText = "Hãy chọn loại Khách Hàng";
}