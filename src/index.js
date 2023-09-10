const Express = require("express");
const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
const qrcode = require('qrcode-terminal');

let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Essa é a secret que deve ser guardada com segurança e vinculada ao usuário.
let secret = Speakeasy.generateSecret({ length: 20 });

// Requisição para saber se o código de 6 dígitos é valido ou inválido.
app.post("/validate", (request, response, next) => {
    response.send({
        "valid": Speakeasy.totp.verify({
            secret: secret.base32,
            encoding: "base32",
            token: request.body.code,
            window: 0
        })
    });
});

// Gerando uma URL para o QR code
const otpauthUrl = Speakeasy.otpauthURL({
    secret: secret.base32,
    encoding: "base32",
    label: '@USER_airtonfilho',
    issuer: 'TWO-FACTOR-AUTH',
});

qrcode.generate(otpauthUrl, { small: true }, function (qrcodeText) {
    console.log(qrcodeText); // o QR Code irá ser mostrado no terminal.
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});