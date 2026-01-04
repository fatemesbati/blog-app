/**
 * Tests for React Components
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BlogPostCard from '../components/BlogPostCard';
import SearchBar from '../components/SearchBar';
import { BlogPost } from '../types';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BlogPostCard Component', () => {
  const mockPost: BlogPost = {
    id: 1,
    title: 'Test Blog Post',
    content: 'This is test content for the blog post.',
    createdAt: '2024-01-01T00:00:00.000Z',
    imgUrl: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render post information correctly', () => {
    render(
      <BrowserRouter>
        <BlogPostCard post={mockPost} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText(/This is test content/)).toBeInTheDocument();
  });

  it('should display image when imgUrl is provided', () => {
    render(
      <BrowserRouter>
        <BlogPostCard post={mockPost} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Test Blog Post');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPost.imgUrl);
  });

  it('should display placeholder when no image', () => {
    const postWithoutImage = { ...mockPost, imgUrl: null };
    render(
      <BrowserRouter>
        <BlogPostCard post={postWithoutImage} />
      </BrowserRouter>
    );

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('should navigate to post detail on click', () => {
    render(
      <BrowserRouter>
        <BlogPostCard post={mockPost} />
      </BrowserRouter>
    );

    const card = screen.getByText('Test Blog Post').closest('button');
    if (card) {
      fireEvent.click(card);
      expect(mockNavigate).toHaveBeenCalledWith('/post/1');
    }
  });
});

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText(/Search blog posts/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearch with debounce', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText(/Search blog posts/i);
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });
  });

  it('should display initial value', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="initial" />);
    
    const searchInput = screen.getByPlaceholderText(/Search blog posts/i) as HTMLInputElement;
    expect(searchInput.value).toBe('initial');
  });
});
