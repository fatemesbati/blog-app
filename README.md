# Blog App

A React + TypeScript implementation of the **Blog App** challenge, built according to the requirements defined in the Arkus-AI front-end assignment.

🔗 **Live Demo**  
https://fatemesbati.github.io/blog-app/#/

> The application can be accessed directly in the browser on desktop or mobile devices without any local setup.

---

## 📌 Challenge Overview

This project was implemented as part of the **Front-End Challenge** provided by Arkus-AI.

The goal of the challenge was to build a basic blog application using **React** and **TypeScript** with the following pages:
- Blog post list
- Blog post detail
- Create new blog post
- Edit existing blog post

The application uses **localStorage** as a persistence layer and is initialized with provided seed data.

---

## ✅ Implemented Requirements

### Blog Post List Page
- Paginated list of blog posts
- Displays title, excerpt, and image
- Clickable items leading to the detail page
- Bonus: search posts by title

### Blog Post Detail Page
- Displays title, content, image, and creation date
- Edit post button
- Delete post button

### New Blog Post Page
- Form with required title and content fields
- Optional image URL
- Redirects to detail page on success
- Bonus: WYSIWYG editor for content

### Edit Blog Post Page
- Pre-filled form with existing post data
- Updates the post and redirects to detail page

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Material UI**
- **React Router**
- **React Quill (WYSIWYG Editor)**
- **localStorage** for persistence

---

## 🧩 Data & API

- Uses browser **localStorage** as the data layer
- Initialized with seed data from `blog-app-seed.json`
- Supports full **CRUD operations**
- Data persists across browser sessions

---

## 🧠 Design & Implementation Notes

- **Material UI** was chosen for fast, accessible, and consistent UI development
- Business logic is isolated in a service layer
- Strong typing is enforced across components and services
- Forms include basic validation and error handling
- Search input is debounced for better performance
- Pagination and search state are reflected in the URL

---

## 🧱 Project Structure

```

src/
├── components/        # Reusable UI components
├── pages/             # Page-level components
├── services/          # Local storage CRUD logic
├── types/             # TypeScript definitions
├── data/              # Seed data
├── App.tsx            # Routing
└── index.tsx          # Entry point

````

The project is organized to keep UI, logic, and types clearly separated.

---

## ▶️ Local Setup

```bash
npm install
npm start
````

The application will be available at:

```
http://localhost:3000
```

---

## 🧪 Testing

* Unit and integration tests implemented using:

  * Jest
  * React Testing Library
* Focus on core logic and user interactions

---

## 👤 Author

**Fateme Esbati**
Front-End / Software Engineer
Background in Computer Engineering
Interested in clean architecture, UX, and scalable front-end systems

---

## 📄 License

This project was created for demonstration and evaluation purposes.
