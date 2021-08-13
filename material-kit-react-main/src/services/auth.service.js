import axios from 'axios';

//  const API_URL = 'http://localhost:8080/';
const API_URL = 'http://ec2-3-15-163-209.us-east-2.compute.amazonaws.com:8080/';
const register = (username, email, password) => axios.post(`${API_URL}api/auth/signup`, {
  username,
  email,
  password,
}).then((response) => {
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
});

const login = (username, password) => axios.post(`${API_URL}api/auth/signin`, {
  username,
  password,
})
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
