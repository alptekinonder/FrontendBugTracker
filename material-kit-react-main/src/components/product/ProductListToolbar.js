/*eslint-disable*/
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState} from 'react';
import UserServices from '../../services/user.service';
import AuthServices from '../../services/auth.service';
const ProductListToolbar = (props) => {
  const userData = AuthServices.getCurrentUser();
  
  const [addTicketBar, setAddTicketBar]=useState(false);
  const [DescriptionField, setDescriptionField]=useState("");
  const [TitleField, setTitleField]=useState("");
  async function sendProject(TitleField,DescriptionField) {
    const response = await UserServices.postProject(TitleField,DescriptionField);
    console.log(response);
    window.location.reload(true);
  }
  return(
  <Box {...props}>
    {userData.roles[0]=='ROLE_ADMIN' && (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={()=> setAddTicketBar(!addTicketBar)}
      >
        Add product
      </Button>
    </Box>
    )}
    {addTicketBar && (
      <Box>
        <TextField id="outlined-basic" label="Title" variant="outlined" margin="normal" onChange={ (e) => setTitleField(e.target.value)}/>
        <Button
        variant="outlined"
        color="primary"
        margin="normal"
        onClick={async()=> await sendProject(TitleField,DescriptionField)}
        >
          Post Project
        </Button>
        <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth={true} margin="normal"onChange={ (e) => setDescriptionField(e.target.value)}/>
      </Box>
      )}
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder=" Not Implemented Yet"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);};

export default ProductListToolbar;
