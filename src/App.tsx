/**
 * Main App Component
 * Handles routing and app initialization
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { initializeStorage } from './services/blogService';
import theme from './theme';

// Pages
import BlogPostList from './pages/BlogPostList';
import BlogPostDetail from './pages/BlogPostDetail';
import NewBlogPost from './pages/NewBlogPost';
import EditBlogPost from './pages/EditBlogPost';

// Scroll restoration component
function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    // Save scroll position when leaving a page
    const saveScroll = () => {
      sessionStorage.setItem(
        `scroll-${location.pathname}${location.search}`,
        window.scrollY.toString()
      );
    };

    window.addEventListener('beforeunload', saveScroll);
    
    return () => {
      saveScroll();
      window.removeEventListener('beforeunload', saveScroll);
    };
  }, [location]);

  useEffect(() => {
    // Restore scroll position when returning to a page
    const scrollKey = `scroll-${location.pathname}${location.search}`;
    const savedScroll = sessionStorage.getItem(scrollKey);
    
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 100);
    } else {
      // Scroll to top for new pages
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  return null;
}

const App: React.FC = () => {
  useEffect(() => {
    // Initialize local storage with seed data on first load
    initializeStorage();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollRestoration />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header */}
          <AppBar position="static" elevation={2}>
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Typography
                  variant="h5"
                  component="a"
                  href="/"
                  sx={{
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  📝 My Blog
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default' }}>
            <Routes>
              <Route path="/" element={<BlogPostList />} />
              <Route path="/post/:id" element={<BlogPostDetail />} />
              <Route path="/new" element={<NewBlogPost />} />
              <Route path="/edit/:id" element={<EditBlogPost />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: 'grey.200',
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                © 2024 My Blog. Built with React, TypeScript, and Material-UI.
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;