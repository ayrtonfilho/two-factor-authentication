const Express = require("express");
const Speakeasy = require("speakeasy");
const qrcode = require('qrcode-terminal');
const validateToken = require("./middlewares/validateToken");

let app = Express();
const secret = Speakeasy.generateSecret({ length: 20 });

app.use(Express.json()); // Configuração para analisar o corpo JSON da solicitação

app.use("/validate", (req, res) => {
    validateToken(secret, req, res); // Passa a secret como argumento
});

const otpauthUrl = Speakeasy.otpauthURL({
    secret: secret.base32,
    encoding: "base32",
    label: "@USER_airtonfilho",
    issuer: "TWO-FACTOR-AUTH",
});

qrcode.generate(otpauthUrl, { small: true }, (qrcodeText) => {
    console.log(qrcodeText); // O QR Code será exibido no terminal.
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});