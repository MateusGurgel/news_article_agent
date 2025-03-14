FROM node:20-slim

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@10.6.0 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]