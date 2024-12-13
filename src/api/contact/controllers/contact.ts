import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { factories } from "@strapi/strapi";

// Crée une instance de JSDOM pour fournir un environnement DOM à DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async sendEmail(ctx) {
      try {
        const { name, email, sujet, message } = ctx.request.body;

        // Vérifie si tous les champs requis sont remplis
        if (!name || !email || !sujet || !message) {
          return ctx.badRequest("Tous les champs sont requis.");
        }

        // Ajout Regex Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation de l'email
        if (!emailRegex.test(email)) {
          return ctx.badRequest("Email invalide.");
        }

        // NEttoyer les entrées utilisateurs
        const sanitizeName = purify.sanitize(name);
        const sanitizeEmail = purify.sanitize(email);
        const sanitizeSujet = purify.sanitize(sujet);
        const sanitizeMessage = purify.sanitize(message);


        // Utiliser le service email de Strapi pour envoyer l'email
        await strapi
          .plugin("email")
          .service("email")
          .send({
            to: process.env.EMAIL_DEFAULT_REPLY_TO,
            from: process.env.EMAIL_DEFAULT_FROM,
            replyTo: sanitizeEmail,
            subject: `Nouveau message de ${sanitizeName} - ${sanitizeSujet}`,
            text: sanitizeMessage,
            html: `<p>${sanitizeMessage}</p><br/><strong>Nom : </strong> ${sanitizeName} <br/><strong>Email : </strong> ${sanitizeEmail}`,
          });

        // Retourner une réponse de succès
        return ctx.send({ message: "Email envoyé avec succès !" });
      } catch (error) {
        strapi.log.error("Erreur lors de l'envoi de l'email :", error);
        return ctx.internalServerError("Erreur lors de l'envoi de l'email.");
      }
    },
  })
);
