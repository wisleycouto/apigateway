FROM node:14.20 as build

WORKDIR /usr/src/app

COPY . ./

RUN set -eux && npm install ci --legacy-peer-deps --verbose && npm install dsgov-react@1.0.7 && \
    npx browserslist@latest --update-db && \
    #npm run dev   
    npm run build --verbose

FROM  registry.mec.gov.br/library/nginx:1.20-alpine

COPY --chown=nginx:nginx --from=build /usr/src/app/build ./

EXPOSE 8080 3000
