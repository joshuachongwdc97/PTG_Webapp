import React, { useState, useEffect } from "react";
import { Grid, Divider } from "@mui/material";

// COMPONENTS
import Dialog from "../../../../../../Shared/components/Dialog/Dialog";
import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";
import getDrvLocation from "../../../../../../Shared/functions/getDrvLocation";

// ICONS
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

const LocateDialog = (props) => {
  const { sendRequest } = useHttpClient();
  const [systems, setSystems] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  const getData = async () => {
    console.log("Fetching Data");
    try {
      let responseData = await sendRequest(
        "http://mps-ed-ptgval.ad.shared:5000/api/system"
      );
      setSystems(responseData.systems);

      console.log("Data fetched");
      setDataReady(true);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const driveLocation = getDrvLocation(props.sn, systems);

  return (
    <React.Fragment>
      {dataReady && (
        <Dialog open={props.open} close={props.close}>
          {driveLocation ? (
            <Grid container spacing={2}>
              <Grid item>
                <h2>Drive Location</h2>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item container spacing={6}>
                <Grid item>
                  <div>
                    <strong>System ID</strong>
                  </div>
                  <div>{driveLocation.sysId}</div>
                </Grid>
                <Grid item>
                  <div>
                    <strong>Rack No.</strong>
                  </div>
                  <div>{driveLocation.rackNo}</div>
                </Grid>
                <Grid item>
                  <div>
                    <strong>Rack Row</strong>
                  </div>
                  <div>{driveLocation.rackRow}</div>
                </Grid>
                <Grid item>
                  <div>
                    <strong>Rack Location</strong>
                  </div>
                  <div>{driveLocation.rackLoc}</div>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div>
              <p>Drive is not in the system</p>
            </div>
          )}
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default LocateDialog;
