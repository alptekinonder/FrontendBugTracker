/*eslint-disable*/
import { Helmet } from 'react-helmet';
import { Typography, Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { useState, useEffect } from 'react';
import UserServices from '../services/user.service';
import AuthServices from '../services/auth.service';

const CustomerList = () => {
  const userData = AuthServices.getCurrentUser();
  const [users, setUsers] = useState();
  useEffect(() => {
    async function getUsers() {
      const response = await UserServices.getUsers();
      setUsers(response);
      console.log(users);
    }
    getUsers();
  }, []);

  return (
    userData == null ? (<Typography variant="h1" component="h2" color="primary" align="center" >PLEASE LOG IN</Typography>):(
    <>
      <Helmet>
        <title>Customers </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            {
              (users && <CustomerListResults customers={users} />)
            }

          </Box>
        </Container>
      </Box>
    </>
    )
  );
};

export default CustomerList;
