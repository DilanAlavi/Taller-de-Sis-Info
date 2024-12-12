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
  
  export function setCorreo(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); 
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`; 
  }

  export function getCorreo(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null; 
  }

  export function deleteCorreo(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  