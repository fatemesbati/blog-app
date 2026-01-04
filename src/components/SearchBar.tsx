/**
 * SearchBar Component
 * Provides search functionality for blog posts
 */

import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const isFirstRender = useRef(true);
  const lastSearchRef = useRef(initialValue);

  useEffect(() => {
    // Update local state when URL changes (e.g., clear search)
    if (initialValue !== lastSearchRef.current) {
      setSearchQuery(initialValue);
      lastSearchRef.current = initialValue;
    }
  }, [initialValue]);

  useEffect(() => {
    // Don't trigger on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Only trigger if search query actually changed
    if (searchQuery === lastSearchRef.current) {
      return;
    }

    // Debounce search
    const timer = setTimeout(() => {
      lastSearchRef.current = searchQuery;
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]); // Remove onSearch from dependencies!

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search blog posts by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;