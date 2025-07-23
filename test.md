# 🧰 Full Setup Guide (No SSH Key Yet) — Amex Dev Environment

## 🧩 1. Generate and Add SSH Key

### 1.1 Generate a new SSH key
```sh
ssh-keygen -t ed25519 -C "your_email@aexp.com"
```
- Press Enter to save to default: ~/.ssh/id_ed25519
- Set passphrase or press Enter to skip

### 1.2 Add key to Apple keychain
```sh
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

### 1.3 Copy SSH public key
```sh
pbcopy < ~/.ssh/id_ed25519.pub
```

### 1.4 Add to GitHub
- Go to: https://github.aexp.com/settings/keys
- Click **New SSH key**, give it a title, and paste the key

---

## 📦 2. Install Homebrew

### 2.1 Use Mac Self Service
- Open "Self Service" from Spotlight
- Search for Homebrew
- Click Install

> This sets static env vars at `/etc/homebrew/brew.env`.

### 2.2 Verify Homebrew installed
```sh
which brew
```
Expected output: `/opt/homebrew/bin/brew`

---

## 🧪 3. Artifactory Token

Homebrew downloads packages using an Artifactory token.
Follow internal Amex onboarding docs to generate your token. This is typically handled during the Self Service install.

---

## 🌐 4. Proxy Config (If Needed)

### 4.1 Check proxy settings
```sh
env | grep -i proxy
```

If you see:
```sh
http_proxy=http://proxy.aexp.com:8080
https_proxy=http://proxy.aexp.com:8080
```

Then run:
```sh
export NO_PROXY=americanexpress.com,aexp.com,localhost,127.0.0.1,docker.internal
export no_proxy=americanexpress.com,aexp.com,localhost,127.0.0.1,docker.internal
```

To persist:
```sh
echo 'export NO_PROXY=americanexpress.com,aexp.com,localhost,127.0.0.1,docker.internal' >> ~/.zshrc
echo 'export no_proxy=americanexpress.com,aexp.com,localhost,127.0.0.1,docker.internal' >> ~/.zshrc
source ~/.zshrc
```

---

## 🔧 5. Install Git
```sh
brew install git
```

---

## 🐳 6. Install Docker

### 6.1 Install Docker Desktop
- Download from: https://www.docker.com/products/docker-desktop/
- Or use Mac Self Service

### 6.2 Verify Docker is working
```sh
docker info
```

### 6.3 Docker Configuration for Amex
In Docker Desktop → Preferences → Docker Engine:
```json
{
  "debug": true,
  "registry-mirrors": ["https://dockerproxy.aexp.com"],
  "experimental": false
}
```
Click **Apply & Restart**

---

## 🧰 7. (Optional) Install Cask Packages
```sh
brew install --cask google-chrome
brew install --cask visual-studio-code
```

---

## ✅ Done!
You're now set up with:
- ✅ SSH key
- ✅ Homebrew
- ✅ Git
- ✅ Docker
