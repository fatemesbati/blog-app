/**
 * EditBlogPost Page
 * Form for editing an existing blog post
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Fade,
  Slide,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPostById, updatePost } from '../services/blogService';
import { BlogPost, BlogPostFormData } from '../types';
import BlogPostForm from '../components/BlogPostForm';

const EditBlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const postId = parseInt(id, 10);
      const foundPost = getPostById(postId);
      
      if (foundPost) {
        setPost(foundPost);
        setError(null);
      } else {
        setError('Post not found');
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (formData: BlogPostFormData) => {
    if (post) {
      const updatedPost = updatePost(post.id, formData);
      if (updatedPost) {
        navigate(`/post/${post.id}`, { replace: true });
      } else {
        setError('Failed to update post');
      }
    }
  };

  const handleCancel = () => {
    if (post) {
      navigate(`/post/${post.id}`);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (post) {
      navigate(`/post/${post.id}`);
    } else {
      const returnUrl = sessionStorage.getItem('blog_return_url') || '/';
      navigate(returnUrl);
    }
  };

  if (loading) {
    return (
      <Fade in={true} timeout={400}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Fade>
    );
  }

  if (error || !post) {
    return (
      <Fade in={true} timeout={600}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Post not found'}
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Posts
          </Button>
        </Container>
      </Fade>
    );
  }

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
            Back to Post
          </Button>
        </Slide>

        {/* Page Title */}
        <Slide direction="down" in={true} timeout={700}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight="bold">
              Edit Post
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Update your blog post
            </Typography>
          </Box>
        </Slide>

        {/* Form */}
        <Fade in={true} timeout={900}>
          <Box>
            <BlogPostForm
              initialData={post}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText="Update Post"
            />
          </Box>
        </Fade>
      </Container>
    </Fade>
  );
};

export default EditBlogPost;