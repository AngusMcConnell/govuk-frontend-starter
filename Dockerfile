# --------------> The build image
FROM node:lts@sha256:e9891237dfbb1de60ce19e9ff9fac5d73ad9c37da303ad72ff2a425ad1057e71 AS build
WORKDIR /usr/src/apply-juggling-license
COPY package*.json /usr/src/apply-juggling-license/
RUN npm ci --omit=dev

# --------------> The production image
FROM node:lts-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
USER node
WORKDIR /usr/src/apply-juggling-license
COPY --chown=node:node --from=build /usr/src/apply-juggling-license/node_modules /usr/src/apply-juggling-license/node_modules
COPY --chown=node:node app /usr/src/apply-juggling-license/app
COPY --chown=node:node package*.json /usr/src/apply-juggling-license/
CMD ["dumb-init", "node", "app/server"]
