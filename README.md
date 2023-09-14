# 🔐 Autenticação de dois fatores de forma simples!

Esse é um projeto desenvolvido para entender melhor o funcionamento da autenticação de dois fatores e como ela pode ser utilizada em aplicações para promover um ambiente mais seguro para os usuários.

Importante destacar que o código fornecido é apenas uma abordagem simples de como funciona a autenticação de dois fatores, desenvolvida com base nos estudos sobre a [speakeasy](https://github.com/speakeasyjs/speakeasy).

![carbon](https://github.com/ayrtonfilho/two-factor-authentication/assets/71043862/0d8705ce-c913-40f2-8a73-53ab5aed74b1)

## ⭐️ Funcionamento

Este projeto utiliza a biblioteca `speakeasy` para implementar a autenticação de dois fatores. Vou apresentar alguns pontos que considero importantes acerca do projeto:

1. Uma secret (segredo) é gerada de forma segura e deve ser guardada com segurança e sempre deve ser vinculada ao usuário (importante assegurar que o usuário possa em qualquer tempo gerar uma nova secret).

2. Quando o usuário realizar login com autenticação de dois fatores, ele deve fornecer o código de 6 dígitos gerado por um aplicativo de autenticação, como o Google Authenticator, Microsoft Authenticator, Duo Mobile, etc.

3. O servidor verifica se o código de 6 dígitos é válido usando a função `Speakeasy.totp.verify` quando você envia uma requisição do tipo `POST` para `http://localhost:3000/validate`, seguindo o exemplo abaixo:

    ```bash
    curl --request POST \
    --url http://localhost:3000/validate \
    --header 'Content-Type: application/json' \
    --data '{
            "code": "586925"
        }'
    ```

4. É fundamental ressaltar o uso de uma criptografia mais segura. No exemplo, foi utilizada a codificação base32, no entanto, é importante observar que existem opções de criptografia mais recomendadas e seguras.

5. O projeto também gera uma URL para o QR code, que deve ser escaneado pelo aplicativo de autenticação para configurar a autenticação de dois fatores. O QR code é exibido no terminal para que você consiga escaneia-lo.
![image](https://github.com/ayrtonfilho/two-factor-authentication/assets/71043862/ca4f3c88-0058-4b2b-8f87-3bec82049d5f)


## 🧩 Pré-requisitos

- Node instalado e devidamente configurado no seu dispositivo.

## 🎉 Como executar

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/ayrtonfilho/two-factor-authentication.git
   ```
2. Instale as dependências do projeto:
    ```bash
    npm install
   ```
3. Faça a execução com o comando:
    ```bash
    npm run start
   ```
4. O servidor estará ouvindo na porta 3000.


## Licença

Este projeto está licenciado sob a [Licença MIT](https://www.mit.edu/~amini/LICENSE.md).
