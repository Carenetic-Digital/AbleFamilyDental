FROM node:20-slim

RUN apt-get update && apt-get install -y git python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Configure GitHub Packages registry for @sparkable scope
RUN --mount=type=secret,id=NPM_TOKEN \
    echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/NPM_TOKEN)" > ~/.npmrc && \
    echo "@sparkable-cms:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Copy package files first for caching
COPY package.json package-lock.json ./

RUN npm ci

# Remove .npmrc after install (token no longer needed at runtime)
RUN rm -f ~/.npmrc

# Copy site source
COPY . .

# Keep a clean copy for volume initialization
RUN cp -a /app /app-template && rm -rf /app-template/node_modules /app-template/.git

# Git config for CMS commits
RUN git config --global user.email "cms@sparkable.dev" && \
    git config --global user.name "Sparkable CMS"

RUN echo "node_modules/\n.astro/\ndist/\n.sparkable/" > /app-template/.gitignore

ENV SPARKABLE_CMS=true
ENV HOST=0.0.0.0

EXPOSE 4321

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "dev"]
