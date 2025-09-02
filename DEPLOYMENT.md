# 🚀 Deployment Guide - Pour the PORT Landing Page

## Vercel Deployment (Recommended)

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mikeusry/pourtheport.git)

### Manual Deployment Steps

#### 1. Connect Repository
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `mikeusry/pourtheport` repository

#### 2. Configure Build Settings
Vercel will auto-detect the Astro framework. Verify these settings:
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x (recommended)

#### 3. Environment Variables
Add these environment variables in Vercel dashboard:
```bash
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

#### 4. Deploy
Click "Deploy" and wait for build completion (~2-3 minutes)

### 🎯 Performance Optimizations Included

**Automatic Optimizations:**
- ✅ Static site generation (SSG)
- ✅ Image optimization via Cloudinary
- ✅ Automatic compression (Brotli/Gzip)
- ✅ Global CDN distribution
- ✅ Core Web Vitals optimization
- ✅ Security headers configured

**Vercel Analytics:**
- Web Analytics enabled for performance monitoring
- Real User Monitoring (RUM) data
- Core Web Vitals tracking

### 📊 Expected Performance Scores

**Lighthouse Scores (Target):**
- Performance: 95-100
- Accessibility: 95-100  
- Best Practices: 95-100
- SEO: 95-100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 1.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## Alternative Deployment Options

### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist

# Environment variables
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

### GitHub Pages
```bash
# Add to package.json scripts
"build:gh": "astro build --site https://mikeusry.github.io/pourtheport/"

# Deploy via GitHub Actions (see .github/workflows/deploy.yml)
```

### Self-Hosted (Static Files)
```bash
npm run build
# Upload contents of 'dist' folder to your web server
```

---

## 🔧 Post-Deployment Checklist

### Required Setup
- [ ] Add Cloudinary cloud name to environment variables
- [ ] Upload images to Cloudinary using folder structure from `.env.example`
- [ ] Update image public IDs in components if needed
- [ ] Configure custom domain (if applicable)
- [ ] Set up analytics (Google Analytics, etc.)

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Test mobile performance
- [ ] Verify Core Web Vitals
- [ ] Test all interactive elements (FAQ accordion, sticky CTA)
- [ ] Validate responsive design across devices

### SEO Verification  
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Validate schema markup with [Schema Validator](https://validator.schema.org/)

### Marketing Setup
- [ ] Configure conversion tracking
- [ ] Set up A/B testing (if needed)
- [ ] Connect email capture forms
- [ ] Configure payment processing integration
- [ ] Set up customer support chat

---

## 🚨 Troubleshooting

### Common Build Issues

**Issue**: Cloudinary images not loading
```bash
# Solution: Verify environment variable
echo $PUBLIC_CLOUDINARY_CLOUD_NAME
# Should output your cloud name, not 'demo'
```

**Issue**: Tailwind styles not applied
```bash
# Solution: Rebuild with cleared cache
rm -rf node_modules/.vite
npm run build
```

**Issue**: Build fails with memory error
```bash
# Solution: Increase Node.js memory limit
node --max-old-space-size=4096 ./node_modules/.bin/astro build
```

### Performance Issues

**Slow image loading:**
- Verify Cloudinary URLs are generating correctly
- Check image sizes aren't too large
- Ensure lazy loading is working

**Poor mobile performance:**
- Test on real devices, not just DevTools
- Verify responsive images are loading correct sizes
- Check for layout shifts during loading

### Domain Configuration

**Custom Domain Setup:**
1. Add domain in Vercel dashboard
2. Configure DNS records:
   - A record: `76.76.19.61`  
   - CNAME: `mikeusry.vercel.app`
3. Wait for SSL certificate generation

---

## 📈 Monitoring & Analytics

### Built-in Vercel Analytics
- Automatically tracks Core Web Vitals
- Real user performance data
- Geographic performance breakdown
- Device and browser analytics

### Recommended Additional Tools
- **Google Analytics 4**: User behavior tracking
- **Google Search Console**: SEO performance
- **Hotjar**: User experience heatmaps
- **Cloudinary Analytics**: Image delivery performance

---

## 🔄 Continuous Deployment

Every push to the `main` branch automatically triggers:
1. Build process with performance optimizations
2. Automated testing (if configured)
3. Deployment to production URL
4. Preview deployments for pull requests

### Branch Protection
Consider setting up branch protection rules:
- Require pull request reviews
- Require status checks to pass
- Require up-to-date branches

---

*Your Pour the PORT landing page is optimized for maximum performance and conversions on Vercel's edge network!*