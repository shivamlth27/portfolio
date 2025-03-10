# Deployment Guide for GitHub Pages

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Steps to Deploy

1. **Create a new GitHub repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click on the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "portfolio")
   - Choose "Public" visibility
   - Click "Create repository"

2. **Initialize Git in your project folder (if not already done)**
   ```bash
   git init
   ```

3. **Add your GitHub repository as a remote**
   ```bash
   git remote add origin https://github.com/yourusername/portfolio.git
   ```

4. **Add all files to Git**
   ```bash
   git add .
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Initial commit"
   ```

6. **Push to GitHub**
   ```bash
   git push -u origin main
   ```

7. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select "main" branch
   - Click "Save"

8. **Access your website**
   - Your website will be available at `https://yourusername.github.io/portfolio/`
   - It may take a few minutes for your site to be published

## Using a Custom Domain (Optional)

1. **Purchase a domain** from a domain registrar (e.g., Namecheap, GoDaddy)

2. **Configure DNS settings** at your domain registrar:
   - Add an A record pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a CNAME record pointing to `yourusername.github.io`

3. **Add your custom domain in GitHub**:
   - Go to your repository settings
   - In the GitHub Pages section, enter your custom domain
   - Click "Save"

4. **Wait for DNS propagation** (can take up to 48 hours)

## Troubleshooting

- If your site doesn't appear, check if the GitHub Pages source is set correctly
- Ensure your repository is public
- Check for any build errors in the GitHub Actions tab
- Make sure your index.html file is in the root directory

## Updating Your Website

To update your website after making changes:

```bash
git add .
git commit -m "Update website content"
git push
```

Your changes will be automatically deployed to GitHub Pages. 