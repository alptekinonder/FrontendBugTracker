/*eslint-disable*/
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    flexbox
  } from '@material-ui/core';
  import UserServices from '../../services/user.service';
  import { Search as SearchIcon } from 'react-feather';
  import {useState} from 'react';
  import React from 'react';

  const TicketListToolBar = (props) => {
    const {projectID}= props;
    const [addTicketBar, setAddTicketBar]=useState(false);
    const [DescriptionField, setDescriptionField]=useState("");
    const [AssignedDeveloper, setAssignedDeveloper]=useState("");
    const [TitleField, setTitleField]=useState("");
    async function sendTicket(description,title) {
      const response = await UserServices.postTicket(projectID,description,title);
      console.log(response);
    }
    return(
    <Box >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={()=> props.setFunc(true)}
        >
          Back to Projects
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={()=>setAddTicketBar(!addTicketBar)}
        >
          Add Ticket
        </Button>
      </Box>
      {addTicketBar && (
      <Box>
        <TextField id="outlined-basic" label="AssignedDeveloper" variant="outlined" margin="normal" onChange={ (e) => setAssignedDeveloper(e.target.value)}/>
        <TextField id="outlined-basic" label="Title" variant="outlined" margin="normal" onChange={ (e) => setTitleField(e.target.value)}/>
        <Button
        variant="outlined"
        color="primary"
        margin="normal"
        onClick={async()=> await sendTicket(DescriptionField,TitleField)}
        >
          Post Ticket
        </Button>
        <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth={true} margin="normal"onChange={ (e) => setDescriptionField(e.target.value)}/>
      </Box>
      )}
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box flexWrap="nowrap" sx={{ maxWidth: 500 }}>
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
                placeholder="Not Implemented Yet"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
    );};
  
  export default TicketListToolBar;
  