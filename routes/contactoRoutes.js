const contactoController = require('../controllers/contactoControllers');
const nodemailer = require('nodemailer')

module.exports = app => {
    app.route('/contacto')
}

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${nombreContacto}</li>
            <li>User Email: ${correoContacto}</li>
            <li>PhoneNumber: ${telefonoContacto}</li>
        </ul>
        <p>${mensajeContacto}</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '', 
        to: '',
        subject: 'Website Contact Form',
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

});