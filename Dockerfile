# Astro 7 requires node >=22.12 (node 20 makes astro hard-exit at startup →
# machine restart loop). node:22-slim also has better-sqlite3 prebuilds, which
# skips the 15-25 min source compile on first volume install (gotcha #8).
FROM node:22-slim

RUN apt-get update && apt-get install -y git python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Configure GitHub Packages registry for @sparkable scope
RUN --mount=type=secret,id=NPM_TOKEN \
    echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/NPM_TOKEN)" > ~/.npmrc && \
    echo "@sparkable-cms:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Copy package files first for caching. The site .npmrc carries
# legacy-peer-deps=true (CMS pins peer astro ^5, this site runs astro 7) —
# npm ci needs it or the install ERESOLVEs.
COPY package.json package-lock.json .npmrc ./

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
# dev:fly = astro dev --ignore-lock. Astro 7's dev-server lockfile persists on
# the volume across container restarts; without --ignore-lock a reboot after a
# crash refuses to start ("Another astro dev server is already running") and
# the machine crash-loops. Foreground-only — fly supervises the process.
CMD ["npm", "run", "dev:fly"]
