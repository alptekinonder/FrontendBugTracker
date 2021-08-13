/*eslint-disable*/
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
export function authHeader2() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return  `Bearer ${user.accessToken}` ;
  } else {
    return '';
  }
}
