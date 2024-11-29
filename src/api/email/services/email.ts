import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::email.email', ({ strapi }) => ({
  async send(to: string, subject: string, html: string, from?: string) {
    try {
      await strapi.plugins['email'].services.email.send({
        to,
        from: from || process.env.DEFAULT_FROM_EMAIL, // Utilisez une variable d'environnement pour l'email par défaut
        subject,
        html,
      });
      console.log('Email sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  },
}));