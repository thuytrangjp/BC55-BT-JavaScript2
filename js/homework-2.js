//BÀI TẬP 2
//Gia Tien
const giaKw_1 = 500;  //50kw đầu
const giaKw_2 = 650;  //50 kw kế tiếp
const giaKw_3 = 850;  //100 kw kế tiếp
const giaKw_4 = 1100; //150 kw kế tiếp
const giaKw_5 = 1300; //Còn lại

function giaiBaiToanTinhTienDien() {
    //Khai báo các biến để lấy dữ liệu người dùng nhập vào
    var soKw = document.getElementById("homework-2-so-kW").value * 1;
    var hoTen = document.getElementById("homework-2-ho-ten").value;

    var tongTien = tinhTongTien(soKw, giaKw_1, giaKw_2, giaKw_3, giaKw_4, giaKw_5);

    var formatTongTien = formatTien(tongTien);

    document.getElementById("homework-2-result").innerText = "Họ tên: " + hoTen + "; Tiền điện: " + formatTongTien;
}


//Logic tính tổng tiền theo kw
function tinhTongTien(soKw, giaKw_1, giaKw_2, giaKw_3, giaKw_4, giaKw_5) {
    var tongTien;

    if (0 <= soKw && soKw <= 50) {
        tienKw_1 = tinhTienKw_1(soKw, giaKw_1);
        tongTien = tienKw_1;

    } else if (50 < soKw && soKw <= 100) {
        tienKw_1 = tinhTienKw_1(50, giaKw_1);
        tienKw_2 = tinhTienKw_2(soKw, giaKw_2);
        tongTien = tienKw_1 + tienKw_2;

    } else if (100 < soKw && soKw <= 200) {
        //tienKw_3
        tienKw_1 = tinhTienKw_1(50, giaKw_1);
        tienKw_2 = tinhTienKw_2(100, giaKw_2);
        tienKw_3 = tinhTienKw_3(soKw, giaKw_3);
        tongTien = tienKw_1 + tienKw_2 + tienKw_3;

    } else if (200 < soKw && soKw <= 350) {
        //tienKw_4
        tienKw_1 = tinhTienKw_1(50, giaKw_1);
        tienKw_2 = tinhTienKw_2(100, giaKw_2);
        tienKw_3 = tinhTienKw_3(200, giaKw_3);
        tienKw_4 = tinhTienKw_4(soKw, giaKw_4);
        tongTien = tienKw_1 + tienKw_2 + tienKw_3 + tienKw_4;

    } else if (350 < soKw) {
        //tienKw_5
        tienKw_1 = tinhTienKw_1(50, giaKw_1);
        tienKw_2 = tinhTienKw_2(100, giaKw_2);
        tienKw_3 = tinhTienKw_3(200, giaKw_3);
        tienKw_4 = tinhTienKw_4(350, giaKw_4);
        tienKw_5 = tinhTienKw_5(soKw, giaKw_5);
        tongTien = tienKw_1 + tienKw_2 + tienKw_3 + tienKw_4 + tienKw_5;

    } else {
        alert("Vui long nhap soKw >= 0");
    }
    return tongTien
}

//Logic tính tổng tiền theo kw_1 : 50 kw đầu
function tinhTienKw_1(soKw, giaKw_1) {
    var ketQua = soKw * giaKw_1;
    return ketQua;
}

//Logic tính tổng tiền theo kw_2 : 50 kw kế
function tinhTienKw_2(soKw, giaKw_2) {
    var ketQua = (soKw - 50) * giaKw_2;
    return ketQua;

}
//Logic tính tổng tiền theo kw_3 : 100 kw kế
function tinhTienKw_3(soKw, giaKw_3) {
    var ketQua = (soKw - 100) * giaKw_3;
    return ketQua;
}
//Logic tính tổng tiền theo kw_4 : 150 kw kế
function tinhTienKw_4(soKw, giaKw_4) {
    var ketQua = (soKw - 200) * giaKw_4;
    return ketQua;
}
//Logic tính tổng tiền theo kw_5 : 100 kw kế
function tinhTienKw_5(soKw, giaKw_5) {
    var ketQua = (soKw - 350) * giaKw_5;
    return ketQua;
}

function formatTien(soTien) {
    //Format theo 1,000,000
    return new Intl.NumberFormat('en-US').format(soTien);
}
