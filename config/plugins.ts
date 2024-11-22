import path from "path";

export default ({ env }) => ({
    // configuration for email
    email: {
        config: {
            provider : "sendmail",
            providerOptions: {
                sendmail: true,
                newline: 'unix',
                path: '/usr/sbin/sendmail',    
        },
        settings : {
            defaultFrom: env('EMAIL_FROM', 'noreply@localhost.com'),
            defaultReplyTo: env('EMAIL_REPLY_TO', 'contact@localhost.com'),
            defaultTo: env('EMAIL_TO', 'gauvinch9@gmail.com'),
        },
    },
},
});
