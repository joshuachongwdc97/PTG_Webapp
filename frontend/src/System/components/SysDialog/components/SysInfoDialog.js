import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import { serverName } from "../../../../Shared/variables/Variables";
import { SysStatusColors } from "../../../../Shared/variables/SysStatusColors";

// Images
import GIF from "../../../../Shared/assets/comp_hw.gif";

import {
  Button,
  Grid,
  Typography,
  Divider,
  // LinearProgress,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// COMPONENTS
import Dialog from "../../../../Shared/components/Dialog/Dialog";
import MediaCard from "../../../../Shared/components/Card/MediaCard";
import OutlinedCard from "../../../../Shared/components/Card/OutlinedCard";
import SysDeleteDialog from "./SysDeleteDialog";
import ReserveDialog from "./ReserveDialog";
import Animate from "../../../../Shared/transitions/Animate";
import SysResetDialog from "./SysResetDialog";

// FUNCTIONS
// import sysStatus from "../../../../Shared/functions/sysStatus";
import { capFirstLetter } from "../../../../Shared/functions/CapFirstLetter";
// import getTestDuration from "../../../../Shared/functions/getTestDuration";
// import getEstTestEnd from "../../../../Shared/functions/getEstTestEnd";
// import getTimeRemaining from "../../../../Shared/functions/getTimeRemaining";

// ICONS
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import DesktopAccessDisabledRoundedIcon from "@mui/icons-material/DesktopAccessDisabledRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const SysInfoDialog = (props) => {
  const { sendRequest } = useHttpClient();
  const [status, setStatus] = useState();
  const [drive, setDrive] = useState();
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showReserveDialog, setShowReserveDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [reserving, setReserving] = useState(false);
  const [releasing, setReleasing] = useState(false);
  const [resetting, setResetting] = useState(false);
  // const [estTestEnd, setEstTestEnd] = useState();
  // const [timeRemaining, setTimeRemaining] = useState([0, 0]);
  // const [testDur, setTestDur] = useState(0);
  // const [testPercent, setTestPercent] = useState(0);

  // Calculate Progress Percentage
  // useEffect(() => {
  //   if (testDur && timeRemaining[0] * 60 + timeRemaining[1]) {
  //     const percent =
  //       ((testDur * 60 - timeRemaining[0] * 60 - timeRemaining[1]) /
  //         (testDur * 60)) *
  //       100;

  //     // If current time exceeds estimated end time, set percentage to 99
  //     if (timeRemaining[0] < 0 && timeRemaining[1] < 0) {
  //       setTestPercent(99);
  //     } else if (status === "test completed") {
  //       setTestPercent(100);
  //     } else {
  //       setTestPercent(percent);
  //     }
  //   } else {
  //     setTestPercent(0);
  //   }
  // }, [testDur, timeRemaining, status]);

  // Get Drive Details / Estimated Test End Time / Test Duration
  useEffect(
    () => {
      // if (props.open && props.sys && props.test) {
      //   const testDuration = getTestDuration(props.test, props.sys.testMode);
      //   setEstTestEnd(getEstTestEnd(props.sys.testStart, testDuration));
      //   setTestDur(parseInt(testDuration));
      // } else {
      //   setEstTestEnd();
      //   setTestDur(0);
      // }

      if (props.open && props.sys) {
        if (props.sys.drive) {
          getDriveDetails();
        } else {
          setDrive();
        }
      }
    }, // eslint-disable-next-line
    [props.open, props.sys, props.test]
  );

  // Calculate Time Remaining
  // useEffect(() => {
  //   if (estTestEnd) {
  //     setTimeRemaining(getTimeRemaining(estTestEnd));
  //     const interval = setInterval(() => {
  //       setTimeRemaining(getTimeRemaining(estTestEnd));
  //     }, 60000);
  //     return () => clearInterval(interval);
  //   } else {
  //     setTimeRemaining([0, 0]);
  //   }
  // }, [estTestEnd]);

  useEffect(
    () => {
      if (props.open) {
        setStatus(props.sys.stat);
      } else {
      }
      setReserving(false);
      setReleasing(false);
      setResetting(false);
    }, // eslint-disable-next-line
    [props.open, props.sys]
  );

  const getDriveDetails = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/drive/sn/" + props.sys.drive
      );
      setDrive(responseData.drive);
    } catch (err) {}
  };

  const releaseSysHandler = async () => {
    setReleasing(true);
    try {
      await sendRequest(
        "http://" + serverName + "/api/system/release",
        "PATCH",
        JSON.stringify({ IDs: [props.sys.id] }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    props.getData();
  };

  const DialogActions = (
    <Grid container spacing={2}>
      <Grid item xs={status !== "online" ? 4 : 6}>
        {status !== "reserved" ? (
          <LoadingButton
            variant="contained"
            color="success"
            size="large"
            fullWidth
            startIcon={<BookmarkAddedRoundedIcon />}
            onClick={() => {
              setShowReserveDialog(true);
            }}
            loading={reserving}
            loadingPosition="start"
            loadingIndicator={
              <CircularProgress color="inherit" size={16} disableShrink />
            }
          >
            RESERVE
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            color="warning"
            size="large"
            fullWidth
            startIcon={<BookmarkAddedRoundedIcon />}
            onClick={releaseSysHandler}
            loading={releasing}
            loadingPosition="start"
            loadingIndicator={
              <CircularProgress color="inherit" size={16} disableShrink />
            }
          >
            RELEASE
          </LoadingButton>
        )}
      </Grid>
      {status !== "online" && (
        <Grid item xs={4}>
          <LoadingButton
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<RestartAltRoundedIcon />}
            onClick={() => {
              setShowResetDialog(true);
            }}
            loading={resetting}
            loadingPosition="start"
            loadingIndicator={
              <CircularProgress color="inherit" size={16} disableShrink />
            }
          >
            RESET
          </LoadingButton>
        </Grid>
      )}
      <Grid item xs={status !== "online" ? 4 : 6}>
        <Button
          variant="contained"
          color="error"
          size="large"
          fullWidth
          startIcon={<DeleteForeverRoundedIcon />}
          onClick={() => {
            setShowDelDialog(true);
          }}
        >
          DELETE
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <SysDeleteDialog
        open={showDelDialog}
        close={() => {
          setShowDelDialog(false);
        }}
        id={props.open ? props.sys.id : null}
        postDel={() => {
          setShowDelDialog(false);
          props.close();
          props.getData();
        }}
      />

      <SysResetDialog
        open={showResetDialog}
        close={() => {
          setShowResetDialog(false);
        }}
        mac={props.open ? props.sys.mac : null}
        getSystems={props.getSystems}
        setResetting={setResetting}
      />

      <ReserveDialog
        open={showReserveDialog}
        close={() => {
          setShowReserveDialog(false);
        }}
        id={props.open ? props.sys.id : null}
        getData={props.getData}
        setReserving={setReserving}
      />

      <Dialog
        open={props.open}
        close={props.close}
        maxWidth="md"
        actions={DialogActions}
      >
        {props.sys && (
          <React.Fragment>
            <Grid container spacing={1.5}>
              <Grid item xs={5} container spacing={1.5}>
                <Grid item xs={12}>
                  <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    startIcon={<NumbersRoundedIcon />}
                    color={SysStatusColors[status]}
                  >
                    {props.sys.sysId}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Animate show>
                    {status === "offline" ? (
                      <OutlinedCard align="center" click minHeight={300}>
                        <Grid container alignItems={"center"} spacing={3}>
                          <Grid item xs={12} align="center">
                            <DesktopAccessDisabledRoundedIcon />
                          </Grid>
                          <Grid item xs={12} align="center">
                            <Typography>System Offline</Typography>
                          </Grid>
                        </Grid>
                      </OutlinedCard>
                    ) : (
                      <MediaCard media={GIF} height={300} />
                    )}
                  </Animate>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<MyLocationRoundedIcon />}
                  >
                    {"R" + props.sys.rackRow + " - " + props.sys.rackLoc}
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs container spacing={1.5}>
                <Grid item xs={12}>
                  <OutlinedCard>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Hardware Specs
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="caption" color="textSecondary">
                          Chipset : {props.sys.chipset}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="caption" color="textSecondary">
                          HBA : {props.sys.hba}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider
                          sx={{ marginTop: "10px", marginBottom: "10px" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Connection Details
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="caption" color="textSecondary">
                          Status :{" "}
                          {status ? capFirstLetter(status) : "Unavailable"}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="caption" color="textSecondary">
                          IP Address :{" "}
                          {props.sys.ip ? props.sys.ip : "Unavailable"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider
                          sx={{ marginTop: "10px", marginBottom: "10px" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Drive Connected
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="caption" color="textSecondary">
                          SN :{" "}
                          {props.sys.drive ? props.sys.drive : "Unavailable"}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="caption" color="textSecondary">
                          Label: {drive ? drive.label : "Unavailable"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider
                          sx={{ marginTop: "10px", marginBottom: "10px" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Test Details
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary">
                          {!props.sys.qual
                            ? "No Jobs Detected"
                            : props.sys.qual}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Test Details
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary">
                          {!props.sys.qual
                            ? "No Jobs Detected"
                            : props.test && props.invoice
                            ? "[" +
                              props.test.test +
                              "] [" +
                              props.qual.soda +
                              "] - " +
                              props.invoice.name
                            : "Test Info Unavailable"}
                        </Typography>
                      </Grid>
                      {props.sys.qual && props.sys.stat !== "test error" && (
                        <React.Fragment>
                          <Grid item xs={8}>
                            <Typography variant="caption" color="textSecondary">
                              {timeRemaining[0] >= 0 && timeRemaining[1] >= 0
                                ? "Time Remaining : " +
                                  timeRemaining[0] +
                                  " hrs " +
                                  timeRemaining[1] +
                                  " mins"
                                : "Test Near Completion"}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} align="right">
                            <Typography variant="caption" color="textSecondary">
                              {Math.floor(testPercent) + "%"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <LinearProgress
                              variant="buffer"
                              value={testPercent}
                              valueBuffer={testPercent}
                              color={testPercent >= 100 ? "success" : "primary"}
                            />
                          </Grid>
                        </React.Fragment>
                      )}

                      {props.sys.qual && props.sys.stat === "test error" && (
                        <Grid item xs={12}>
                          <Typography variant="caption" color="error">
                            Test Error Detected, please check system logs
                          </Typography>
                        </Grid>
                      )} */}
                    </Grid>
                  </OutlinedCard>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default SysInfoDialog;
