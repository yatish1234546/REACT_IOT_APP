import React, { useEffect, useState } from "react";
import * as actionCreator from "../../state/actions/index";
import { connect, useDispatch } from "react-redux";

import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Chip,
  IconButton
} from "@material-ui/core";

import { ChevronRight, Edit } from "@material-ui/icons";

const StyledTableCell = withStyles(theme => ({
  head: {
    padding: "20px",
    backgroundColor: "#3f4d67",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "white"
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#3f4d67",
    color: "white"
  },
  formField: {
    marginBottom: "10px"
  },
  select: {
    width: "100%",
    margin: "10px"
  }
});

const names = ["System Admin", "User", "Admin", "Mainatiner"];

const User = props => {
  const classes = useStyles();
  const { getAllUsers, users, addUser, editUser } = props;
  const [roles, setRoles] = useState([]);
  const [editing, setEdit] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    roles: [],
    email: "",
    password: ""
  });
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleRoleChange = event => {
    let newRoles = roles;
    newRoles = event.target.value;
    setRoles(newRoles);
    setUser({ ...user, roles: newRoles });
  };

  const saveUser = () => {
    if (editing) {
      editUser(user);
    } else {
      addUser(user);
    }
    cancel();
  };

  const cancel = () => {
    setUser({
      firstName: "",
      lastName: "",
      userName: "",
      roles: [],
      email: "",
      password: ""
    });
    setRoles([]);
    setEdit(false);
  };

  const edit = user => {
    setEdit(true);
    setUser(user);
    setRoles(user.roles);
  };
  return (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <Toolbar className={classes.appBar}>
          <Typography variant="h6" className="title">
            Add New User
          </Typography>
        </Toolbar>
        <Card className={classes.root}>
          <CardContent>
            <TextField
              className={classes.formField}
              autoFocus
              id="firstName"
              label="First Name"
              type="text"
              variant="outlined"
              value={user.firstName}
              onChange={event =>
                setUser({ ...user, firstName: event.target.value })
              }
              fullWidth
            />
            <TextField
              autoFocus
              className={classes.formField}
              id="lastName"
              label="Last Name"
              type="text"
              variant="outlined"
              value={user.lastName}
              onChange={event =>
                setUser({ ...user, lastName: event.target.value })
              }
              fullWidth
            />

            <TextField
              autoFocus
              className={classes.formField}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              value={user.email}
              onChange={event =>
                setUser({ ...user, email: event.target.value })
              }
              fullWidth
            />

            <TextField
              autoFocus
              className={classes.formField}
              id="userName"
              label="User Name"
              type="text"
              variant="outlined"
              value={user.userName}
              onChange={event =>
                setUser({ ...user, userName: event.target.value })
              }
              fullWidth
            />

            <TextField
              autoFocus
              className={classes.formField}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={event =>
                setUser({ ...user, password: event.target.value })
              }
              fullWidth
            />

            <FormControl variant="filled" className={classes.select}>
              <InputLabel>Roles</InputLabel>
              <Select
                multiple
                value={roles}
                onChange={handleRoleChange}
                input={<Input id="role" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="primary" onClick={saveUser}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={cancel}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item sm={7}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell>Roles</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user.firstName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.lastName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.userName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.roles}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <IconButton onClick={() => edit(user)}>
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    users: state.auth.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(actionCreator.getAllUsers()),
    addUser: user => dispatch(actionCreator.addUser(user)),
    editUser: user => dispatch(actionCreator.editUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
