/* eslint-disable react/prop-types */
/* eslint-disable*/
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useState } from 'react';
import UserServices from '../../services/user.service';
import AuthServices from '../../services/auth.service';

const TicketCard = ({ ticket, ...rest }) => {
  const userData = AuthServices.getCurrentUser();
  const [devs, setDevs] = useState(false);
  const [users, setUsers] = useState();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  // api functions
  async function getUsers() {
    const response = await UserServices.getUsers();
    console.log(`USERS CARD SELECTED = ${users}`);
    console.log(`resp CARD SELECTED = ${response}`);
    setUsers(response);
    console.log(`USERS CARD SELECTED = ${users}`);
  }
  async function assignDeveloper(selected) {
    console.log(`TICKET CARD SELECTED = ${ticket.id}`);
    const response = await UserServices.assignDeveloper(ticket.id, users[selected - 1].username);
    console.log(response);
  }
  // functions for handling check boxes of developers
  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {ticket.ticketTitle}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {ticket.ticketDescription}
        </Typography>
        {userData.roles[0]=='ROLE_ADMIN' && (
        <Button
          align="center"
          variant="outlined"
          color="primary"
          onClick={async () => {
            await getUsers();
            setDevs(!devs);
            window.location.reload(true);
          }}
        >
          Assign to a Developer
        </Button>
        )}
        <Button
          align="center"
          variant="outlined"
          color="primary"
          onClick={
            ()=> {
              UserServices.deleteTicket(ticket.id)
              window.location.reload(true);
            }
          }
        >
          Remove
        </Button>

      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <AccessTimeIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {`Creation Date: ${ticket.createDate}`}
            </Typography>
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {`Assigned Date: ${ticket.assignDate}`}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <GetAppIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {console.log('heere')}
              {' '}
              {ticket.assignedDeveloper}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {devs
        && (
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <Button
                    align="center"
                    variant="outlined"
                    color="primary"
                    onClick={
                      () => {assignDeveloper(selectedCustomerIds)
                      window.location.reload(true);}
                    }>
                    Assign
                  </Button>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {customer.username}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>)}
    </Card>
  );
};

export default TicketCard;
