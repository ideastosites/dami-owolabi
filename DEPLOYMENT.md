# Deploying to cPanel via Git

This guide covers deploying this Next.js app (`ideastosites/dami-owolabi`, a **private** GitHub repo) to cPanel shared hosting, using cPanel's built-in Git Version Control feature plus Setup Node.js App (Phusion Passenger). Written for a host that has SSH access and the Node.js Selector — nearly all modern cPanel shared/reseller plans do.

Do this once, in order. Sections are numbered so you can pick up mid-way if interrupted.

---

## 0. What you'll end up with

- A bare/working git clone living on the server, pulled straight from GitHub on your command (no CI needed).
- A separate **Node.js Application** (Passenger) pointed at that checkout, running `next start` behind cPanel's reverse proxy.
- `.env` values entered through cPanel's UI (never committed — same as `.env.local` locally).
- The `/data/*.json` payment/waitlist files living **outside** the git checkout, so a redeploy never touches customer data.
- Two cron jobs (`reconcile`, `backup`) already documented in `.env.example`.

---

## 1. Prerequisites

- cPanel access with **Git™ Version Control** and **Setup Node.js App** both visible in the dashboard (search the top search box if you don't see the icons — some themes hide them under "Software").
- SSH access to the account (Security → SSH Access, or ask your host to enable it). You'll need a terminal for a few one-line commands; the cPanel Terminal app works too if SSH isn't available.
- Confirm the host's Node.js Selector offers **Node 20 or newer** (`engines.node` in `package.json` requires `>=20.0.0`). If only Node 18 is offered, ask the host to add a newer version before continuing — don't try to make the app run on 18.

---

## 2. Give the server access to the private repo

Since `ideastosites/dami-owolabi` is private, the server needs its own credential — don't reuse your personal GitHub password anywhere.

**Recommended: a deploy key (SSH, read-only, scoped to this one repo).**

1. SSH into the cPanel account:
   ```
   ssh yourcpaneluser@yourserver.com -p <ssh-port>
   ```
2. Generate a key dedicated to this deployment (don't reuse an existing one):
   ```
   ssh-keygen -t ed25519 -C "cpanel-deploy-dami-owolabi" -f ~/.ssh/dami_owolabi_deploy
   ```
   Leave the passphrase empty (a passphrase would block unattended `git pull`).
3. Print the public key and copy it:
   ```
   cat ~/.ssh/dami_owolabi_deploy.pub
   ```
4. On GitHub: repo → **Settings → Deploy keys → Add deploy key**. Paste it, leave "Allow write access" **unchecked** (the server only ever needs to pull), save.
5. Tell SSH to use that key specifically for GitHub, by creating/editing `~/.ssh/config` on the server:
   ```
   Host github.com
     IdentityFile ~/.ssh/dami_owolabi_deploy
     IdentitiesOnly yes
   ```
6. Test it:
   ```
   ssh -T git@github.com
   ```
   You should see "Hi ideastosites/dami-owolabi! You've successfully authenticated..." — if it says "Permission denied," the key wasn't picked up; check file permissions (`chmod 600 ~/.ssh/dami_owolabi_deploy`).

You'll clone using the SSH URL (`git@github.com:ideastosites/dami-owolabi.git`), not the HTTPS one, so this key is actually used.

---

## 3. Create the Git Version Control repo in cPanel

1. cPanel → **Git™ Version Control** → **Create**.
2. **Clone a Repository** → toggle on.
3. **Clone URL**: `git@github.com:ideastosites/dami-owolabi.git`
4. **Repository Path**: pick a directory **outside** `public_html`, e.g. `/home/yourcpaneluser/repos/dami-owolabi`. Node apps run via Passenger, not served as static files from `public_html`, so there's no reason for the checkout to be web-exposed.
5. **Repository Name**: whatever you like, e.g. `dami-owolabi`.
6. Create. cPanel clones the repo server-side using its own SSH agent — if this fails with a permission error, re-check step 2 (the deploy key must be reachable by the user cPanel's Git feature runs as, which is normally the same account you SSH'd in as).

You now have the full `main` branch checked out at that path. This is your **source checkout** — Node.js Selector will point at it (or a subdirectory) as the app root.

---

## 4. Set up the Node.js Application (Passenger)

Passenger's Node integration expects a small startup file that listens on `process.env.PORT` — it does **not** run `npm start` directly against `next start` on its own. Add a two-line `server.js` (safe to commit, it's generic):

```js
// server.js — Passenger entry point; wraps `next start` so Phusion Passenger
// (cPanel's Node.js Selector) can hand it a port via process.env.PORT.
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
});
```

Commit this file to the repo (`git add server.js`, commit, push) before continuing — cPanel's checkout needs to have it too, so pull it down (`git pull`) inside the server checkout from step 3 once it's pushed.

Then in cPanel:

1. **Setup Node.js App** → **Create Application**.
2. **Node.js version**: 20.x (or newer, matching what's available).
3. **Application mode**: Production.
4. **Application root**: the path from step 3, e.g. `repos/dami-owolabi` (relative to home).
5. **Application URL**: the domain/subdomain this should serve, e.g. `damiowolabi.com`.
6. **Application startup file**: `server.js`.
7. Save/Create.

cPanel now shows a command block like:
```
source /home/yourcpaneluser/nodevenv/repos/dami-owolabi/20/bin/activate && cd /home/yourcpaneluser/repos/dami-owolabi
```
That activates the isolated Node virtualenv Passenger created for this app — you'll reuse this line by hand whenever you need to run `npm`/`node` commands against this app outside cPanel's UI (e.g. over SSH).

---

## 5. Environment variables

Enter every variable from `.env.example` into the Node.js App's **Environment Variables** table in cPanel (not a `.env` file — cPanel injects these into Passenger's process environment directly, which is what `next start` reads from). At minimum:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | your production Resend key |
| `LEAD_NOTIFY_EMAIL` | `hello@damiowolabi.com` |
| `LEAD_FROM_EMAIL` | `hello@damiowolabi.com` |
| `PAYMENT_NOTIFY_EMAIL` | `hello@damiowolabi.com` |
| `NOVAC_SECRET_KEY` | **live** Novac secret key (not the sandbox one) |
| `NOVAC_PUBLIC_KEY` | **live** Novac public key |
| `NOVAC_WEBHOOK_ALLOWED_IP` | leave unset unless Novac's IP differs from the documented default |
| `SITE_URL` | `https://damiowolabi.com` |
| `CRON_SECRET` | generate with `openssl rand -hex 32` |
| `ADMIN_PASSWORD` | a strong password, not the dev one |
| `ADMIN_SESSION_SECRET` | generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | your GA4 ID, if/when you turn on analytics |

Leave `GEMINI_API_KEY` out — that's a local tooling key, not used at runtime.

After saving env vars, cPanel will prompt you to restart the app — do that after step 7 (first build), not before, since there's nothing built yet.

---

## 6. Move `/data/` outside the git checkout

`data/payments.json` and `data/waitlist.json` are gitignored on purpose (real customer PII, never in version control) — but that also means **a fresh `git clone` won't create the `data/` directory at all**, and if you ever re-clone or wipe the checkout, any `data/` folder living inside it would be destroyed with it. Keep it outside the repo path entirely:

1. Over SSH, create a sibling directory:
   ```
   mkdir -p /home/yourcpaneluser/dami-owolabi-data
   ```
2. Symlink it into the checkout:
   ```
   cd /home/yourcpaneluser/repos/dami-owolabi
   ln -s /home/yourcpaneluser/dami-owolabi-data data
   ```
3. Confirm the app's file-writing code just uses a relative `data/...` path (it does — `lib/payments/store.ts` / `lib/waitlist/store.ts` resolve from `process.cwd()`), so the symlink is transparent to it.

Do this **before** the first real payment or waitlist signup lands in production.

---

## 7. First build and start

Over SSH, activate the app's virtualenv (the exact command cPanel showed you in step 4) and build:

```
source /home/yourcpaneluser/nodevenv/repos/dami-owolabi/20/bin/activate && cd /home/yourcpaneluser/repos/dami-owolabi
npm ci
npm run build
```

`npm ci` (not `npm install`) uses `package-lock.json` exactly — always prefer it on the server so you never get a dependency drift between local and prod.

Then, back in cPanel's **Setup Node.js App** page, click **Restart** on the application. Passenger picks up the built `.next/` output and starts serving. Visit the domain and confirm the homepage loads over HTTPS.

If the app doesn't come up, check **Setup Node.js App → your app → Errors** (Passenger's stderr log) first — most first-run failures are a missing env var or the build not having completed.

