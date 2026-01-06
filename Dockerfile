# --------------> The build image
FROM node:lts@sha256:b52a8d1206132b36d60e51e413d9a81336e8a0206d3b648cabd6d5a49c4c0f54 AS build
WORKDIR /usr/src/apply-juggling-license
COPY package*.json /usr/src/apply-juggling-license/
RUN npm ci --omit=dev

# --------------> The production image
FROM node:lts-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
USER node
WORKDIR /usr/src/apply-juggling-license
COPY --chown=node:node --from=build /usr/src/apply-juggling-license/node_modules /usr/src/apply-juggling-license/node_modules
COPY --chown=node:node app /usr/src/apply-juggling-license/app
COPY --chown=node:node package*.json /usr/src/apply-juggling-license/
CMD ["dumb-init", "node", "app/server"]
