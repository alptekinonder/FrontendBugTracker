import PropTypes from 'prop-types';
/* eslint-disable*/
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import UserServices from '../../services/user.service';
import AuthServices from '../../services/auth.service';

const ProductCard = ({ project, ...rest }) => {
  const userData = AuthServices.getCurrentUser();
  return(
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
        {project.title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {project.description}
      </Typography>
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
            {project.startDate}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    { userData.roles[0]=='ROLE_ADMIN' &&(
    <Button
      align="center"
      variant="outlined"
      color="primary"
      onClick={
        ()=> {
          UserServices.deleteProject(project.id)
          window.location.reload(true);
        }
      }
    >
      Remove
    </Button>
    )}
  </Card>
);
};

ProductCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProductCard;
