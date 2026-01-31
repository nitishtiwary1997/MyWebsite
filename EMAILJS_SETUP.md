# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions at **info.nitish1997@gmail.com**.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Log in to your EmailJS dashboard
2. Go to **Email Services** → **Add New Service**
3. Choose **Gmail** (or your email provider)
4. Click **Connect Account** and authorize EmailJS to send emails
5. Note down your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. Use this template:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your website contact form.
Reply to: {{reply_to}}
```

3. Set **To Email** to: `info.nitish1997@gmail.com`
4. Set **From Name** to: `{{from_name}}`
5. Set **Reply To** to: `{{reply_to}}`
6. Save the template and note down your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxxxxxx`)
3. Copy this key

## Step 5: Update Your Website Code

Open `script.js` and replace these placeholders:

1. Replace `YOUR_PUBLIC_KEY` with your Public Key:
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual key
```

2. Replace `YOUR_SERVICE_ID` with your Service ID:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

3. Replace `YOUR_TEMPLATE_ID` with your Template ID:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

## Example After Setup:

```javascript
// Initialize EmailJS
emailjs.init('abc123xyz789'); // Your Public Key

// In the form submission:
emailjs.send('service_abc123', 'template_xyz789', {
    to_email: 'info.nitish1997@gmail.com',
    from_name: data.from_name,
    from_email: data.from_email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    reply_to: data.from_email
})
```

## Testing

1. Open your website's contact page
2. Fill out the form and submit
3. Check your email inbox at `info.nitish1997@gmail.com`
4. You should receive the form submission!

## Free Plan Limits

- 200 emails per month (free)
- Perfect for small businesses and portfolios

## Troubleshooting

- **Emails not sending?** Check browser console for errors
- **Service ID/Template ID wrong?** Double-check in EmailJS dashboard
- **Public Key incorrect?** Verify in Account → General settings

## Alternative: Quick Setup Script

If you want, I can create a setup script that helps you configure this automatically. Just let me know!

---

**Note:** Currently, the form has a fallback that opens your email client if EmailJS is not configured. Once you complete the setup above, emails will be sent automatically!
