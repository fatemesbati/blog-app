/**
 * BlogPostCard Component
 * Displays a blog post preview card
 */

import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from '@mui/material';
import { BlogPost } from '../types';
import { formatDate } from '../utils/helpers';
import { generateExcerpt } from '../services/blogService';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    sessionStorage.setItem('blog_scroll_position', window.scrollY.toString());
    const currentUrl = `/?${searchParams.toString()}`;
    sessionStorage.setItem('blog_return_url', currentUrl);
    navigate(`/post/${post.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
        '&:active': {
          transform: 'translateY(-4px) scale(1.01)',
        },
      }}
    >
      <CardActionArea 
        onClick={handleClick} 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch',
          transition: 'all 0.3s ease',
        }}
      >
        {post.imgUrl ? (
          <CardMedia
            component="img"
            height="200"
            image={post.imgUrl}
            alt={post.title}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              background: 'linear-gradient(135deg, #bec0c8ff 0%, #8193b5ff 40%, #2d2d2d 70%, #0a0a0a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              position: 'relative',
              borderTop: '3px solid rgba(102, 102, 234, 0.4)',
              borderBottom: '1px solid rgba(232, 234, 102, 0.3)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
              '&:hover::before': {
                opacity: 1,
              },
            }}
          >
            {/* Date badge */}
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.7rem',
                fontWeight: 600,
                mb: 2,
                transition: 'all 0.3s ease',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {formatDate(post.createdAt)}
            </Typography>

            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                textAlign: 'center',
                lineHeight: 1.3,
                fontFamily: 'Georgia, serif',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                transition: 'all 0.3s ease',
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }}
            >
              {post.title}
            </Typography>

            {/* Decorative line */}
            <Box
              sx={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                mt: 2,
                transition: 'all 0.3s ease',
              }}
            />
          </Box>
        )}
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3.6em',
              fontWeight: 600,
              transition: 'color 0.3s ease',
            }}
          >
            {post.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {formatDate(post.createdAt)}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.primary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {generateExcerpt(post.content)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogPostCard;