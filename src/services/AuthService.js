const AuthService = {
  saveUserData(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUserData() {
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user?.token;
  },

  logout() {
    this.removeUserData();
  },

  getUsername() {
    const user = this.getCurrentUser();
    return user ? user.username : null;
  },
};

export default AuthService;
