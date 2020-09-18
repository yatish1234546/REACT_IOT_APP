import React, { useEffect, useState } from "react";
import * as actionCreator from "../../state/actions/index";
import { connect } from "react-redux";

import * as Mui from "@material-ui/core";
const useStyles = Mui.makeStyles({
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
  },
  devices: {
    marginTop: "20px"
  }
});

const Zones = props => {
  const classes = useStyles();
  const { getZones, zones, floors, getFloors } = props;
  const [open, setOpen] = useState(false);
  const [zone, setZone] = useState({
    name: "",
    number: "",
    floor: null
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getFloors();
    getZones();
  }, [getZones, getFloors]);

  const getFloorDetails = floorId => {
    const [floor] = floors.filter(floor => floor._id === floorId);
    if (floor) {
      return floor;
    }
    return null;
  };

  let itemsToRender;

  if (zones && zones.length !== 0) {
    itemsToRender = zones.map(zone => {
      return (
        <Mui.Grid item sm={3} key={zone._id}>
          <Mui.Paper
            elevation={24}
            className="animate__animated animate__slideInLeft"
          >
            <Mui.Card className={classes.root} variant="outlined">
              <Mui.CardContent>
                <Mui.Typography
                  variant="h5"
                  component="h5"
                  color="textPrimary"
                  className={classes.title}
                >
                  {zone.name}
                </Mui.Typography>
                <Mui.Typography
                  component="h6"
                  color="textSecondary"
                  variant="overline"
                  display="block"
                >
                  Floor:
                  {getFloorDetails(zone.floorId) !== null
                    ? getFloorDetails(zone.floorId).name
                    : "NA"}
                </Mui.Typography>
                <Mui.Divider />
                <Mui.Typography
                  variant="caption"
                  component="h6"
                  className={classes.devices}
                >
                  No Devices available
                </Mui.Typography>
              </Mui.CardContent>
            </Mui.Card>
          </Mui.Paper>
        </Mui.Grid>
      );
    });
  } else {
    itemsToRender = (
      <Mui.Grid item sm={12}>
        <Mui.Button
          variant="outlined"
          color="secondary"
          style={{ width: "100%", padding: "30px" }}
        >
          No Zones Available
        </Mui.Button>
      </Mui.Grid>
    );
  }

  return (
    <Mui.Grid container spacing={3}>
      <Mui.Grid item sm={11}>
        <Mui.Typography variant="h4" component="h4" color="textPrimary">
          Zones
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item sm={1} style={{ textAlign: "right" }}>
        <Mui.Button
          className="primary"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add
        </Mui.Button>
      </Mui.Grid>
      <Mui.Divider />
      {itemsToRender}

      <Mui.Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Mui.Toolbar className={classes.appBar}>
          <Mui.Typography variant="h6" className="title">
            Add New Floor
          </Mui.Typography>
        </Mui.Toolbar>

        <Mui.DialogContent>
          <Mui.TextField
            className={classes.formField}
            autoFocus
            id="code"
            label="Code"
            type="text"
            variant="outlined"
          />
          <br />
          <Mui.TextField
            autoFocus
            className={classes.formField}
            id="name"
            label="Name"
            type="text"
            variant="outlined"
          />
          <br />

          <Mui.TextField
            autoFocus
            className={classes.formField}
            id="floor"
            label="Floor"
            type="text"
            variant="outlined"
          />
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button
            className="secondary"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Mui.Button>
          <Mui.Button className="primary" variant="outlined">
            Save
          </Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog>
    </Mui.Grid>
  );
};

const mapStateToProps = state => {
  return {
    zones: state.zoneReducer.zones,
    floors: state.floors.allFloors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFloors: () => dispatch(actionCreator.getFloors()),
    getZones: () => dispatch(actionCreator.getZones())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Zones);
