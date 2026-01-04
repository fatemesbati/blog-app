# Blog App

A feature-rich blog application built with React, TypeScript, and Material-UI. This application provides a complete blogging experience with CRUD operations, pagination, search functionality, and a WYSIWYG editor.

## 🚀 Features

### Core Features
- ✅ **Blog Post List**: Paginated display of blog posts with titles, excerpts, and images
- ✅ **Blog Post Detail**: Full post view with edit and delete functionality
- ✅ **Create Post**: Form-based post creation with validation
- ✅ **Edit Post**: Modify existing posts with pre-populated data
- ✅ **Delete Post**: Remove posts with confirmation dialog

### Bonus Features
- ✨ **Search Functionality**: Real-time search filtering by title with debouncing
- ✨ **WYSIWYG Editor**: Rich text editing with React Quill
- ✨ **Responsive Design**: Mobile-first design that works on all devices
- ✨ **Local Storage Persistence**: All data persists across sessions
- ✨ **URL State Management**: Search and pagination state in URL
- ✨ **Loading States**: Smooth loading indicators
- ✨ **Error Handling**: Graceful error messages and validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone or download the repository**

2. **Navigate to the project directory**
```bash
cd blog-app
```

3. **Install dependencies**
```bash
npm install
```

4. **Start the development server**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

### `npm start`
Runs the app in development mode.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run test:coverage`
Runs tests and generates coverage report.

### `npm run build`
Builds the app for production to the `build` folder.

## 🏗️ Project Structure

```
blog-app/
├── public/
│   └── index.html
├── src/
│   ├── __tests__/           # Test files
│   │   ├── blogService.test.ts
│   │   ├── components.test.tsx
│   │   └── helpers.test.ts
│   ├── components/          # Reusable components
│   │   ├── BlogPostCard.tsx
│   │   ├── BlogPostForm.tsx
│   │   ├── PaginationComponent.tsx
│   │   └── SearchBar.tsx
│   ├── data/                # Seed data
│   │   └── blog-app-seed.json
│   ├── pages/               # Page components
│   │   ├── BlogPostList.tsx
│   │   ├── BlogPostDetail.tsx
│   │   ├── NewBlogPost.tsx
│   │   └── EditBlogPost.tsx
│   ├── services/            # Business logic
│   │   └── blogService.ts
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── utils/               # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # Entry point
│   ├── theme.ts             # Material-UI theme
│   ├── index.css            # Global styles
│   └── setupTests.ts        # Test configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design Decisions

### Technology Stack

1. **React 18**: Latest version with improved performance and features
2. **TypeScript**: Type safety and better developer experience
3. **Material-UI v5**: Modern, accessible component library
4. **React Router v6**: Client-side routing
5. **React Quill**: WYSIWYG editor for rich content
6. **Jest & React Testing Library**: Comprehensive testing

### Architecture

1. **Component-Based Structure**: Modular, reusable components
2. **Service Layer**: Business logic separated from UI
3. **Type Safety**: Strong typing throughout the application
4. **Local Storage**: Simple, effective data persistence
5. **URL State Management**: Shareable URLs with query parameters

### Key Implementation Details

#### 1. Local Storage Service (`blogService.ts`)
- Handles all CRUD operations
- Initializes with seed data on first load
- Generates unique IDs for new posts
- Supports pagination and search filtering
- Includes excerpt generation

#### 2. Pagination
- 9 posts per page for optimal viewing
- URL-based page state
- Shows current range and total posts
- Smooth scrolling on page change

#### 3. Search Functionality
- Real-time filtering by title
- 300ms debounce to prevent excessive updates
- URL parameter preservation
- Resets to page 1 on new search

#### 4. WYSIWYG Editor
- React Quill integration
- Rich text formatting options
- HTML content storage
- Safe rendering with sanitization

#### 5. Form Validation
- Required field validation
- URL format validation
- Real-time error feedback
- Touched field tracking

#### 6. Responsive Design
- Mobile-first approach
- Grid layout with breakpoints
- Flexible card design
- Touch-friendly interactions

## 🧪 Testing

The application includes comprehensive tests covering:

### Service Tests (`blogService.test.ts`)
- Local storage initialization
- CRUD operations
- Pagination logic
- Search filtering
- Excerpt generation

