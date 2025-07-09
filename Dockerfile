# --------------> The build image
FROM node:lts@sha256:2fa6c977460b56d4d8278947ab56faeb312bc4cc6c4cf78920c6de27812f51c5 AS build
WORKDIR /usr/src/apply-juggling-license
COPY package*.json /usr/src/apply-juggling-license/
RUN npm ci --omit=dev

# --------------> The production image
FROM node:lts-alpine@sha256:10962e8568729b0cfd506170c5a2d1918a2c10ac08c0e6900180b4bac061adc9
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
USER node
WORKDIR /usr/src/apply-juggling-license
COPY --chown=node:node --from=build /usr/src/apply-juggling-license/node_modules /usr/src/apply-juggling-license/node_modules
COPY --chown=node:node app /usr/src/apply-juggling-license/app
COPY --chown=node:node package*.json /usr/src/apply-juggling-license/
CMD ["dumb-init", "node", "app/server"]
