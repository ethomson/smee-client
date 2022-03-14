FROM node:16 AS build

WORKDIR /smee

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src src
RUN npm ci
RUN npm run build

FROM node:16

WORKDIR /smee
COPY --from=build /smee/package.json .
COPY --from=build /smee/package-lock.json .
COPY --from=build /smee/bin bin
RUN npm ci --only=production

ENV NODE_ENV=production
ENTRYPOINT [ "/usr/local/bin/node", "bin/index.js" ]
