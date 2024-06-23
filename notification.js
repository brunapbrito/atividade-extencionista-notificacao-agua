// Importa a biblioteca Airtable
const Airtable = require('airtable')

// Importa a biblioteca SendGrid para envio de emails
const sgMail = require('@sendgrid/mail')

// Carrega as variáveis de ambiente
const AIRTABLE_SECRET_API_TOKEN = process.env.AIRTABLE_SECRET_API_TOKEN
const TWILLIO_ACCOUNT_ID = process.env.TWILLIO_ACCOUNT_ID
const TWILLIO_AUTH_TOKEN = process.env.TWILLIO_AUTH_TOKEN
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_FROM = process.env.SENDGRID_FROM
const TWILLIO_FROM = process.env.TWILLIO_FROM
const AIRTABLE_APP_ID= process.env.AIRTABLE_APP_ID
const AIRTABLE_TABLE_ID= process.env.AIRTABLE_TABLE_ID
const AIRTABLE_VIEW_ID= process.env.AIRTABLE_VIEW_ID

// Configura a chave da API do SendGrid
sgMail.setApiKey(SENDGRID_API_KEY)

// Cria um cliente Twilio
const client = require('twilio')(TWILLIO_ACCOUNT_ID, TWILLIO_AUTH_TOKEN)

// Configura a biblioteca Airtable com a URL do endpoint e chave da API
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_SECRET_API_TOKEN
})

// Conecta à base Airtable específica
const base = Airtable.base(AIRTABLE_APP_ID)
 
// Seleciona registros da tabela no Airtable, limitando a 10 registros por página
base(AIRTABLE_TABLE_ID).select({
  maxRecords: 10,
  view: AIRTABLE_VIEW_ID,
}).eachPage(function page(records, fetchNextPage) {
  // Processa cada registro
  records.forEach(function (record) {

    // Verifica se o status da água é "A caminho"
    if(record.get('Status Água') !== 'A caminho'){ 
      return
    }

    // Log de informações do registro
    console.log('---------Enviando notificação-----------')
    console.log('ID', record.getId())
    console.log('Nome', record.get('Nome'))
    console.log('E-mail', record.get('E-mail'))
    console.log('Telefone', record.get('Telefone'))
    console.log('Status', record.get('Status Água'))

    // Envia SMS via Twilio
    client.messages
      .create({
        body: `Olá ${record.get('Nome')}, água potável a caminho.`,
        to: '+55'+record.get('Telefone'), 
        from: TWILLIO_FROM,
      })
      .then((message) => console.log("SMS enviado:", message.sid))

    // Configura a mensagem de email
    const msg = {
      to: record.get('E-mail'),
      from: SENDGRID_FROM,
      subject: 'Notificação de Recebimento de Água Potável',
      html: `Olá ${record.get('Nome')}, você recebeu uma nova notificação de recebimento de água potável. <br><strong>Por favor, aguarde a chegada do caminhão de água potável. Qualquer dúvida entre em contato.</strong>`, 
      text: '-',
    }

    // Envia email via SendGrid
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email enviado')
      }, error => {
        console.error(error)
        if (error.response) {
          console.error(error.response.body)
        }
      })

  })
  // Pula para a próxima página de registros
  fetchNextPage()
}, function done(err) {
  // Lida com erros ao processar páginas
  if (err) { console.error(err); return }
})
