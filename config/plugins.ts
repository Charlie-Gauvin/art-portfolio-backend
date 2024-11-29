module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'mailgun',
        providerOptions: {
          key: env('MAILGUN_API_KEY'),
          domain: env('MAILGUN_DOMAIN', 'sandboxa9c35804e79449f7ad71ceff3f0b20bd.mailgun.org'),
          url: env('MAILGUN_URL', 'https://api.mailgun.net'),
        },
        settings: {
          defaultFrom: env('MAILGUN_FROM_EMAIL', 'trashausse@gmail.com'),
          defaultReplyTo: env('MAILGUN_REPLY_TO_EMAIL', 'trashausse@gmail.com'),
        },
      },
    },
  });
  