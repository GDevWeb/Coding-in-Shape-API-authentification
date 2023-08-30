const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

//01. Création d'un objet transporter avec les informations SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendWelcomeEmail = (toEmail, username, password) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: 'Bienvenue sur Coding In Shape',
    text: `Bonjour ${username}, bienvenue sur Coding In Shape !
    Vous pouvez désormais vous connecter à votre compte !

    Rappel de vos identifiants :
    Email : ${toEmail}
    Mot de passe : ${password}

    L'équipe Coding In Shape`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Erreur lors de l'envoi de l'email de bienvenue : ${error}`);
    } else {
      console.log(`Email de bienvenue envoyé avec succès : ${info.response}`);
    }
  });
};

module.exports = sendWelcomeEmail;
