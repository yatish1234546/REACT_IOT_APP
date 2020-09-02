import React, { useEffect } from "react";
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
  }
});

const Zones = props => {
  const classes = useStyles();
  const { getZones, zones, floors, getFloors } = props;

  useEffect(() => {
    getFloors();
    getZones();
  }, [getZones, getFloors]);

  useEffect(() => {
    console.log(floors);
    console.log(zones);
  }, [floors, zones]);
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
                  className={classes.title}
                >
                  {zone.name}
                </Mui.Typography>

                <Mui.Typography component="h6">
                  Zones On Floor: {zone.devices.length}
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
        <Mui.Typography variant="h5">Floors</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item sm={1} style={{ textAlign: "right" }}>
        <Mui.Button className="primary" variant="outlined">
          Add
        </Mui.Button>
      </Mui.Grid>
      <Mui.Divider />
      {itemsToRender}
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
