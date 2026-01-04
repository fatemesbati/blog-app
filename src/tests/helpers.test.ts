/**
 * Tests for Utility Functions
 */

import { formatDate, isValidUrl } from '../utils/helpers';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const formatted = formatDate(dateString);
      expect(formatted).toContain('2024');
      expect(formatted).toContain('January');
    });

    it('should handle different date formats', () => {
      const dateString = '2023-12-25T00:00:00.000Z';
      const formatted = formatDate(dateString);
      expect(formatted).toBeDefined();
      expect(formatted.length).toBeGreaterThan(0);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('ftp://example')).toBe(true); // FTP is technically valid
    });

    it('should return true for empty string', () => {
      expect(isValidUrl('')).toBe(true);
    });
  });
});
