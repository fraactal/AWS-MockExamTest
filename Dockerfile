FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

ENV PORT=3080
ENV DATABASE_PATH=/data/prep.db

RUN mkdir -p /data

VOLUME ["/data"]

EXPOSE 3080

CMD ["npm", "start"]
