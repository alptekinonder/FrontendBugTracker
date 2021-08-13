/*eslint-disable*/
import { ContactlessOutlined } from '@material-ui/icons';
import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://ec2-3-15-163-209.us-east-2.compute.amazonaws.com:8080/';
//const API_URL = 'http://localhost:8080/';
const getProjects = () => axios.get(API_URL+ 'projects', { headers: authHeader() }
).then((response) => {
    return response.data;
  });
const getTickets = (projectId) => axios.get(`${API_URL}tickets/${projectId}`, { headers: authHeader() }
).then((response) => {
    return response.data;
  });
  //{'Content-Type': 'application/json'}
const postTicket = (projectId, title,description) => {
  const article = { ticketDescription: description, projectId: projectId,ticketTitle:title};
  const headers = { 
      'Authorization': authHeader().Authorization,
      'Content-Type': 'application/json'
  };
  axios.post(`${API_URL}tickets`, article, {headers}
).then((response) => {
    return response.data;
  });}
const postProject = (title, description) => {
  const article = {title: title, description: description};
  const headers = { 
      'Authorization': authHeader().Authorization,
      'Content-Type': 'application/json'
  };
  axios.post(`${API_URL}projects`, article, {headers}
).then((response) => {
    return response.data;
  });}

const assignDeveloper = (ticketId, assignedDeveloper) => {
    const article = {ticketId: ticketId, assignedDeveloper: assignedDeveloper};
    const headers = { 
        'Authorization': authHeader().Authorization,
        'Content-Type': 'application/json'
    };
    axios.put(`${API_URL}tickets/${ticketId}`, article, {headers}
  ).then((response) => {
      return response.data;
    });}

const deleteTicket = (ticketId) => {
      axios.delete(`${API_URL}tickets/${ticketId}`, { headers: authHeader() }
    ).then((response) => {
        return response.data;
      });}
  
const deleteProject = (projectId) => {
        axios.delete(`${API_URL}projects/${projectId}`,{ headers: authHeader() }
      ).then((response) => {
          return response.data;
        });}


const getUsers = () => axios.get(`${API_URL}users`, { headers: authHeader() }
).then((response) => {
    return response.data;
  });
export default {
  getProjects,
  getTickets,
  postProject,
  postTicket,
  getUsers,
  assignDeveloper,
  deleteTicket,
  deleteProject
};