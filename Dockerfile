FROM node:14.5.0-alpine AS builder
WORKDIR /treeo/webapp
COPY package.json /treeo/webapp/package.json
# RUN npm install
RUN npm install --save --legacy-peer-deps
COPY . .

FROM node:14.5.0-alpine
WORKDIR /treeo/webapp
COPY --from=builder /treeo/webapp .
EXPOSE 3000
CMD ["npm", "run", "start"]