const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "limonambrosoli@gmail.com",
        pass: "sunx nxeh nhmk bivu",
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: "limonambrosoli@gmail.com",
        to: to,
        subject: subject,
        text: text,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error al enviar el email", error);
    }
};

module.exports = { sendEmail };
