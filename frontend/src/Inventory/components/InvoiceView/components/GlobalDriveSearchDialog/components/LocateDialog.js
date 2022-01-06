import React, { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";

// ANIMATIONS
import GIF from "../../../../../../Shared/assets/comp.gif";
import Animate from "../../../../../../Shared/transitions/Animate";

// COMPONENTS
import Dialog from "../../../../../../Shared/components/Dialog/Dialog";
import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";
import getDrvLocation from "../../../../../../Shared/functions/getDrvLocation";
import OutlinedCard from "../../../../../../Shared/components/Card/OutlinedCard";
import MediaCard from "../../../../../../Shared/components/Card/MediaCard";
import { Typography, Avatar } from "@mui/material";

// ICONS
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import HttpRoundedIcon from "@mui/icons-material/HttpRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { red } from "@mui/material/colors";

const LocateDialog = (props) => {
  const { sendRequest } = useHttpClient();
  const [systems, setSystems] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  const getData = async () => {
    try {
      let responseData = await sendRequest(
        "http://mps-ed-ptgval.ad.shared:5000/api/system"
      );
      setSystems(responseData.systems);
      setDataReady(true);
    } catch (err) {}
  };

  useEffect(
    () => {
      getData();
    },
    // eslint-disable-next-line
    []
  );

  const driveLocation = getDrvLocation(props.sn, systems);

  return (
    <React.Fragment>
      {dataReady && (
        <Dialog open={props.open} close={props.close} maxWidth="xs">
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Animate show>
                <MediaCard media={GIF} height={220} />
              </Animate>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {driveLocation ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Animate show delay="0.4s">
                    <OutlinedCard click>
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Grid item xs={2} align="right">
                          <Avatar
                            variant="rounded"
                            sx={{ width: 35, height: 35 }}
                          >
                            <DesktopWindowsRoundedIcon />
                          </Avatar>
                        </Grid>
                        <Grid item xs={10} align="center">
                          <Typography
                            variant="subtitle2"
                            display="block"
                            sx={{ fontSize: "16px" }}
                          >
                            {driveLocation.sysId}
                          </Typography>
                        </Grid>
                      </Grid>
                    </OutlinedCard>
                  </Animate>
                </Grid>
                <Grid item xs={12}>
                  <Animate show delay="0.8s">
                    <OutlinedCard click>
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Grid item xs={2} align="right">
                          <Avatar
                            variant="rounded"
                            sx={{ width: 35, height: 35 }}
                          >
                            <MyLocationRoundedIcon />
                          </Avatar>
                        </Grid>
                        <Grid item xs={10} align="center">
                          <Typography
                            variant="subtitle2"
                            display="block"
                            sx={{ fontSize: "16px" }}
                          >
                            {"Rack " +
                              driveLocation.rackNo +
                              " Row " +
                              driveLocation.rackRow +
                              " --- " +
                              driveLocation.rackLoc}
                          </Typography>
                        </Grid>
                      </Grid>
                    </OutlinedCard>
                  </Animate>
                </Grid>
                <Grid item xs={12}>
                  <Animate show delay="1.2s">
                    <OutlinedCard click>
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Grid item xs={2} align="right">
                          <Avatar
                            variant="rounded"
                            sx={{ width: 35, height: 35 }}
                          >
                            <HttpRoundedIcon />
                          </Avatar>
                        </Grid>
                        {driveLocation.ip && (
                          <Grid item xs={10} align="center">
                            <Typography
                              variant="subtitle2"
                              display="block"
                              sx={{ fontSize: "16px" }}
                            >
                              {driveLocation.ip}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </OutlinedCard>
                  </Animate>
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item xs={12}>
                <Animate show>
                  <OutlinedCard click>
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Grid item xs={2} align="right">
                        <Avatar
                          variant="rounded"
                          sx={{ width: 35, height: 35, bgcolor: red[500] }}
                        >
                          <CloseRoundedIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs={10} align="center">
                        <Typography
                          variant="subtitle2"
                          display="block"
                          sx={{ fontSize: "16px" }}
                        >
                          Unable to Locate Drive
                        </Typography>
                      </Grid>
                    </Grid>
                  </OutlinedCard>
                </Animate>
              </Grid>
            )}
          </Grid>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default LocateDialog;
