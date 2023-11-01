function showDetail(){
    var infor = "Tên khách hàng: " + user.fullname;
    infor += "\n\nSố điện thoại: " + user.phoneNumber;
    infor += "\n\nTên rạp: " + cinema;
    infor += "\n\nTên phim: " + movie_name;
    infor += "\n\nGhế đã đặt: " + user.seatList;
    infor += "\n\nThời gian: " + time;
    infor += "\n\nTổng đơn: " + user.transactionList[user.transactionList.length - 1].toLocaleString('vi-VN',{
        style: 'currency',
        currency: 'VND'
    });
    infor += "\n\nThanh toán: Đã thanh toán " ;
    document.getElementById('showDetail').innerHTML = infor;
}