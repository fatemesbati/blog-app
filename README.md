# Blog App

A modern, feature-rich blog application built with **React** and **TypeScript**.  
The app provides a complete blogging experience including CRUD operations, pagination, search, and rich text editing.

🔗 **Live Demo**  
https://fatemesbati.github.io/blog-app/#/

> The application can be viewed directly in the browser on desktop and mobile devices without any local setup.

---

## 🚀 Features

### Core Features
- ✅ **Paginated Blog Post List** – View blog posts with title, excerpt, and image
- ✅ **Blog Post Detail Page** – Full content view with metadata
- ✅ **Create New Post** – Form-based post creation with validation
- ✅ **Edit Post** – Update existing posts with pre-filled data
- ✅ **Delete Post** – Remove posts with confirmation

### Advanced / Bonus Features
- 🔍 **Search** – Real-time filtering by post title (debounced)
- ✍️ **WYSIWYG Editor** – Rich text editing using React Quill
- 💾 **Local Storage Persistence** – Data saved across browser sessions
- 🔗 **URL State Management** – Pagination and search state in URL
- ⚡ **Loading States** – Smooth transitions and spinners
- 🛡️ **Error Handling** – Graceful error messages and form validation
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop

---

## 🛠️ Technologies Used

- **React 18**
- **TypeScript**
- **Material UI (v5)**
- **React Router v6**
- **React Quill**

---

## 📋 Requirements Fulfilled

This project fulfills all requirements of the **Blog App** challenge:

- Blog post list with pagination
- Blog post detail page
- Create and edit blog post pages
- Delete functionality
- Responsive styling
- Bonus features: search and WYSIWYG editor
- CRUD operations using localStorage
- Initialization using provided seed data

---

## 📁 Project Structure

```

src/
├── components/        # Reusable UI components
├── pages/             # Blog pages (list, detail, create, edit)
├── services/          # Local storage CRUD logic
├── types/             # TypeScript type definitions
├── data/              # Seed data
├── App.tsx            # Application routing
└── index.tsx          # Entry point

````

---

## ▶️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
npm start
````

The application will be available at:

```
http://localhost:3000
```

---

## 🎯 Key Implementation Details

### Local Storage Data Layer

* All blog posts are stored in `localStorage`
* Seed data is loaded on first run
* Full CRUD support
* Pagination and search handled client-side

### WYSIWYG Editor

* Rich text formatting
* HTML content storage
* Safe rendering in detail view

### UX & State Management

* Debounced search input
* URL-based pagination state
* Responsive grid layout
* Form validation with immediate feedback

---

## 👤 Author

**Fateme Esbati**
Front-End / Software Engineer
Background in Computer Engineering
Interested in clean architecture, UX, and scalable front-end systems

---

## 📄 License

This project was created for demonstration and evaluation purposes.