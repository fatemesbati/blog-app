/**
 * NewBlogPost Page
 * Form for creating a new blog post
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Fade, Slide } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createPost } from '../services/blogService';
import { BlogPostFormData } from '../types';
import BlogPostForm from '../components/BlogPostForm';

const NewBlogPost: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData: BlogPostFormData) => {
    const newPost = createPost(formData);
    // Clear saved data when creating new post
    sessionStorage.removeItem('blog_scroll_position');
    sessionStorage.removeItem('blog_return_url');
    navigate(`/post/${newPost.id}`, { replace: true });
  };

  const handleCancel = () => {
    // Get saved URL or default to homepage
    const returnUrl = sessionStorage.getItem('blog_return_url') || '/';
    navigate(returnUrl);
  };

  const handleBack = () => {
    // Get saved URL or default to homepage
    const returnUrl = sessionStorage.getItem('blog_return_url') || '/';
    navigate(returnUrl);
  };

  return (
    <Fade in={true} timeout={600}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Back Button */}
        <Slide direction="right" in={true} timeout={500}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mb: 3 }}
          >
            Back to Posts
          </Button>
        </Slide>

        {/* Page Title */}
        <Slide direction="down" in={true} timeout={700}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight="bold">
              Create New Post
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Share your thoughts with the world
            </Typography>
          </Box>
        </Slide>

        {/* Form */}
        <Fade in={true} timeout={900}>
          <Box>
            <BlogPostForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText="Create Post"
            />
          </Box>
        </Fade>
      </Container>
    </Fade>
  );
};

export default NewBlogPost;