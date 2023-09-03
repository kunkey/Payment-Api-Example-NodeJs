

module.exports = {
    get: async function (req, res) {
        try {
            const dataRecieved = req.query;
            // console.log(dataRecieved);
            // tất cả các tham số dữ liệu được chứa trong biến dataRecieved
            // ở bước này đối tác vui lòng xử lý dữ liệu hệ thống payment trả về     
            return res.status(200).json(dataRecieved)
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                status: false,
                msg: e.message
            });
        }
    },
    post: async function (req, res) {
        try {
            const dataRecieved = req.body;
            // console.log(dataRecieved);
            // tất cả các tham số dữ liệu được chứa trong biến dataRecieved
            // ở bước này đối tác vui lòng xử lý dữ liệu hệ thống payment trả về     
            return res.status(200).json(dataRecieved)
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                status: false,
                msg: e.message
            });
        }
    },
}