/* eslint-disable*/
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import AuthService from '../services/auth.service';

const Dashboard = () => {
  const userData = AuthService.getCurrentUser();
  const allData = { totalprojects: 5, totaltickets: 10, totalusers: 10 };
  /*  const [allData, setCurrentStatus] = useState();
  useEffect(() => {
    async function getCurrentStatus() {
      const response = await UserServices.getCurrentStatus();
      setCurrentStatus(response);
      console.log(users);
    }
    getCurrentStatus();
  }, []); */
  return (
        <>
          <Helmet>
            <title>Dashboard </title>
          </Helmet>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3
            }}
          >
            <Container maxWidth={false}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Budget totalprojects={allData.totalprojects} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TotalCustomers totalusers={allData.totalusers} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TasksProgress />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TotalProfit totaltickets={allData.totaltickets} sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <Sales />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
  );
};

export default Dashboard;
