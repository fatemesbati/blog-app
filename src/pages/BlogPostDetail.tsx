/**
 * BlogPostDetail Page
 * Displays full blog post with edit and delete functionality
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Fade,
  Slide,
  Zoom,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPostById, deletePost } from '../services/blogService';
import { BlogPost } from '../types';
import { formatDate } from '../utils/helpers';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

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
      setTimeout(() => setShowContent(true), 100);
    }
  }, [id]);

  const handleDelete = () => {
    if (post) {
      const success = deletePost(post.id);
      if (success) {
        // Clear saved data when deleting
        sessionStorage.removeItem('blog_scroll_position');
        sessionStorage.removeItem('blog_return_url');
        navigate('/', { replace: true });
      } else {
        setError('Failed to delete post');
        setDeleteDialogOpen(false);
      }
    }
  };

  const handleBack = () => {
    // Get saved URL or default to homepage
    const returnUrl = sessionStorage.getItem('blog_return_url') || '/';
    navigate(returnUrl);
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
        <Slide direction="right" in={showContent} timeout={500}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mb: 3 }}
          >
            Back to Posts
          </Button>
        </Slide>

        <Zoom in={showContent} timeout={600}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4,
              animation: 'fadeInUp 0.6s ease-out',
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {/* Featured Image */}
            {post.imgUrl && (
              <Fade in={showContent} timeout={800}>
                <Box
                  component="img"
                  src={post.imgUrl}
                  alt={post.title}
                  sx={{
                    width: '100%',
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 3,
                  }}
                />
              </Fade>
            )}

            {/* Title */}
            <Slide direction="up" in={showContent} timeout={700}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                {post.title}
              </Typography>
            </Slide>

            {/* Metadata */}
            <Fade in={showContent} timeout={900}>
              <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={formatDate(post.createdAt)} color="primary" variant="outlined" />
              </Box>
            </Fade>

            {/* Content */}
            <Fade in={showContent} timeout={1000}>
              <Box
                sx={{
                  mb: 4,
                  '& p': { mb: 2 },
                  '& h1, & h2, & h3': { mt: 3, mb: 2, fontWeight: 'bold' },
                  '& ul, & ol': { mb: 2, pl: 3 },
                  '& a': { color: 'primary.main', textDecoration: 'underline' },
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Fade>

            {/* Action Buttons */}
            <Slide direction="up" in={showContent} timeout={1100}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  pt: 3,
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/edit/${post.id}`)}
                  size="large"
                >
                  Edit Post
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteDialogOpen(true)}
                  size="large"
                >
                  Delete Post
                </Button>
              </Box>
            </Slide>
          </Paper>
        </Zoom>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          TransitionComponent={Zoom}
        >
          <DialogTitle>Delete Post?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete "{post.title}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fade>
  );
};

export default BlogPostDetail;