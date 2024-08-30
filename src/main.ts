import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './config/app.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfig>);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Home API')
    .setDescription('The Home API description')
    .setVersion('1.0')
    .addTag('home')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const documentOptions = new DocumentBuilder()
    .setBasePath('api')
    .addBearerAuth()
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: configService.get('auth.github.authorizationURL'),
          scopes: {
            public_profile: 'public_profile',
          },
        },
      },
    })
    .build();

  SwaggerModule.setup(
    'swagger',
    app,
    { ...document, ...documentOptions },
    {
      swaggerOptions: {
        initOAuth: {
          clientId: configService.get('auth.github.clientId'),
          clientSecret: configService.get('auth.github.clientSecret'),
          appName: 'Home API',
          scopes: ['public_profile'],
          additionalQueryStringParams: {
            redirect_uri: 'http://localhost:3000/api/auth/github/callback',
          },
        },
      },
    },
  );

  await app.listen(configService.get('port'));
}
bootstrap();
