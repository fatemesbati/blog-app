/**
 * Local Storage Service for Blog Posts
 * Handles all CRUD operations and data persistence
 */

import { BlogPost, BlogPostFormData, BlogPostsResponse } from '../types';
import seedData from '../data/blog-app-seed.json';

const STORAGE_KEY = 'blog_posts';
const POSTS_PER_PAGE = 9;

/**
 * Initialize local storage with seed data if empty
 */
export const initializeStorage = (): void => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  }
};

/**
 * Get all blog posts from local storage
 */
export const getAllPosts = (): BlogPost[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Get paginated blog posts with optional search
 */
export const getPaginatedPosts = (
  page: number = 1,
  searchQuery: string = ''
): BlogPostsResponse => {
  let posts = getAllPosts();

  // Filter by search query if provided
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    posts = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }

  // Sort by creation date (newest first)
  posts.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Calculate pagination
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages,
      postsPerPage: POSTS_PER_PAGE,
      totalPosts,
    },
  };
};

/**
 * Get a single blog post by ID
 */
export const getPostById = (id: number): BlogPost | null => {
  const posts = getAllPosts();
  return posts.find((post) => post.id === id) || null;
};

/**
 * Create a new blog post
 */
export const createPost = (formData: BlogPostFormData): BlogPost => {
  const posts = getAllPosts();
  
  // Generate new ID
  const maxId = posts.length > 0 
    ? Math.max(...posts.map((p) => p.id))
    : 0;
  
  const newPost: BlogPost = {
    id: maxId + 1,
    title: formData.title,
    content: formData.content,
    imgUrl: formData.imgUrl || null,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  
  return newPost;
};

/**
 * Update an existing blog post
 */
export const updatePost = (
  id: number,
  formData: BlogPostFormData
): BlogPost | null => {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return null;
  }

  const updatedPost: BlogPost = {
    ...posts[index],
    title: formData.title,
    content: formData.content,
    imgUrl: formData.imgUrl || null,
  };

  posts[index] = updatedPost;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  
  return updatedPost;
};

/**
 * Delete a blog post by ID
 */
export const deletePost = (id: number): boolean => {
  const posts = getAllPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) {
    return false; // Post not found
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
  return true;
};

/**
 * Generate an excerpt from content
 */
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const text = content.replace(/<[^>]*>/g, '').replace(/\n\n/g, ' ');
  
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
};