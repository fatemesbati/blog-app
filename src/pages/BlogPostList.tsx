/**
 * BlogPostList Page
 * Displays paginated list of blog posts with search functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Fade,
  Grow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getPaginatedPosts } from '../services/blogService';
import { BlogPost, PaginationInfo } from '../types';
import BlogPostCard from '../components/BlogPostCard';
import SearchBar from '../components/SearchBar';
import PaginationComponent from '../components/PaginationComponent';

const BlogPostList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    postsPerPage: 9,
    totalPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Get current page and search from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  // Load posts whenever page or search changes
  useEffect(() => {
    setLoading(true);
    setShowContent(false);
    const response = getPaginatedPosts(currentPage, searchQuery);
    setPosts(response.posts);
    setPagination(response.pagination);
    setLoading(false);
    
    // Trigger animation
    setTimeout(() => setShowContent(true), 50);
  }, [currentPage, searchQuery]);

  // Restore scroll position with smooth animation
  useEffect(() => {
    if (!loading) {
      const savedScroll = sessionStorage.getItem('blog_scroll_position');
      if (savedScroll) {
        const targetPosition = parseInt(savedScroll, 10);
        
        // Smooth scroll animation
        const duration = 800; // ms
        const start = window.scrollY;
        const distance = targetPosition - start;
        const startTime = performance.now();

        const easeInOutCubic = (t: number): number => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = easeInOutCubic(progress);
          
          window.scrollTo(0, start + distance * ease);
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            sessionStorage.removeItem('blog_scroll_position');
          }
        };

        requestAnimationFrame(animateScroll);
      }
    }
  }, [loading]);

  const handleSearch = useCallback((query: string) => {
    sessionStorage.removeItem('blog_scroll_position');
    const newParams = new URLSearchParams();
    newParams.set('page', '1');
    if (query.trim()) {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setSearchParams]);

  const handlePageChange = (page: number) => {
    sessionStorage.removeItem('blog_scroll_position');
    const newParams = new URLSearchParams();
    newParams.set('page', page.toString());
    if (searchQuery) {
      newParams.set('search', searchQuery);
    }
    setSearchParams(newParams);
  };

  return (
    <Fade in={true} timeout={600}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="h3" component="h1" fontWeight="bold">
              Blog Posts
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                sessionStorage.removeItem('blog_scroll_position');
                navigate('/new');
              }}
              size="large"
            >
              New Post
            </Button>
          </Box>
        </Fade>

        {/* Search Bar */}
        <Fade in={true} timeout={1000}>
          <Box>
            <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          </Box>
        </Fade>

        {/* Loading State */}
        {loading ? (
          <Fade in={true} timeout={400}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          </Fade>
        ) : posts.length === 0 ? (
          /* No Results */
          <Fade in={true} timeout={600}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary">
                {searchQuery
                  ? `No posts found for "${searchQuery}"`
                  : 'No posts available'}
              </Typography>
              {searchQuery && (
                <Button
                  variant="outlined"
                  onClick={() => handleSearch('')}
                  sx={{ mt: 2 }}
                >
                  Clear Search
                </Button>
              )}
            </Box>
          </Fade>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <Grid container spacing={3}>
              {posts.map((post, index) => (
                <Grow
                  key={post.id}
                  in={showContent}
                  timeout={400 + index * 100}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <BlogPostCard post={post} />
                  </Grid>
                </Grow>
              ))}
            </Grid>

            {/* Pagination */}
            <Fade in={showContent} timeout={1200}>
              <Box>
                <PaginationComponent
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </Box>
            </Fade>
          </>
        )}
      </Container>
    </Fade>
  );
};

export default BlogPostList;