# Contact Form Setup Guide

## ✅ What's Been Implemented

Your contact form is now fully connected using **Next.js 15 Server Actions** with modern best practices:

### 🚀 Features

- **Server Actions**: Modern Next.js 15+ approach for form handling
- **Email Integration**: Sends emails to `contact@nemwood.be`
- **Customer Confirmation**: Automatic confirmation email to the customer
- **Form Validation**: Client-side and server-side validation using Zod
- **Error Handling**: Comprehensive error messages and field validation
- **Loading States**: Visual feedback during form submission
- **Responsive Design**: Matches your existing design system

### 📁 Files Created/Modified

- `src/app/actions/contact.ts` - Server Action for form processing
- `src/components/ContactForm.tsx` - Form component with validation
- `src/app/contact/page.tsx` - Updated to use new form component
- `env.example` - Environment variables template

## 🔧 Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=contact@nemwood.be
```

### 2. Email Provider Setup Options

#### Option A: Gmail (Recommended for testing)

1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password":
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password as `SMTP_PASS` (not your regular password)

#### Option B: Professional Email Service (Recommended for production)

- **Brevo (Sendinblue)**: Free tier with 300 emails/day
  ```env
  SMTP_HOST=smtp-relay.brevo.com
  SMTP_PORT=587
  ```
- **Mailgun**: Reliable with good deliverability
  ```env
  SMTP_HOST=smtp.mailgun.org
  SMTP_PORT=587
  ```
- **SendGrid**: Enterprise-grade email service
  ```env
  SMTP_HOST=smtp.sendgrid.net
  SMTP_PORT=587
  ```

### 3. Testing the Form

1. Set up your environment variables
2. Run `npm run dev`
3. Go to `/contact`
4. Fill out and submit the form
5. Check your email for:
   - Form submission at `contact@nemwood.be`
   - Confirmation email to the customer

## 🎯 Form Behavior

### Success Flow:

1. User fills out the form
2. Client-side validation occurs
3. Server Action processes the form
4. Email is sent to `contact@nemwood.be`
5. Confirmation email is sent to the customer
6. Success message is displayed
7. Form is reset for next submission

### Error Handling:

- **Field Validation**: Real-time validation for required fields
- **Email Validation**: Proper email format checking
- **Server Errors**: Network or email delivery failures
- **Loading States**: Disabled form during submission

## 📧 Email Templates

### Business Email (to contact@nemwood.be):

```
Nouvelle demande de contact depuis le site Nemwood

Informations du client :
- Nom : [firstName] [lastName]
- Email : [email]
- Téléphone : [phone or "Non renseigné"]

Message :
[message]

---
Email envoyé depuis le formulaire de contact Nemwood
Date : [timestamp]
```

### Customer Confirmation:

```
Bonjour [firstName],

Merci pour votre message ! Nous avons bien reçu votre demande concernant votre projet de menuiserie.

Notre équipe vous recontactera dans les plus brefs délais (généralement sous 24h) pour discuter de vos besoins et vous proposer une solution sur mesure.

Votre message :
"[message]"

Cordialement,
L'équipe Nemwood
Menuisier artisan en Belgique
```

## 🔒 Security Features

- **Server-side Processing**: All email logic runs on the server
- **Input Validation**: Zod schema validation prevents malicious input
- **Environment Variables**: Sensitive credentials are never exposed to the client
- **CSRF Protection**: Server Actions provide built-in CSRF protection
- **Rate Limiting**: Consider adding rate limiting for production use

## 🚀 Next Steps

1. **Set up environment variables** using your preferred email provider
2. **Test the form thoroughly** with various inputs
3. **Consider adding rate limiting** for production use
4. **Monitor email delivery** and adjust settings if needed
5. **Optional**: Add Google reCAPTCHA for spam protection

## 💡 Advantages of This Implementation

- **Modern**: Uses Next.js 15+ Server Actions (latest recommended approach)
- **Type-safe**: Full TypeScript support with Zod validation
- **SEO-friendly**: Server-side processing, no JavaScript required for basic functionality
- **Performance**: Minimal client-side JavaScript
- **Maintainable**: Clean separation of concerns
- **Secure**: Server-side processing with proper validation

Your contact form is now production-ready and follows Next.js best practices! 🎉

