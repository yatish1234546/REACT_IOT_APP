import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Toolbar,
  Button
} from "@material-ui/core";
import * as actionCreator from "../../state/actions/index";

import "./Floors.scss";
const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },

  pos: {
    marginBottom: 12
  },
  formField: {
    margin: "10px"
  },
  appBar: {
    backgroundColor: "#3f4d67",
    color: "white"
  }
});

const Floors = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [floor, setFloor] = useState({
    name: "",
    number: "",
    mode: "Maintainence"
  });

  useEffect(() => {
    dispatch(actionCreator.getFloors());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleChange = evt => {
    setFloor({ ...floor, [evt.target.id]: evt.target.value });
  };

  const reset = () => {
    setFloor({ name: "", number: "", mode: "Maintainence" });
  };

  const addNewFloor = () => {
    props.addFloor(floor).then(res => {
      handleClose();
    });
  };

  let itemsToRender;

  if (props.floors && props.floors.length !== 0) {
    itemsToRender = props.floors.map(floor => {
      return (
        <Grid item sm={3} key={floor.number}>
          <Card
            className={`${classes.root} ${
              floor.mode === "Maintainence" ? "maintainence" : "operational"
            }`}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="h5" component="h5" className={classes.title}>
                {floor.name}
              </Typography>
              <Typography component="h6" className={classes.title}>
                Mode: {floor.mode}
              </Typography>
              <Typography component="h6">No of Devices Available</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  } else {
    itemsToRender = (
      <Grid item sm={12}>
        <Button
          variant="outlined"
          color="secondary"
          style={{ width: "100%", padding: "30px" }}
        >
          No Floors Available
        </Button>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item sm={11}>
        <Typography variant="h5">Floors</Typography>
      </Grid>
      <Grid item sm={1} style={{ textAlign: "right" }}>
        <Button onClick={handleClickOpen} color="primary" variant="outlined">
          Add
        </Button>
      </Grid>
      {itemsToRender}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Toolbar className={classes.appBar}>
          <Typography variant="h6" className="title">
            Add New Floor
          </Typography>
        </Toolbar>

        <DialogContent>
          <TextField
            className={classes.formField}
            autoFocus
            id="number"
            value={floor.number}
            onChange={handleChange}
            label="Floor Number"
            type="text"
            variant="outlined"
          />
          <br />
          <TextField
            autoFocus
            className={classes.formField}
            id="name"
            value={floor.name}
            onChange={handleChange}
            label="Floor Name"
            type="text"
            variant="outlined"
          />
          <br />

          <TextField
            autoFocus
            className={classes.formField}
            id="mode"
            value={floor.mode}
            onChange={handleChange}
            label="Mode"
            type="text"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={addNewFloor} color="primary" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    floors: state.floors.allFloors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFloors: () => dispatch(actionCreator.getFloors()),
    addFloor: payload => dispatch(actionCreator.addFloor(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Floors);
