# Google Analytics 4 Setup Guide for Pour the PORT

This guide will help you set up Google Analytics 4 (GA4) to track conversions and user behavior on your Pour the PORT landing page.

## ✅ What's Already Implemented

- **Google Analytics 4 script integration** in all pages
- **Enhanced conversion tracking** for Subscribe Now buttons
- **Ecommerce tracking** with product data and values
- **User engagement tracking** (scroll depth, time on page, video interactions)
- **Contact interaction tracking** (email/phone clicks)
- **Development/production environment handling**

## 🚀 Quick Setup (5 minutes)

### Step 1: Create GA4 Property

1. Go to https://analytics.google.com/
2. Click **"Create Property"** or use existing account
3. Enter property details:
   - **Property name**: "Pour the PORT Landing Page"
   - **Time zone**: Your business time zone
   - **Currency**: USD (United States Dollar)
4. Choose **"Web"** platform

### Step 2: Set Up Data Stream

1. Click **"Web"** data stream
2. Enter your website details:
   - **Website URL**: `https://pourtheport.vercel.app` (or your custom domain)
   - **Stream name**: "Pour the PORT Website"
3. Click **"Create stream"**
4. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Environment Variables

1. Open your `.env` file (copy from `.env.example` if needed)
2. Add your Measurement ID:
   ```bash
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Save the file and restart your development server:
   ```bash
   npm run dev
   ```

### Step 4: Verify Installation

1. Open your site: http://localhost:4321/
2. Open browser console (F12)
3. Look for messages:
   - ✅ Should see: "📊 Conversion tracking initialized for Pour the PORT"
   - ✅ In production: GA4 will load and track automatically

## 📊 What Gets Tracked Automatically

### Conversion Events
- **Subscribe Now button clicks** → `begin_checkout` and `subscribe_now_click` events
- **Add to Cart clicks** → Enhanced ecommerce with product data
- **Button location tracking** → Which section users click from most

### Engagement Events  
- **Page views** → Basic traffic and session data
- **Scroll depth** → 75% scroll milestone tracking
- **Time on page** → 30 second, 1 minute, 3 minute milestones
- **Video interactions** → Wistia demo video play/pause/complete

### Contact Events
- **Email clicks** → `mailto:` link tracking
- **Phone clicks** → `tel:` link tracking  
- **Form submissions** → Contact form completions

### Ecommerce Data
- **Product ID**: `42616731533557` (Shopify variant)
- **Product name**: "Pour the PORT Septic Treatment"
- **Category**: "septic_maintenance"
- **Value**: $84.00 per conversion
- **Currency**: USD

## 🎯 Key Metrics to Monitor

### Conversion Metrics
- **Subscribe Now clicks** → How many users click your main CTA
- **Button click-through rates** → Which buttons perform best
- **Conversion value** → Total revenue potential from clicks

### User Behavior
- **Page engagement** → How long users stay and scroll
- **Traffic sources** → Where your best customers come from
- **Device/browser data** → Optimize for your audience's preferences

### Business Intelligence
- **Cost per acquisition** → If running ads, track ROI
- **Customer journey** → Multi-touch attribution analysis
- **Seasonal trends** → When septic concerns peak

## 🔧 Advanced Configuration (Optional)

### Enable Enhanced Ecommerce

In GA4 Admin → Events → Create conversion:
1. Mark `begin_checkout` as conversion
2. Mark `subscribe_now_click` as conversion  
3. Set conversion values for ROI tracking

### Set Up Goals & Funnels

1. **Awareness** → Page view
2. **Interest** → 75% scroll or 1 minute engagement
3. **Intent** → Subscribe Now click
4. **Action** → Redirect to Shopify (track with UTM parameters)

### Custom Audiences

Create audiences for:
- **High-intent users** → Clicked Subscribe Now but didn't convert
- **Engaged visitors** → Watched video + scrolled 75%
- **Return visitors** → Multiple sessions, high engagement

## 🚨 Troubleshooting

### Analytics Not Loading

**Check browser console for errors:**
```javascript
// Should see this in production with your Measurement ID:
gtag('config', 'G-XXXXXXXXXX', { ... })

// Should see this in development:
console.log('🔍 Google Analytics: Disabled in development mode')
```

**Common issues:**
- ❌ Measurement ID not set in `.env`
- ❌ Server not restarted after adding ID
- ❌ Ad blockers preventing GA4 from loading

### Events Not Tracking

**Test button clicks:**
1. Open browser console
2. Click Subscribe Now button  
3. Should see: `📊 Tracked Subscribe Now click: [button text] at [section]`

**If not working:**
- Check GA4 Real-time reports
- Verify button classes `.shopify-buy-button` exist
- Test in incognito mode (disable extensions)

### Development vs Production

**Development mode:**
- Analytics disabled by default for cleaner development
- Enable with: `PUBLIC_GA_DEBUG=true` in `.env`
- All tracking events logged to console

**Production mode:**
- Analytics automatically enabled when `PUBLIC_GA_MEASUREMENT_ID` is set
- Real data sent to GA4
- Console logging minimal

## 📈 Next Steps After Setup

### Week 1: Baseline Data
- Monitor basic traffic and engagement
- Verify all events are tracking correctly
- Set up GA4 dashboard with key metrics

### Week 2: Optimization
- Identify highest-performing button placements
- A/B test button text based on click-through rates
- Analyze user flow and engagement patterns

### Month 1: Business Intelligence
- Calculate conversion rates and customer acquisition costs
- Set up automated reports for key stakeholders
- Create custom audiences for remarketing campaigns

## 🎯 Business Impact

With proper GA4 setup, you'll have data-driven insights to:

- **Increase conversions** by optimizing high-performing button placements
- **Reduce customer acquisition costs** by focusing on best traffic sources
- **Improve user experience** based on engagement and behavior data
- **Scale marketing efforts** with confidence in ROI measurements

## 🔗 Useful Resources

- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Enhanced Ecommerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Custom Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Conversion Tracking](https://support.google.com/analytics/answer/9267735)

---

**Questions?** The analytics implementation is fully automated once you add your Measurement ID. All Pour the PORT-specific events and ecommerce tracking are preconfigured for optimal septic treatment business insights.