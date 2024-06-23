# Notificação de Recebimento de Água Potável

Este projeto envia notificações de recebimento de água potável através de SMS e email para os usuários utilizando as APIs do Airtable, Twilio e SendGrid.

## Pré-requisitos

- Node.js
- Conta no Airtable
- Conta no Twilio
- Conta no SendGrid

## Instalação

1. Clone este repositório:
   ```bash
   git clone hhttps://github.com/brunapbrito/atividade-extencionista-notificacao-agua.git
   cd tividade-extencionista-notificacao-agua
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```plaintext
   AIRTABLE_SECRET_API_TOKEN=seu_airtable_api_token
   TWILLIO_ACCOUNT_ID=seu_twilio_account_id
   TWILLIO_AUTH_TOKEN=seu_twilio_auth_token
   SENDGRID_API_KEY=seu_sendgrid_api_key
   SENDGRID_FROM=seu_email_de_envio
   TWILLIO_FROM=seu_numero_twilio
   AIRTABLE_APP_ID=seu_airtable_app_id
   AIRTABLE_TABLE_ID=seu_airtable_table_id
   AIRTABLE_VIEW_ID=seu_airtable_view_id
   ```

## Uso

Execute o script com o comando:

```bash
node notification.js
```

O script irá:

1. Conectar à base de dados do Airtable.
2. Selecionar os registros na tabela especificada.
3. Verificar o status da água de cada registro.
4. Enviar SMS e email para os registros com status "A caminho".

## Estrutura do Código

- `require('airtable')`: Importa a biblioteca Airtable.
- `require('@sendgrid/mail')`: Importa a biblioteca SendGrid para envio de emails.
- Carrega as variáveis de ambiente para configuração das APIs.
- Configura a chave da API do SendGrid.
- Cria um cliente Twilio.
- Configura a biblioteca Airtable com a URL do endpoint e chave da API.
- Conecta à base Airtable específica.
- Seleciona registros da tabela no Airtable, limitando a 10 registros por página.
- Processa cada registro verificando o status da água.
- Envia SMS via Twilio.
- Configura e envia email via SendGrid.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
