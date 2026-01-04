/**
 * Tests for Blog Service
 */

import {
  initializeStorage,
  getAllPosts,
  getPaginatedPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  generateExcerpt,
} from '../services/blogService';
import { BlogPostFormData } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Blog Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('initializeStorage', () => {
    it('should initialize storage with seed data if empty', () => {
      initializeStorage();
      const posts = getAllPosts();
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should not overwrite existing data', () => {
      const testData = [
        {
          id: 999,
          title: 'Test Post',
          content: 'Test Content',
          createdAt: new Date().toISOString(),
          imgUrl: null,
        },
      ];
      localStorage.setItem('blog_posts', JSON.stringify(testData));
      
      initializeStorage();
      const posts = getAllPosts();
      expect(posts.length).toBe(1);
      expect(posts[0].id).toBe(999);
    });
  });

  describe('getPaginatedPosts', () => {
    beforeEach(() => {
      initializeStorage();
    });

    it('should return paginated posts', () => {
      const result = getPaginatedPosts(1);
      expect(result.posts).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.pagination.currentPage).toBe(1);
      expect(result.posts.length).toBeLessThanOrEqual(9);
    });

    it('should filter posts by search query', () => {
      const result = getPaginatedPosts(1, 'Hospital');
      expect(result.posts.length).toBeGreaterThan(0);
      result.posts.forEach((post) => {
        expect(post.title.toLowerCase()).toContain('hospital');
      });
    });

    it('should return correct pagination info', () => {
      const result = getPaginatedPosts(1);
      expect(result.pagination.postsPerPage).toBe(9);
      expect(result.pagination.totalPages).toBeGreaterThan(0);
      expect(result.pagination.totalPosts).toBeGreaterThan(0);
    });
  });

  describe('getPostById', () => {
    beforeEach(() => {
      initializeStorage();
    });

    it('should return post by id', () => {
      const post = getPostById(1);
      expect(post).toBeDefined();
      expect(post?.id).toBe(1);
    });

    it('should return null for non-existent id', () => {
      const post = getPostById(99999);
      expect(post).toBeNull();
    });
  });

  describe('createPost', () => {
    beforeEach(() => {
      initializeStorage();
    });

    it('should create a new post', () => {
      const formData: BlogPostFormData = {
        title: 'New Test Post',
        content: 'This is test content',
        imgUrl: 'https://example.com/image.jpg',
      };

      const newPost = createPost(formData);
      expect(newPost.id).toBeDefined();
      expect(newPost.title).toBe(formData.title);
      expect(newPost.content).toBe(formData.content);
      expect(newPost.imgUrl).toBe(formData.imgUrl);
      expect(newPost.createdAt).toBeDefined();
    });

    it('should generate unique ids', () => {
      const formData1: BlogPostFormData = {
        title: 'Post 1',
        content: 'Content 1',
        imgUrl: '',
      };
      const formData2: BlogPostFormData = {
        title: 'Post 2',
        content: 'Content 2',
        imgUrl: '',
      };

      const post1 = createPost(formData1);
      const post2 = createPost(formData2);
      expect(post1.id).not.toBe(post2.id);
    });
  });

  describe('updatePost', () => {
    beforeEach(() => {
      initializeStorage();
    });

    it('should update an existing post', () => {
      const formData: BlogPostFormData = {
        title: 'Updated Title',
        content: 'Updated content',
        imgUrl: 'https://example.com/new-image.jpg',
      };

      const updatedPost = updatePost(1, formData);
      expect(updatedPost).toBeDefined();
      expect(updatedPost?.title).toBe(formData.title);
      expect(updatedPost?.content).toBe(formData.content);
      expect(updatedPost?.imgUrl).toBe(formData.imgUrl);
    });

    it('should return null for non-existent post', () => {
      const formData: BlogPostFormData = {
        title: 'Updated Title',
        content: 'Updated content',
        imgUrl: '',
      };

      const result = updatePost(99999, formData);
      expect(result).toBeNull();
    });
  });

  describe('deletePost', () => {
    beforeEach(() => {
      initializeStorage();
    });

    it('should delete an existing post', () => {
      const result = deletePost(1);
      expect(result).toBe(true);
      
      const deletedPost = getPostById(1);
      expect(deletedPost).toBeNull();
    });

    it('should return false for non-existent post', () => {
      const result = deletePost(99999);
      expect(result).toBe(false);
    });
  });

  describe('generateExcerpt', () => {
    it('should generate excerpt from content', () => {
      const content = 'This is a long piece of content that should be truncated.';
      const excerpt = generateExcerpt(content, 20);
      expect(excerpt.length).toBeLessThanOrEqual(24); // 20 + "..."
      expect(excerpt).toContain('...');
    });

    it('should not truncate short content', () => {
      const content = 'Short content';
      const excerpt = generateExcerpt(content, 100);
      expect(excerpt).toBe(content);
    });

    it('should strip HTML tags', () => {
      const content = '<p>This is <strong>bold</strong> text</p>';
      const excerpt = generateExcerpt(content);
      expect(excerpt).not.toContain('<p>');
      expect(excerpt).not.toContain('<strong>');
    });
  });
});
