# --------------> The build image
FROM node:lts@sha256:1de022d8459f896fff2e7b865823699dc7a8d5567507e8b87b14a7442e07f206 AS build
WORKDIR /usr/src/apply-juggling-license
COPY package*.json /usr/src/apply-juggling-license/
RUN npm ci --omit=dev

# --------------> The production image
FROM node:lts-alpine@sha256:cd6fb7efa6490f039f3471a189214d5f548c11df1ff9e5b181aa49e22c14383e
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
USER node
WORKDIR /usr/src/apply-juggling-license
COPY --chown=node:node --from=build /usr/src/apply-juggling-license/node_modules /usr/src/apply-juggling-license/node_modules
COPY --chown=node:node app /usr/src/apply-juggling-license/app
COPY --chown=node:node package*.json /usr/src/apply-juggling-license/
CMD ["dumb-init", "node", "app/server"]
