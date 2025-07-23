# ⚙️ Amex Node.js + NPM + Mirror Setup Guide

---

## 🟦 1. Install Node Version Manager (nvm) with Homebrew

```sh
brew install nvm
```

### Add the following to your `~/.zshrc`:

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"
```

---

## 🌐 2. Configure Amex NVM Mirror

Also in your `~/.zshrc`, add:

```sh
export NODEJS_ORG_MIRROR=https://artifactory.aexp.com/nodejs-proxy/
export NVM_NODEJS_ORG_MIRROR="$NODEJS_ORG_MIRROR"
```

Then reload:

```sh
source ~/.zshrc
```

---

## 📥 3. Install Latest LTS Version of Node

```sh
nvm install --lts
```

---

## 🔐 4. Root Certificate Authority

Download the Amex TLS root certificates using Docker:

```sh
docker cp "$(docker create artifactory.aexp.com/dockerproxy/ecs/cert-init:0.0.4):/opt/op-root/src/AmexOnDemandRootCAs.pem" .
```

Clean up:

```sh
docker container prune
```

Add this to `~/.zshrc`:

```sh
export NODE_EXTRA_CA_CERTS="/Users/$(whoami)/AmexOnDemandRootCAs.pem"
```

---

## 📦 5. NPM Configuration

Create or update `~/.npmrc`:

```ini
registry=https://artifactory.aexp.com/api/npm/npm
```

Also add to your project-level `.npmrc`:

```ini
<PROJECT_ROOT>/.npmrc
registry=https://artifactory.aexp.com/api/npm/npm
```

### Optional: Disable CLI Funding Messages
```ini
fund=false
```

---

## 🔁 6. Binary Mirrors (Add to ~/.npmrc if needed)

```ini
registry=https://artifactory.aexp.com/api/npm/npm

sass_binary_site=https://artifactory.aexp.com/github-node-sass/download
couchbase_binary_host_mirror=https://artifactory.aexp.com/github-couchbase/download
puppeteer_download_host=https://artifactory.aexp.com/google-storage-chromium-browser
chromedriver_cdnurl=https://artifactory.aexp.com/google-storage-chromedriver
IBM_DB_INSTALLER_URL=https://artifactory.aexp.com/node-ibm-db
electron_mirror=https://artifactory.aexp.com/electron-binaries/
node_sqlite3_binary_host_mirror=https://artifactory.aexp.com/node_sqlite3/
fsevents_binary_host_mirror=https://artifactory.aexp.com/node-fsevents/
geckodriver_cdnurl=https://artifactory.aexp.com/node-geckodriver-binaries/
snappy_binary_host_mirror=https://artifactory.aexp.com/node-snappy-bindings-github-proxy
playwright_download_host=https://artifactory.aexp.com/playwright-azureedge-raw-proxy
```

---

## 🛠️ 7. Troubleshooting: 500 Errors

If you get a 500 Internal Server Error from Artifactory:

```sh
npm cache clean --force
```

Also check `#cicd-help` Slack channel for known outages or cache issues.

---

✅ You're now set up with Amex Node + NPM + Certificate + Proxy + Mirrors.
