const utils = require("../utils");
const {
    ERROR_PAGE,
    SUCCESS
} = require("../constant");
const helper = require("../helpers");

/*** Nạp Tiền ***/

async function CreateRequestDeposit() {
    // khởi tạo biếm tạm để chứa danh sách ngân hàng khả dụng
    let listBankAvailible = [];

    // gọi api và push danh sách ngân hàng vào biến listBankAvailible
    const reqGetListBankAvailible = await utils.DEPOSIT.getBankAvailable();
    if (reqGetListBankAvailible.status) {
        for (const bank of reqGetListBankAvailible.data) {
            listBankAvailible.push(bank);
        }
    }

    // console.log(listBankAvailible);
    if (listBankAvailible.length <= 0) return "Không thể lấy danh sách ngân hàng có sẵn!";

    /****
     * Chọn ngẫu nhiên 1 ngân hàng trong danh sách 
     * (đối với production nên show ra cho member chủ độn chọn ngân hàng)
     ****/
    const bankSelect = listBankAvailible[Math.floor(Math.random() * listBankAvailible.length)];

    // tạo yều nạp tiền
    const requestId = helper.getRandomInt(1000000, 999999999999); // Mã tham chiếu của đối tác
    const amount = 10000; // 10.000 VND số tiền yêu cầu nạp
    const bankCode = bankSelect.code; // Mã ngân hàng

    const makeRequestDeposit = await utils.DEPOSIT.createRequestDeposit(requestId, amount, bankCode);

    // lưu lại mã tham chiếu vào database phía đối tác để sau khi có callback từ hệ thống, đối tác sẽ xác định được giao dijch
    console.log(makeRequestDeposit);
    return makeRequestDeposit;
}

module.exports = async function (req, res) {
    try {
        const createRequest = await CreateRequestDeposit();
        return res.status(200).json(createRequest);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            status: false,
            msg: e.message
        });
    }
};