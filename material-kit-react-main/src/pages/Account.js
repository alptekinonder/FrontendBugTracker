/*eslint-disable*/
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import AuthServices from '../services/auth.service';

const Account = () => (
  AuthServices.getCurrentUser() == null ? (<Typography variant="h1" component="h2" color="primary" align="center" >PLEASE LOG IN</Typography>) : (
  <>
    <Helmet>
      <title>Account </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>)
);

export default Account;
