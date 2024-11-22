/**
 * email router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::email.email');

export default {
    routes: [
      {
        method: 'POST',
        path: '/contact-form/send',  // Cette URL sera utilisée pour envoyer le formulaire
        handler: 'email.sendContactFormEmail',  // Appelle la méthode 'sendContactFormEmail' du contrôleur
        config: {
          policies: [],
        },
      },
    ],
  };
  