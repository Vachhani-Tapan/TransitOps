/**
 * Authentication Service for TransitOps (Active API Client)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authService = {
  /**
   * Submits email and credentials to the backend.
   * On success, stores the JWT and user in localStorage.
   *
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, token?: string, user?: object, message?: string}>}
   */
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user details in localStorage
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      return {
        success: true,
        token: data.data.accessToken,
        user: data.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'An unexpected error occurred during submission.',
      };
    }
  },

  /**
   * Gets the currently authenticated user from localStorage.
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Gets the stored JWT access token.
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Clears the authentication state.
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
