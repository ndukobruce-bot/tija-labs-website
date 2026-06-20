# Tija Labs Website

Static website for Tija Labs, hosted on GitHub Pages.

## Form Delivery Setup

The contact form and role questionnaire forms are wired to Web3Forms so submissions can be sent from a static frontend without opening the visitor's email app.

To activate direct email delivery:

1. Go to https://web3forms.com/
2. Create an access key for `tijalabs@gmail.com`.
3. Verify the email if Web3Forms asks you to.
4. Open `script.js`.
5. Replace `formService.accessKey` with the Web3Forms access key generated for `tijalabs@gmail.com`.
6. Commit and push the change.

Web3Forms access keys are designed to be used in static frontend forms. Do not put private SMTP credentials, Gmail passwords, or secret API keys in this repository.
