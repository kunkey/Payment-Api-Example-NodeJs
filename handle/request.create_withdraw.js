const utils = require("../utils");
const {
    ERROR_PAGE,
    SUCCESS
} = require("../constant");
const helper = require("../helpers");


/*** Rút Tiền ***/
async function CreateRequestWithdraw() {
    // gọi api lấy danh sách ngân hàng hỗ trợ
    const reqGetListBankSupportList = await utils.getBankSupportList();
    if (reqGetListBankSupportList.status) {
        // console.log(reqGetListBankSupportList.data);
    } else {
        console.log("Lấy dánh sách ngân hàng hỗ trợ thất bại");
    }


    /****
     * (đối với production đối tác nên lựa chọn đúng mã ngân hàng cần rút tiền về của mình)
     ****/

    // tạo yều rút tiền
    const requestId = helper.getRandomInt(1000000, 999999999999); // Mã tham chiếu của đối tác
    const amount = 200000; // 200.000 VND số tiền yêu cầu nạp
    const bankCode = "MB"; // Mã ngân hàng cần rút tiền của đối tác, lấy  từ api baae trên 
    const bankAccount = "765131689999"; // Số tài khoản ngân hàng
    const bankName = "Vu Hoang Bao"; // Tên chủ tài khoản
    const message = "Cash Out Money"; // Nội dung rút tiền (nội dung chuyển khoản khi hệ thống chuyển tiền - có thể bỏ qua)

    const makeRequestWithdraw = await utils.WITHDRAW.createRequestWithdraw(
        requestId,
        amount,
        bankCode,
        bankAccount,
        bankName,
        message
    );

    // lưu lại mã tham chiếu vào database phía đối tác để sau khi có callback từ hệ thống, đối tác sẽ xác định được giao dijch
    console.log(makeRequestWithdraw);
    return makeRequestWithdraw;
}


module.exports = async function (req, res) {
    try {
        const createRequest = await CreateRequestWithdraw();
        return res.status(200).json(createRequest);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            status: false,
            msg: e.message
        });
    }
};