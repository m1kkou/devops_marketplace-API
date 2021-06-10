FROM node:alpine 

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=80

EXPOSE ${PORT}

RUN chmod a+x /app && addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

ENTRYPOINT ["node", "app.js"]