const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// Cors Origin
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
// đọc dữ liệu from
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// sử dụng để log mọi request ra console
app.use(morgan("[:date[iso]][:method :url HTTP/:http-version] Completed with status :status in :response-time ms "));

// handel routers
const createRequestDeposit = require("./handle/request.create_deposit");
const createRequestWithdraw = require("./handle/request.create_withdraw");
const callbackData = require("./handle/callback_data");

// add router to function handlers

/**** Nạp tiền ***/
app.get('/create-request-deposit', (req, res) => {
    createRequestDeposit(req, res);
});
/**** Rút Tiền ****/
app.get('/create-request-withdraw', (req, res) => {
    createRequestWithdraw(req, res);
});

/**** Callback Dữ Liệu ****/
// Đối với phương thức POST
app.post('/callback-data', (req, res) => {
    callbackData.posst(req, res);
});
// Đối với phương thức GET
app.get('/callback-data', (req, res) => {
    callbackData.get(req, res);
});


const PORT = 3000;
const ENV_ENVIROMENT = 'development';

// export server handle
const server = app.listen(PORT, () => {
    console.log(
        ">>> Server is running at port %d in %s mode",
        PORT,
        ENV_ENVIROMENT
    );
    console.log(">>> Press CTRL-C to stop server\n");
});