---

## 8. Redeploying after future changes

Every time you push new commits to `main` on GitHub, repeat this on the server:

```
cd /home/yourcpaneluser/repos/dami-owolabi
git pull origin main
source /home/yourcpaneluser/nodevenv/repos/dami-owolabi/20/bin/activate
npm ci
npm run build
```

Then restart the app either from **Setup Node.js App → Restart**, or via `touch tmp/restart.txt` inside the app root (Passenger watches for this and restarts automatically — create the `tmp/` dir once if it doesn't exist).

### Optional: automate the "pull → build → restart" sequence

cPanel's Git Version Control feature runs a `.cpanel.yml` deployment task list automatically whenever you click **Update from Remote** (or **Manage** → **Pull or Deploy**) on the repo. Add this file at the repo root and commit it:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/yourcpaneluser/repos/dami-owolabi/
    - /bin/cp -R . $DEPLOYPATH
    - source /home/yourcpaneluser/nodevenv/repos/dami-owolabi/20/bin/activate && cd $DEPLOYPATH && npm ci && npm run build
    - touch $DEPLOYPATH/tmp/restart.txt
```

Replace `yourcpaneluser` with the real account username in both paths. With this in place, the full "Redeploying" section above collapses to: push to GitHub, then click **Pull or Deploy** in cPanel's Git Version Control UI.

---

## 9. Cron jobs

cPanel → **Cron Jobs** → add two, using the `CRON_SECRET` you set in step 5:

- Every 15–30 minutes — catches payments whose webhook never arrived:
  ```
  curl -s "https://damiowolabi.com/api/cron/reconcile?secret=YOUR_CRON_SECRET"
  ```
- Once daily — emails a dated backup of `data/*.json` off-server:
  ```
  curl -s "https://damiowolabi.com/api/cron/backup?secret=YOUR_CRON_SECRET"
  ```

---

## 10. Novac dashboard

Point the **live** webhook/callback URL at:
```
https://damiowolabi.com/api/webhooks/novac
```
in the Novac dashboard's live settings (not the sandbox settings), once you've swapped in the live `NOVAC_SECRET_KEY`/`NOVAC_PUBLIC_KEY` from step 5.

---

## 11. Post-deploy checklist

- [ ] `https://damiowolabi.com` loads over HTTPS with a valid cert (cPanel's AutoSSL should cover this automatically once the domain resolves to the server)
- [ ] `/admin` login works with the production `ADMIN_PASSWORD`
- [ ] A test waitlist signup and a test inquiry both arrive at `hello@damiowolabi.com`
- [ ] A real ₦100 test payment completes end-to-end (live keys) and shows up in `/admin`
- [ ] Both cron jobs are listed and firing (check `data/` for a new backup file the day after setup)
- [ ] `data/payments.json` and `data/waitlist.json` resolve to the symlinked path outside the repo (`ls -la data` inside the app root should show it as a symlink)

---

## Appendix: Deploying without Git

If you'd rather not set up SSH/deploy keys at all, you can skip sections 2–3 entirely and upload the built app directly through cPanel's **File Manager** (or an FTP/SFTP client). Sections 4–11 above (Node.js App setup, env vars, `/data/` symlink, cron jobs, Novac callback URL, checklist) are unchanged — this only replaces how the code gets onto the server and how you redeploy later.

The trade-off: every redeploy is a manual re-upload instead of `git pull`, and there's no history of what's actually running on the server — worth it for a simple setup, more error-prone once updates get frequent.

### A. Build locally, upload only what's needed

Next.js needs the source, `node_modules`, and the built `.next/` output to run `next start` (this app doesn't use `output: "standalone"`, so `node_modules` has to travel with it — see note below if you'd rather avoid that). From your local machine, in the project root:

```
npm ci
npm run build
```

Then zip up exactly what the server needs to run — skip `.git`, dev-only files, and anything gitignored like `.env*` and `/data/`:

```
zip -r deploy.zip \
  .next public app components lib \
  server.js package.json package-lock.json next.config.ts \
  node_modules \
  -x "node_modules/.cache/*"
```

This zip will be large (node_modules included) — that's expected and fine for a one-time/occasional upload.

### B. First upload

1. cPanel → **File Manager**, navigate to (or create) a directory **outside** `public_html`, e.g. `dami-owolabi-app`.
2. **Upload** → select `deploy.zip` → wait for it to finish → select it → **Extract**.
3. Delete the zip afterward to save space (File Manager → select `deploy.zip` → Delete).
4. Continue from **section 4** of this guide (Setup Node.js App), pointing **Application root** at this directory and **Application startup file** at `server.js`.
5. Continue through **section 5** (env vars) and **section 6** (`/data/` symlink — do this via File Manager's "Create symlink" isn't available in most File Manager versions, so use cPanel's **Terminal** app for the two `mkdir`/`ln -s` commands instead — no SSH client needed on your own machine, just the browser-based Terminal).

### C. Redeploying after changes

Every time you make changes locally:

```
npm ci
npm run build
```

Re-zip the same set of paths, then in File Manager: upload the new `deploy.zip` into the app directory, extract it (File Manager will prompt to overwrite — confirm), delete the zip. Then restart via **Setup Node.js App → Restart**, or `touch tmp/restart.txt` in the app root through File Manager's "New File" (create the `tmp/` folder once if missing).

Since `.next/` is a full rebuild each time and `node_modules` rarely changes, you can speed this up after the first upload by zipping and re-uploading just `.next/`, `server.js`, `package.json`, and any changed source directories — Passenger only needs `.next/` and `node_modules` to actually serve traffic; `app/`, `components/`, `lib/` are pre-compiled into `.next/` and aren't read at runtime.

### Note: avoiding the node_modules upload entirely

If re-uploading `node_modules` every time is too slow on a weak connection, use cPanel's **Terminal** app (browser-based, no SSH client needed) after each code upload to run `npm ci` server-side instead of zipping `node_modules` locally:

```
cd ~/dami-owolabi-app
source ~/nodevenv/dami-owolabi-app/20/bin/activate
npm ci
```

That still avoids needing a git checkout or deploy key — it's just running `npm` against files you uploaded by hand, not files git pulled.

---

## Notes on why this shape, specifically

- **Deploy key, not a personal access token**: a PAT tied to your GitHub account would also work, but a repo-scoped, read-only deploy key is safer to leave sitting on a shared host — if the server is ever compromised, the blast radius is "can read this one repo," not "can act as your GitHub account."
- **`server.js` wrapper instead of `next start` directly**: Passenger's Node integration specifically expects an app that listens on `process.env.PORT`; `next start` does that internally too, but Passenger's process manager needs to load a file it controls (the "Application startup file"), so a thin wrapper is the standard pattern for deploying Next.js under Passenger.
- **`/data/` symlinked outside the repo**: keeps a `git clean`, fresh re-clone, or accidental `rm -rf` of the checkout from ever being able to touch payment/waitlist records — the blast radius of a bad deploy stays limited to code.
