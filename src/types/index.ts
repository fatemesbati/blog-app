/**
 * Type definitions for the Blog App
 */

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl: string | null;
}

export interface BlogPostFormData {
  title: string;
  content: string;
  imgUrl: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  totalPosts: number;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: PaginationInfo;
}