# Pour the PORT - Septic Treatment Landing Page

A high-performance landing page for Pour the PORT septic tank treatment products, built with Astro and optimized for conversions.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

## 📋 Project Overview

**Pour the PORT** is a landing page designed to sell septic tank treatment products that prevent costly system failures. The site features:

- **Product Focus**: USDA Certified Biobased septic treatment packets
- **Value Proposition**: Prevent $15K+ septic system disasters
- **Target Audience**: Homeowners with septic systems
- **Conversion Goal**: Drive sales through compelling storytelling and trust signals

## 🛠️ Tech Stack

- **Framework**: [Astro 5.13.5](https://astro.build) - Static Site Generation
- **Styling**: [Tailwind CSS 3.4.17](https://tailwindcss.com) - Utility-first CSS
- **Images**: [Cloudinary](https://cloudinary.com) - Optimized image delivery
- **Deployment**: [Vercel](https://vercel.com) - Edge deployment platform
- **Performance**: Optimized for Core Web Vitals (95+ Lighthouse scores)

## 📁 Project Structure

```
pourtheport/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Hero.astro          # Main hero section
│   │   ├── HeroWithCloudinary.astro  # Enhanced hero with optimized images
│   │   ├── PainPoints.astro    # Problem identification section
│   │   ├── Solution.astro      # Product solution presentation
│   │   ├── ScientificBenefits.astro  # Scientific backing
│   │   ├── HowItWorks.astro    # Usage instructions
│   │   ├── Pricing.astro       # Product pricing and packages
│   │   ├── TrustLogos.astro    # USDA and certification badges
│   │   ├── FAQ.astro           # Frequently asked questions
│   │   ├── StickyCAT.astro     # Sticky call-to-action
│   │   └── CloudinaryImage.astro  # Optimized image component
│   ├── pages/
│   │   └── index.astro         # Main landing page
│   ├── styles/
│   │   └── global.css          # Global styles and Tailwind imports
│   └── utils/
│       └── cloudinary-simple.js   # Image optimization utilities
├── public/                  # Static assets
├── CLOUDINARY_SETUP.md      # Cloudinary integration guide
├── DEPLOYMENT.md           # Deployment instructions
└── package.json
```

## 🌤️ Cloudinary Integration

The site uses Cloudinary for optimized image delivery with automatic:
- Format selection (WebP, AVIF)
- Quality optimization
- Responsive sizing
- Lazy loading with blur placeholders

### Environment Setup
```bash
# Required environment variable
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

See `CLOUDINARY_SETUP.md` for detailed integration instructions.

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                      |
|:------------------|:--------------------------------------------|
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`         |
| `npm run preview` | Preview your build locally                  |
| `npm run astro`   | Run CLI commands like `astro add`          |

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `PUBLIC_CLOUDINARY_CLOUD_NAME`
3. Deploy automatically on every push to main

See `DEPLOYMENT.md` for detailed deployment instructions and performance optimization tips.

### Performance Targets
- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: LCP < 1.5s, FID < 100ms, CLS < 0.1
- **Image Optimization**: 40-60% faster load times via Cloudinary

## 🎨 Key Features

### Landing Page Components
- **Hero Section**: Compelling headline with environmental background
- **Pain Points**: Identifies expensive septic system problems
- **Solution**: Introduces Pour the PORT as the preventive solution
- **Scientific Benefits**: Highlights USDA certification and research backing
- **How It Works**: Simple 3-step usage instructions
- **Pricing**: Clear product packages and pricing
- **Trust Signals**: USDA, National Parks, University logos
- **FAQ**: Addresses common customer concerns
- **Sticky CTA**: Always-visible call-to-action button

### Technical Features
- **Static Site Generation**: Pre-rendered for maximum performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Optimization**: Automatic WebP/AVIF delivery via Cloudinary
- **SEO Optimized**: Meta tags, schema markup, semantic HTML
- **Core Web Vitals**: Optimized loading and layout stability

## 🔧 Development

### Adding New Components
1. Create `.astro` files in `src/components/`
2. Follow existing component patterns and Tailwind utilities
3. Import and use in `src/pages/index.astro`

### Image Management
1. Upload images to Cloudinary in organized folders
2. Use the `CloudinaryImage` component for optimized delivery
3. Reference images by their Cloudinary public ID

### Styling Guidelines
- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography scales
- Use semantic HTML for accessibility

## 📊 Analytics & Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Core Web Vitals**: Real user metrics tracking
- **Cloudinary Analytics**: Image delivery performance
- **Lighthouse CI**: Automated performance testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test locally
4. Ensure all builds pass: `npm run build`
5. Submit a pull request

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vercel Documentation](https://vercel.com/docs)

## 📝 License

This project is proprietary and confidential. All rights reserved.

---

**🌟 Built for maximum conversions and optimal performance**