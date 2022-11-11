export const tokenService = {
  setToken(token: string) {
    if (token) localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  removeToken() {
    return localStorage.removeItem('token');
  },

  authToken() {
    const token = tokenService.getToken();
    if (token) {
      return `Bearer ${token}`;
    } else {
      return '';
    }
  },
};
