export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [process.env.URL_PRODUCTION, 'http://localhost:3000'], // Remplacez par les URL de votre front-end
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
