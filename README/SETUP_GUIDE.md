# Setup Guide

Complete step-by-step guide to get the Blog App running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v16.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (usually comes with Node.js)
   - Verify installation: `npm --version`
   - Alternative: Use yarn if preferred

### Recommended Tools

- **Git**: For version control
- **VS Code**: Recommended IDE with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

## Installation Steps

### Step 1: Get the Code

If you have the repository URL:
```bash
git clone <repository-url>
cd blog-app
```

If you have the code as a zip file:
```bash
# Extract the zip file
cd blog-app
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React-DOM
- TypeScript
- Material-UI
- React Router
- React Quill
- Testing libraries

**Expected time:** 2-5 minutes depending on your internet speed

### Step 3: Verify Installation

Check that node_modules directory was created:
```bash
ls -la node_modules
```

### Step 4: Start Development Server

```bash
npm start
```

**What happens:**
- Compiles TypeScript
- Starts development server
- Opens browser automatically at http://localhost:3000
- Watches for file changes

**Expected output:**
```
Compiled successfully!

You can now view blog-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Step 5: Verify Application

1. Browser should open automatically
2. You should see the blog post list page
3. Try these features:
   - Click on a blog post card
   - Use the search bar
   - Navigate between pages
   - Click "New Post" button

## Running Tests

### Run All Tests

```bash
npm test
```

**Interactive mode:**
- Press `a` to run all tests
- Press `q` to quit
- Press `w` to show more options

### Generate Coverage Report

```bash
npm run test:coverage
```

**Output location:** `coverage/lcov-report/index.html`

Open in browser to see detailed coverage:
```bash
# On macOS
open coverage/lcov-report/index.html

# On Linux
xdg-open coverage/lcov-report/index.html

# On Windows
start coverage/lcov-report/index.html
```

## Building for Production

### Create Production Build

```bash
npm run build
```

**What it does:**
- Optimizes code
- Minifies files
- Creates production bundle
- Outputs to `build/` directory

**Expected output:**
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  50.2 KB  build/static/js/main.abc123.js
  1.5 KB   build/static/css/main.def456.css
```

### Test Production Build Locally

Using serve:
```bash
npx serve -s build
```

## Troubleshooting

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution 1:** Kill the process using the port
```bash
# Find the process
lsof -i :3000

# Kill it
kill -9 <PID>
```

**Solution 2:** Use a different port
```bash
PORT=3001 npm start
```

### Module Not Found

**Error:** "Cannot find module 'react' or its corresponding type declarations"

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript Errors

**Error:** Various TypeScript compilation errors

**Solution 1:** Check TypeScript version
```bash
npx tsc --version
```

**Solution 2:** Clean and rebuild
```bash
rm -rf node_modules build
npm install
npm start
```

### localStorage Issues

**Error:** Data not persisting or loading

**Solution:**
1. Open Browser DevTools
2. Go to Application tab
3. Clear localStorage
4. Refresh the page
5. Check Console for errors

### React Quill Warnings

**Warning:** "Attempted import error..."

**Solution:** This is usually harmless but can be fixed by:
```bash
npm install quill@latest react-quill@latest
```

## Development Tips

### Hot Reloading

The development server supports hot reloading:
- Save any file
- Browser automatically refreshes
- State is preserved when possible

### Browser DevTools

Recommended extensions:
- **React Developer Tools**: Inspect component tree
- **Redux DevTools**: (Not used but helpful for debugging)

### Debugging

**Console Logs:**
Add debugging statements:
```typescript
console.log('Debug:', variable);
```

**React DevTools:**
1. Open DevTools
2. Click React tab
3. Inspect component props/state

**Breakpoints:**
1. Open Sources tab in DevTools
2. Find your source file
3. Click line number to add breakpoint

## Environment Variables

### Creating .env File

Create `.env` in project root:
```
REACT_APP_API_URL=http://localhost:3000/api
```

### Using Environment Variables

```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

**Note:** Must start with `REACT_APP_`

## IDE Setup

### VS Code Configuration

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Recommended Extensions

Install these VS Code extensions:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
```

## Git Setup

### Initialize Repository

If starting fresh:
```bash
git init
git add .
git commit -m "Initial commit"
```

### Add Collaborators

As per requirements:
```bash
# On GitHub, go to Settings > Collaborators
# Add: VladimirLi and mferno
```

## Common Tasks

### Add a New Component

```bash
# Create component file
touch src/components/MyComponent.tsx

# Create test file
touch src/__tests__/MyComponent.test.tsx
```

### Add a New Page

```bash
# Create page file
touch src/pages/MyPage.tsx

# Add route in App.tsx
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install package-name@latest
```

## Performance Monitoring

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Click "Generate report"
4. Review performance metrics

### React Profiler

```typescript
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={callback}>
  <MyComponent />
</Profiler>
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy build folder via Netlify dashboard
```

### Deploy to GitHub Pages

```bash
# Add to package.json
"homepage": "https://username.github.io/blog-app"

# Install gh-pages
npm install --save-dev gh-pages

# Add scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## Data Management

### Reset Data

To reset to original seed data:
1. Open Browser DevTools
2. Go to Application tab
3. Expand Local Storage
4. Delete `blog_posts` key
5. Refresh page

### Export Data

```javascript
// In browser console
const data = localStorage.getItem('blog_posts');
console.log(data);
// Copy and save to file
```

### Import Data

```javascript
// In browser console
const data = '[...]'; // Your JSON data
localStorage.setItem('blog_posts', data);
location.reload();
```

## Getting Help

### Resources

- **React Docs**: https://react.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Material-UI Docs**: https://mui.com/material-ui/
- **React Router Docs**: https://reactrouter.com/

### Common Issues

Check IMPLEMENTATION_NOTES.md for:
- Architecture decisions
- Design patterns
- Best practices
- Troubleshooting tips

## Next Steps

After successful setup:

1. **Explore the code**: Start with `src/App.tsx`
2. **Read documentation**: Check README.md and IMPLEMENTATION_NOTES.md
3. **Run tests**: Ensure everything passes
4. **Make changes**: Try adding a feature
5. **Review PRs**: Follow best practices for code review

## Success Checklist

- [ ] Node.js and npm installed
- [ ] Dependencies installed successfully
- [ ] Development server running
- [ ] Application opens in browser
- [ ] Can view blog posts
- [ ] Can create new post
- [ ] Can edit existing post
- [ ] Can delete post
- [ ] Search functionality works
- [ ] Pagination works
- [ ] All tests pass
- [ ] Production build successful

## Support

If you encounter issues:
1. Check this guide first
2. Review error messages carefully
3. Search for similar issues online
4. Check package documentation
5. Ask for help with specific error messages

Happy coding! 🚀
