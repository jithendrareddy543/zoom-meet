const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(process.env.clientId, process.env.clientSecret)
OAuth2_client.setCredentials(({refresh_token: process.env.refresh_token}))

exports.sendMeetingMail = async (emails) => {   // function used to send mails to the students
    const accessToken = OAuth2_client.getAccessToken()

    const transport = await nodemailer.createTransport({
        service:'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.USER_EMAIL,
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            refreshToken: process.env.refresh_token,
            accessToken: accessToken
        }
    })

    const mail_options = {
        from: process.env.USER_EMAIL,
        to: emails,
        subject: 'Doubt classess',
        html: get_html_message()
    }

    transport.sendMail(mail_options, function(error, result) { 
        if(error) {
            console.log('Error: ', error)
        } else {
            console.log('Success: ', result)
        }
        transport.close()
    })
}

function get_html_message() {
    return `<h3> Greetings </h3>`
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
    tls:{
        rejectUnathorized:false
    }
});

exports.sendMeetingInvitations = async (url) => {
    try {

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: "jithureddy32@gmail.com",
            subject: "Hello",
            text: "Hello world?",
        }
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}


