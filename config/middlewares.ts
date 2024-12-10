export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [process.env.URL_PRODUCTION, 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
