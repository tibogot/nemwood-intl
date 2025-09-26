# Google Analytics Setup for Nemwood

## 🎯 What Google Analytics Tracks:

### **Traffic Analysis:**

- **Visitors**: How many people visit your site
- **Page Views**: Which pages are most popular
- **Traffic Sources**: Google, social media, direct visits
- **Geographic Data**: Belgian market focus

### **User Behavior:**

- **Bounce Rate**: How many people leave after one page
- **Time on Site**: How long visitors stay
- **Page Flow**: Which pages visitors go to next
- **Exit Pages**: Where people leave your site

### **Business Metrics:**

- **Contact Form Submissions**: Lead generation tracking
- **Phone Clicks**: Track phone call interest
- **Email Clicks**: Track email contact interest
- **Service Page Performance**: Which services get most interest

## 🔧 Setup Instructions:

### **1. Create Google Analytics Account:**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create account for "Nemwood"
3. Create property for `https://www.nemwood.be`
4. Get your **Measurement ID** (starts with `G-`)

### **2. Configure Environment Variables:**

Create a `.env.local` file in your project root:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Replace G-XXXXXXXXXX with your actual Measurement ID
```

### **3. Restart Your Development Server:**

```bash
npm run dev
```

## 📊 What Gets Tracked Automatically:

✅ **Page Views**: Every page visit  
✅ **Contact Form Submissions**: Form submissions  
✅ **Phone Number Clicks**: When people click phone numbers  
✅ **Email Clicks**: When people click email addresses  
✅ **User Location**: Geographic data (Belgian market focus)  
✅ **Device Type**: Mobile vs desktop usage  
✅ **Page Performance**: Load times and errors

## 🎯 Key Metrics for Your Business:

### **Critical KPIs:**

- **Belgian Visitors**: Ensure local market reach
- **Service Page Views**: Which services get most interest
- **Contact Form Submissions**: Lead generation success
- **Mobile Experience**: Mobile user behavior
- **Page Speed**: Core Web Vitals performance

### **Business Goals:**

- **Increase Contact Form Submissions**
- **Improve Service Page Engagement**
- **Optimize for Belgian Market**
- **Enhance Mobile Experience**

## 🔍 Viewing Your Data:

1. **Real-time Reports**: See current visitors
2. **Audience Reports**: Understand your visitors
3. **Acquisition Reports**: Where traffic comes from
4. **Behavior Reports**: How people use your site
5. **Conversions**: Track contact form submissions

## 🚀 Next Steps:

1. **Set up Google Analytics account**
2. **Add your Measurement ID to .env.local**
3. **Test tracking on your site**
4. **Set up goals for contact form submissions**
5. **Monitor Belgian market performance**

## 📱 Privacy Compliance:

- **GDPR Compliant**: IP anonymization enabled
- **No Personal Data**: Only aggregate statistics
- **Cookie Consent**: Respects user privacy settings
- **EU Focus**: Optimized for European visitors

