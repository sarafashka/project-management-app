class AuthService {
  static setToken = (token: string) => {
    if (token) localStorage.setItem('token', token);
  };

  static getToken = () => {
    return localStorage.getItem('token');
  };

  static removeToken = () => {
    return localStorage.removeItem('token');
  };

  static authUser = () => {
    const token = this.getToken();
    if (token) {
      return 'Bearer ' + token;
    } else {
      return '';
    }
  };
}

export default AuthService;
