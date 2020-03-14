const sgMail = require('@sendgrid/mail') 

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
    to: email,
    from: 'michitson@gmail.com',
    subject: 'welcome to task',
    text: `Welcome to the app, ${name}, let me know how you get along with the app`,
    html: ''
    })

}

const sendCancelEmail = (email, name) => {
    sgMail.send({
    to: email,
    from: 'michitson@gmail.com',
    subject: 'sorry to lose you ',
    text: `sorry to lose you, ${name}, let me know if you change your mind`,
    html: '<body><h1>Gwaa</h1></body>'
    })

}

  
module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}