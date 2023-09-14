const Speakeasy = require("speakeasy");

function validateToken(secret, req, res) {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Código de autenticação ausente." });
    }

    const isValid = Speakeasy.totp.verify({
        secret: secret.base32,
        encoding: "base32",
        token: code,
        window: 0,
    });

    if (isValid) {
        return res.status(200).json({ error: "Código de autenticação válido!" });
    } else {
        return res.status(401).json({ error: "Código de autenticação inválido!" });
    }
}

module.exports = validateToken;