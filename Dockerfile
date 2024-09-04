FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i -ci

COPY \
src/ \
nest-cli.json \
tsconfig.json \
tsconfig.build.json \
/app/

RUN npm run build --omit=dev

FROM node:20-alpine AS development

RUN apk add --no-cache docker-cli-compose git

WORKDIR /app

EXPOSE 3000
EXPOSE 9229

CMD npm i && npm run start:debug

FROM build AS test

CMD npm run test

FROM node:20-alpine AS production

RUN apk add --no-cache docker-cli-compose git

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD npm run start:prod
