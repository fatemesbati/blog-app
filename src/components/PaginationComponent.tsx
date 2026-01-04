/**
 * PaginationComponent
 * Handles page navigation for blog post list
 */

import React from 'react';
import { Pagination, Box, Typography } from '@mui/material';
import { PaginationInfo } from '../types';

interface PaginationComponentProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pagination,
  onPageChange,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (pagination.totalPages <= 1) {
    return null;
  }

  const startIndex = (pagination.currentPage - 1) * pagination.postsPerPage + 1;
  const endIndex = Math.min(
    pagination.currentPage * pagination.postsPerPage,
    pagination.totalPosts
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 4,
        mb: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startIndex}-{endIndex} of {pagination.totalPosts} posts
      </Typography>
      
      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default PaginationComponent;