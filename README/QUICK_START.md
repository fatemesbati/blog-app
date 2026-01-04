# Quick Start Guide

Get the Blog App running in under 5 minutes!

## Prerequisites

✅ Node.js (v16 or higher)  
✅ npm (comes with Node.js)

## Installation (2 minutes)

```bash
# 1. Navigate to project directory
cd blog-app

# 2. Install dependencies
npm install

# 3. Start the app
npm start
```

That's it! The app will open at http://localhost:3000

## First Run

When you first start the app:

1. **Blog List**: You'll see 200 pre-loaded blog posts
2. **Try Search**: Type "hospital" in the search bar
3. **Click a Post**: View the full content
4. **Create New**: Click "New Post" button
5. **Edit/Delete**: Try editing or deleting a post

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm test` | Run tests |
| `npm run build` | Build for production |

## Troubleshooting

### Port in use?
```bash
PORT=3001 npm start
```

### Modules not found?
```bash
rm -rf node_modules
npm install
```

### Need help?
Check **SETUP_GUIDE.md** for detailed instructions

## Key Files to Explore

```
src/
├── App.tsx              # Main app component
├── pages/
│   └── BlogPostList.tsx # Homepage
├── components/
│   └── BlogPostCard.tsx # Post card component
└── services/
    └── blogService.ts   # Data operations
```

## Next Steps

1. ✅ Read **README.md** for overview
2. ✅ Check **FEATURES.md** for feature details
3. ✅ Review **IMPLEMENTATION_NOTES.md** for technical info
4. ✅ Explore **PACKAGES.md** to understand dependencies

## Quick Test

```bash
# Run tests to verify everything works
npm test -- --watchAll=false
```

All tests should pass! ✅

## Demo Features

Try these in order:

1. **Search**: Type "hospital" → See filtered results
2. **Pagination**: Click page 2 → See next posts
3. **View Post**: Click any card → Read full post
4. **Create Post**: 
   - Click "New Post"
   - Fill in title: "My Test Post"
   - Add content with formatting
   - Click "Create Post"
5. **Edit**: Click "Edit Post" → Make changes
6. **Delete**: Click "Delete Post" → Confirm deletion

## Data Persistence

All your posts are saved in browser localStorage:
- Create, edit, and delete posts
- Data persists across browser sessions
- Reset by clearing localStorage in DevTools

## Need More Help?

📖 **Full Documentation**: See all .md files in project root  
🐛 **Issues**: Check SETUP_GUIDE.md troubleshooting section  
💡 **Features**: Read FEATURES.md for detailed feature docs  

---

**Happy Blogging! 📝**