### Component Tests (`components.test.tsx`)
- BlogPostCard rendering
- Navigation functionality
- SearchBar with debouncing
- User interactions

### Utility Tests (`helpers.test.ts`)
- Date formatting
- URL validation

**Run tests:**
```bash
npm test
```

**Generate coverage report:**
```bash
npm run test:coverage
```

## 📱 Pages and Routes

### 1. Blog Post List (`/`)
- Displays paginated posts
- Search bar for filtering
- Grid layout (3 columns on desktop)
- "New Post" button

### 2. Blog Post Detail (`/post/:id`)
- Full post content with HTML rendering
- Post metadata (date)
- Edit and delete buttons
- Back navigation

### 3. New Blog Post (`/new`)
- Form with validation
- WYSIWYG content editor
- Image URL input
- Cancel and submit actions

### 4. Edit Blog Post (`/edit/:id`)
- Pre-populated form
- Same validation as new post
- Updates existing post
- Back navigation

## 🎯 Features in Detail

### Search Functionality
- Searches post titles (case-insensitive)
- Debounced for performance (300ms)
- URL parameter persistence
- Clear search option
- Results count display

### WYSIWYG Editor
- Headings (H1, H2, H3)
- Text formatting (bold, italic, underline, strike)
- Lists (ordered, unordered)
- Links
- Text alignment
- Indentation

### Responsive Design Breakpoints
- Mobile: < 600px (1 column)
- Tablet: 600-960px (2 columns)
- Desktop: > 960px (3 columns)

## 🔒 Data Persistence

All data is stored in browser's localStorage:
- Key: `blog_posts`
- Format: JSON array of blog posts
- Initialized with seed data (200 posts)
- Persists across browser sessions
- Can be cleared via browser dev tools

## 🎨 Styling Approach

1. **Material-UI Theme**: Custom theme with primary colors
2. **Responsive Grid**: Breakpoint-based layouts
3. **Card Components**: Consistent post presentation
4. **Hover Effects**: Visual feedback on interactions
5. **Loading States**: Skeleton screens and spinners
6. **Error States**: Alert components for feedback

## 🚀 Performance Optimizations

1. **Lazy Loading**: Code splitting by route
2. **Debouncing**: Search input optimization
3. **Pagination**: Limited posts per page
4. **Memoization**: Callbacks with useCallback
5. **Efficient Re-renders**: Proper dependency arrays

## 🔮 Future Enhancements

Potential improvements for future iterations:

1. **Backend Integration**: Replace localStorage with API
2. **Authentication**: User accounts and permissions
3. **Comments**: Discussion on blog posts
4. **Categories/Tags**: Better organization
5. **Image Upload**: Direct file upload instead of URLs
6. **Draft System**: Save unpublished posts
7. **Social Sharing**: Share posts on social media
8. **Analytics**: Track post views and engagement
9. **SEO Optimization**: Meta tags and structured data
10. **Markdown Support**: Alternative to WYSIWYG

## 📝 Implementation Notes

### Why Material-UI?
- Recommended in the requirements
- Comprehensive component library
- Excellent TypeScript support
- Strong accessibility features
- Active community and maintenance

### Why React Quill?
- Easy integration with React
- Rich formatting options
- Customizable toolbar
- HTML output for storage
- Good documentation

### Why Local Storage?
- No backend setup required
- Simple implementation
- Meets project requirements
- Sufficient for demonstration
- Easy to migrate to backend

### Code Quality Practices
- TypeScript for type safety
- ESLint configuration
- Consistent naming conventions
- Component documentation
- Comprehensive error handling
- Input validation
- Loading and error states

## 🐛 Known Limitations

1. **Local Storage Size**: Limited to ~5-10MB
2. **No Image Hosting**: Uses external URLs only
3. **Single User**: No multi-user support
4. **No Versioning**: Can't restore deleted posts
5. **Browser-Specific**: Data doesn't sync across devices

## 📄 License

This project is created for demonstration purposes.

## 👥 Contributors

Built as part of a front-end development challenge.

---

**Note**: This application uses browser localStorage for data persistence. Your posts will be saved locally and persist across browser sessions, but clearing browser data will remove all posts.
