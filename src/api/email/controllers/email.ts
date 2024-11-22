/**
 * email controller
 */

import { factories } from '@strapi/strapi';
import nodemailer from 'nodemailer';

export default factories.createCoreController('api::email.email', ({ strapi }) => ({
  async sendEmail(ctx) {
    const { name, email, subject, message } = ctx.request.body;

    if (!name || !email || !subject || !message) {
      return ctx.badRequest('Tous les champs doivent être remplis.');
    }

    // Créer un transporteur pour nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Vous pouvez remplacer par un autre service comme SendGrid ou Mailgun
      auth: {
        user: 'votre-email@gmail.com',  // Remplacez par votre adresse e-mail
        pass: 'votre-mot-de-passe',     // Utilisez un mot de passe d'application si nécessaire
      },
    });

    // Options de l'email
    const mailOptions = {
      from: 'votre-email@gmail.com',
      to: 'monmailperso@gmail.com', // L'adresse email où vous souhaitez recevoir les messages
      subject: `Nouveau message de ${name} - ${subject}`,
      html: `<p>Nom: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé:', info.response);
      return ctx.send('Message envoyé avec succès!');
    } catch (error) {
      console.error('Erreur d\'envoi d\'email:', error);
      return ctx.internalServerError('Erreur lors de l\'envoi du message.');
    }
  },
}));
