export const saveToken = (token) => {
    localStorage.setItem('access_token', token);
  };
  

  export const getToken = () => {
    return localStorage.getItem('access_token');
  };
  

  export const removeToken = () => {
    localStorage.removeItem('access_token');
  };
  

  export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  

  export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  export const removeUser = () => {
    localStorage.removeItem('user');
  };
  