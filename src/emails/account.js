const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Envoyer un email de bienvenue à l'utilisateur

const sendWelcomeEmail = (email, name) => {
    sgMail
    .send( {
        to: email,
        from: "<EMAIL>",
        subject: `Merci pour votre inscription !`,
        text: `Bienvenue ${name}!`,
    })
    .then(() => {
        console.log("Email envoyé avec succès !");
    })
    .catch((error) => {
        console.log("Erreur: ", error);
    });
};

// Envoyer un email à l'utilisateur s'il se désinscrit

const sendCancelationEmail = (email, name) => {
    sgMail
    .send( {
        to: email,
        from: "<EMAIL>",
        subject: `Désolé de vous voir partir !`,
        text: `Nous espérons vous revoir ${name} !`,
    })
    .then(() => {
        console.log('Adresse email supprimée avec succès');
    })
    .catch((error) => {
        console.log("Erreur: ", error);
    });
}

export default { sendWelcomeEmail,  sendCancelationEmail };