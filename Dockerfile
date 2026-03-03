# --------------> The build image
FROM node:lts@sha256:3a09aa6354567619221ef6c45a5051b671f953f0a1924d1f819ffb236e520e6b AS build
WORKDIR /usr/src/apply-juggling-license
COPY package*.json /usr/src/apply-juggling-license/
RUN npm ci --omit=dev

# --------------> The production image
FROM node:lts-alpine@sha256:7fddd9ddeae8196abf4a3ef2de34e11f7b1a722119f91f28ddf1e99dcafdf114
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
USER node
WORKDIR /usr/src/apply-juggling-license
COPY --chown=node:node --from=build /usr/src/apply-juggling-license/node_modules /usr/src/apply-juggling-license/node_modules
COPY --chown=node:node app /usr/src/apply-juggling-license/app
COPY --chown=node:node package*.json /usr/src/apply-juggling-license/
CMD ["dumb-init", "node", "app/server"]
