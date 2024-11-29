import { factories } from '@strapi/strapi';

export default factories.createCoreController<any, any>('api::email.email', ({ strapi }) => ({
  async send(ctx) {
    const { name, email, subject, message } = ctx.request.body;

    try {
      await strapi.service('api::email.email').send(
        'trashausse@gmail.com',
        `Nouveau message de contact: ${subject}`,
        `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      );

      ctx.send({ message: 'Formulaire soumis avec succès' });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));