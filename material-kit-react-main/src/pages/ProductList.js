/*eslint-disable*/
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import TicketListToolbar from 'src/components/ticket/TicketListToolbar';
import UserServices from '../services/user.service';
import AuthServices from '../services/auth.service';
import TicketCard from 'src/components/ticket/TicketCard';

const ProductList = () => {
  const userData = AuthServices.getCurrentUser();
  const [whichToolBar, setToolBar] = useState(true);
  const [projectIDD, setProjectIDD] = useState(5);
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await UserServices.getProjects();
      setProjects(response);
      console.log(projects);
    }
    fetchMyAPI();
  }, []);
  async function fetchTickets(projectID) {
    const response = await UserServices.getTickets(projectID);
    setTickets(response);
    console.log(tickets);
  }
  return (
    userData == null ? (<Typography variant="h1" component="h2" color="primary" align="center" >PLEASE LOG IN</Typography>):(
    <>
      <Helmet>
        <title>Products </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {whichToolBar ? (<ProductListToolbar />)
            : (<TicketListToolbar setFunc={func=>setToolBar(func)}  projectID={projectIDD}/>
            )}
          { console.log('BAK BURA') }
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {whichToolBar ? 
                projects.map((project) => (
                <Grid
                  item
                  key={project.id}
                  lg={6}
                  md={6}
                  xs={12}
                >
                  <ProductCard
                    project={project}
                    onClick={() => {
                      console.log(`${project.id} at the on click`);
                      setProjectIDD(project.id);
                      setToolBar(!whichToolBar);
                      let aa = async () =>  await fetchTickets(project.id) ;
                      aa();
                    }}
                  />
                </Grid>
              ))
              :
               tickets.map((ticket) => (
                <Grid
                  item
                  key={ticket.id}
                  lg={6}
                  md={6}
                  xs={12}
                >
                  <TicketCard
                    ticket={ticket}
                    onClick={() => {
                      console.log(`${ticket.id} at the on click`);
                    }}
                  />
                </Grid>
              ))}
              
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
          </Box>
        </Container>
      </Box>
    </>)
  );
};

export default ProductList;
