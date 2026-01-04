/**
 * BlogPostForm Component
 * Reusable form for creating and editing blog posts
 * Includes WYSIWYG editor for content
 */

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BlogPost, BlogPostFormData } from '../types';
import { isValidUrl } from '../utils/helpers';

interface BlogPostFormProps {
  initialData?: BlogPost | null;
  onSubmit: (data: BlogPostFormData) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = 'Submit',
}) => {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    imgUrl: initialData?.imgUrl || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
  ];

  // Validate form
  useEffect(() => {
    const newErrors: { [key: string]: string } = {};

    if (touched.title && !formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (touched.content && !formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (touched.imgUrl && formData.imgUrl && !isValidUrl(formData.imgUrl)) {
      newErrors.imgUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      title: true,
      content: true,
      imgUrl: true,
    });

    // Validate all fields
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData.imgUrl && !isValidUrl(formData.imgUrl)) {
      newErrors.imgUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            required
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onBlur={() => setTouched({ ...touched, title: true })}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
            variant="outlined"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Content <span style={{ color: 'red' }}>*</span>
          </Typography>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            onBlur={() => setTouched({ ...touched, content: true })}
            modules={modules}
            formats={formats}
            style={{
              height: '300px',
              marginBottom: '50px',
            }}
          />
          {touched.content && errors.content && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {errors.content}
            </Alert>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Image URL (optional)"
            value={formData.imgUrl}
            onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
            onBlur={() => setTouched({ ...touched, imgUrl: true })}
            error={touched.imgUrl && !!errors.imgUrl}
            helperText={touched.imgUrl && errors.imgUrl}
            variant="outlined"
            placeholder="https://example.com/image.jpg"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={onCancel}
            size="large"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            size="large"
          >
            {submitButtonText}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default BlogPostForm;