//BÀI TẬP 1
//Khu vực
const DIEM_KVA = 2;
const DIEM_KVB = 1;
const DIEM_KVC = 0.5;

//Đối tượng
const DIEM_DT1 = 2.5;
const DIEM_DT2 = 1.5;
const DIEM_DT3 = 1;

function giaiBaiToanQuanLiTuyenSinh() {
    //Khai báo các biến để lấy dữ liệu người dùng nhập vào
    var diemMon1 = document.getElementById("homework-1-mon1").value * 1;
    var diemMon2 = document.getElementById("homework-1-mon2").value * 1;
    var diemMon3 = document.getElementById("homework-1-mon3").value * 1;

    //TH có môn <=0 => Báo kết quả rớt
    if (diemMon1 <= 0 || diemMon2 <= 0 || diemMon3 <= 0) {
        return thongBao1();
    }

    var diemChuan = document.getElementById("homework-1-diem-chuan").value * 1;
    var diemKhuVuc = tinhDiemKhuVuc();
    var diemDoiTuong = tinhDiemDoiTuong();
    var diemTong = tinhDiemTong(diemMon1, diemMon2, diemMon3, diemKhuVuc, diemDoiTuong);


    //TH không có môn nào <= 0 &  Điểm Tổng < Điểm Chuẩn
    if (diemTong < diemChuan) {
        return thongBao2(diemTong);
    }

    //TH không có môn nào <= 0 &  Điểm Tổng >=Điểm Chuẩn
    if (diemTong >= diemChuan) {
        return thongBao3(diemTong);
    }

};

//Logic tính điểm Khu Vực
function tinhDiemKhuVuc() {
    var ketQua;
    var khuVuc = document.getElementById("homework-1-khu-vuc").value;

    var kVA = document.getElementById("kVA").value;
    var kVB = document.getElementById("kVB").value;
    var kVC = document.getElementById("kVC").value;

    switch (khuVuc) {
        case kVA: ketQua = DIEM_KVA;
            break;
        case kVB: ketQua = DIEM_KVB;
            break;
        case kVC: ketQua = DIEM_KVC;
            break;
        default: ketQua = 0;
            break;
    }
    return ketQua;
}

//Logic tính điểm Đối tượng
function tinhDiemDoiTuong() {

    var ketQua;
    var doiTuong = document.getElementById("homework-1-doi-tuong").value;

    var dT1 = document.getElementById("dT1").value;
    var dT2 = document.getElementById("dT2").value;
    var dT3 = document.getElementById("dT3").value;

    switch (doiTuong) {
        case dT1: ketQua = DIEM_DT1;
            break;
        case dT2: ketQua = DIEM_DT2;
            break;
        case dT3: ketQua = DIEM_DT3;
            break;
        default: ketQua = 0;
            break;
    }
    return ketQua;
}

function tinhDiemTong(diemMon1, diemMon2, diemMon3, diemKhuVuc, diemDoiTuong) {
    var diemTong = diemMon1 + diemMon2 + diemMon3 + diemKhuVuc + diemDoiTuong;
    return diemTong;
}

function thongBao1() {
    document.getElementById("homework-1-result").innerText = "Bạn đã rớt. Do có điểm nhỏ hơn hoặc bằng 0";
}

function thongBao2(diemTong) {
    document.getElementById("homework-1-result").innerText = "Bạn đã rớt. Tổng điểm : " + diemTong;
}

function thongBao3(diemTong) {
    document.getElementById("homework-1-result").innerText = "Bạn đã đậu. Tổng điểm : " + diemTong;
}
