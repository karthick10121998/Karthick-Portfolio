# Vercel Deployment Guide

This guide explains how to deploy the Karthick Portfolio to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (create at https://vercel.com)

## Setup Steps

### 1. Connect Repository to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Select your GitHub account and search for `Karthick-Portfolio`
3. Click "Import"
4. Skip "Create Team" if you don't need it
5. Click "Deploy"

### 2. Configure Environment Variables

After deployment (or before), go to your project settings in Vercel:

1. Navigate to **Settings** → **Environment Variables**
2. Add the following variables:

#### Required Variables:
- `VITE_ANALYTICS_ENDPOINT`: Your Umami analytics endpoint (e.g., `https://umami.example.com`)
- `VITE_ANALYTICS_WEBSITE_ID`: Your website ID from Umami analytics

#### Optional Variables (if using storage features):
- `BUILT_IN_FORGE_API_URL`: Forge API endpoint
- `BUILT_IN_FORGE_API_KEY`: Forge API key

### 3. Build Settings

The build configuration is automatically detected:

- **Build Command**: `pnpm install && pnpm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install --frozen-lockfile`

### 4. Verify Deployment

1. Wait for the deployment to complete (usually 1-2 minutes)
2. Visit your deployment URL
3. Check browser console for any errors
4. Verify analytics are working if configured

## Troubleshooting

### Build Fails with Dependency Errors
- Ensure `pnpm-lock.yaml` is up to date locally
- Run `pnpm install` locally and commit changes
- Push to GitHub and redeploy

### Environment Variables Not Loading
- Verify variables are set in Vercel project settings
- Check that variable names match exactly (case-sensitive)
- Redeploy after adding environment variables

### Analytics Not Showing
- Verify `VITE_ANALYTICS_ENDPOINT` is correct and includes protocol (http:// or https://)
- Check Umami dashboard for website tracking code

### Static Files (Images, Fonts) Not Loading
- Verify files exist in `client/public/` directory
- Check browser network tab for 404 errors
- Ensure paths use `/` prefix in HTML

## Local Development

To test locally before deploying:

```bash
pnpm install
pnpm run dev
```

To build locally:

```bash
pnpm run build
pnpm run preview
```

## Performance Optimization

The configuration includes several optimizations:

- **Code Splitting**: Vendors separated into chunks for better caching
- **Terser Minification**: Production builds are minified
- **Long-lived Cache**: Assets have 1-year cache headers
- **HTML Cache Busting**: HTML files are not cached

## Redeployment

To trigger a new deployment:

1. Make changes and push to `main` branch
2. Vercel automatically builds and deploys
3. View deployment status in Vercel dashboard

## Custom Domain

To add a custom domain:

1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate issuance

## Logs and Monitoring

- **Build Logs**: Available in Vercel dashboard under "Deployments"
- **Production Logs**: Check in Vercel Analytics or your monitoring service
- **Runtime Errors**: Check browser console and Sentry (if configured)

## Support

For issues with Vercel deployment:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Check GitHub issues or contact support

---

**Last Updated**: 2026-08-29
