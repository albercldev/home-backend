export interface AppConfig {
  port: number;

  auth: {
    jwt: {
      secret: string;
      expiresInSeconds: number;
    };
    github: {
      clientId: string;
      clientSecret: string;
      callbackURL: string;
      authorizationURL: string;
    };
  };
  'auth.jwt.secret'?: string;
  'auth.jwt.expiresInSeconds'?: number;
  'auth.github.clientId'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.callbackURL'?: string;
  'auth.github.authorizationURL'?: string;
}

export default function appConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT) || 3000,
    auth: {
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresInSeconds:
          parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS) || 900,
      },
      github: {
        clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
        authorizationURL: process.env.GITHUB_OAUTH_AUTHORIZATION_URL,
      },
    },
  };
}
