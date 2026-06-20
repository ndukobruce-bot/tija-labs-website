# Tija Labs Website

The official website for **Tija Labs** — a Kenya-rooted product lab building a connected ecosystem of productivity apps.

**Live site:** [https://tijalabs.com](https://tijalabs.com)
**Repository:** [tija-labs-website](https://github.com/ndukobruce-bot/tija-labs-website)
**Hosting:** GitHub Pages, with a custom domain (`tijalabs.com`) and HTTPS enforced

---

## About Tija Labs

Tija Labs is a productivity-focused product studio building apps that help people get more out of their time — whether they're studying, hunting for a job, growing early in their career, or picking up a new skill.

**Founders:**
- **Bruce Nduko** — Co-Founder & CTO
- **Jeremiah Rioba** — Co-Founder

---

## Tech Stack

- Plain HTML/CSS/JavaScript (static site, no build process)
- Hosted on **GitHub Pages**
- Custom domain via **Namecheap** DNS, pointed to GitHub Pages
- Form submissions handled by **Web3Forms** (no backend server needed)

---

## Form Delivery Setup (Web3Forms)

The contact form and role questionnaire forms are wired to **Web3Forms** so submissions are sent directly without redirecting visitors to their email app.

All form submissions are currently delivered to: **tijalabs@gmail.com**

### If the access key ever needs to be regenerated or changed:

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Log in (or create an access key for) the relevant inbox email
3. Verify the email if Web3Forms asks you to
4. Open `script.js`
5. Replace the value of `formService.accessKey` with the new Web3Forms access key
6. Commit and push the change
7. Test by submitting the live form and confirming the email arrives at the correct inbox

**Important:** Web3Forms access keys are designed to be used in static frontend code — this is safe. Do **not** put private SMTP credentials, Gmail passwords, or other secret API keys in this repository.

---

## Deploying Changes

This site auto-deploys via GitHub Pages whenever changes are pushed to the `main` branch. To make and publish updates:

1. Edit the relevant files (`index.html`, `script.js`, `style.css`, etc.) locally
2. Commit your changes (via GitHub Desktop or `git add . && git commit -m "your message"`)
3. Push to `main` (`git push` or "Push origin" in GitHub Desktop)
4. GitHub Pages will rebuild automatically within 1-2 minutes
5. Confirm changes at [https://tijalabs.com](https://tijalabs.com)

---

## Notes

- Keep this repo as a single, flat structure (avoid nested git submodules) to ensure GitHub Pages reliably picks up all file changes.
- If you ever see the live site not reflecting a recent push, check directly on github.com that the file you edited is the one actually being served (not a duplicate or a submodule reference).
