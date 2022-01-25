import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";

// Images
import GIF from "../../../../Shared/assets/comp_hw.gif";

import { Button, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Dialog from "../../../../Shared/components/Dialog/Dialog";
import MediaCard from "../../../../Shared/components/Card/MediaCard";
import AvatarCard from "../../../../Shared/components/Card/AvatarCard";
import OutlinedCard from "../../../../Shared/components/Card/OutlinedCard";
import SysDeleteDialog from "./SysDeleteDialog";
import ReserveDialog from "./ReserveDialog";
import Animate from "../../../../Shared/transitions/Animate";

// FUNCTIONS
import SysStatus from "../../../../Shared/functions/SysStatus";

// ICONS
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import HttpRoundedIcon from "@mui/icons-material/HttpRounded";
import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import DesktopAccessDisabledRoundedIcon from "@mui/icons-material/DesktopAccessDisabledRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

// VARIABLES
import { serverName } from "../../../../Shared/variables/Variables";

const SysInfoDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [status, setStatus] = useState();
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showReserveDialog, setShowReserveDialog] = useState(false);
  const [releasing, setReleasing] = useState(false);
  const [qual, setQual] = useState();

  console.log(qual);

  const getQual = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/qual" + props.sys.qual
      );
      setQual(responseData.qual);
    } catch (err) {}
  };

  useEffect(
    () => {
      if (props.open) {
        setStatus(SysStatus(props.sys));
      }

      if (props.qual) {
        getQual();
      }
    }, // eslint-disable-next-line
    [props.sys, props.open, props.qual]
  );

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
    setReleasing(false);
    props.getData();
  };

  const DialogActions = (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {status !== "reserved" ? (
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            startIcon={<BookmarkAddedRoundedIcon />}
            onClick={() => {
              setShowReserveDialog(true);
            }}
          >
            RESERVE
          </Button>
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
          >
            RELEASE
          </LoadingButton>
        )}
      </Grid>
      <Grid item xs={6}>
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

      <ReserveDialog
        open={showReserveDialog}
        close={() => {
          setShowReserveDialog(false);
        }}
        id={props.open ? props.sys.id : null}
        getData={props.getData}
      />

      <Dialog
        open={props.open}
        close={props.close}
        maxWidth="lg"
        actions={DialogActions}
      >
        {props.sys && (
          <React.Fragment>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="outlined"
                  fullWidth
                  color={
                    status === "online"
                      ? "success"
                      : status === "reserved"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {status}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1.5}>
                  <Grid item xs={5} container spacing={1.5}>
                    <Grid item xs={12}>
                      <Animate show>
                        {status === "offline" ? (
                          <OutlinedCard align="center" click>
                            <Grid container alignItems={"center"} spacing={3}>
                              <Grid item xs={12} align="center">
                                <DesktopAccessDisabledRoundedIcon
                                  sx={{ height: "100px", width: "100px" }}
                                />
                              </Grid>
                              <Grid item xs={12} align="center">
                                <Typography>System Offline</Typography>
                              </Grid>
                            </Grid>
                          </OutlinedCard>
                        ) : (
                          <MediaCard media={GIF} height={420} />
                        )}
                      </Animate>
                    </Grid>
                  </Grid>
                  <Grid item xs={2.5} container spacing={1.5}>
                    <Grid item xs={12}>
                      <Animate show delay="0.5s">
                        <AvatarCard
                          title={props.sys.sysId}
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<NumbersRoundedIcon fontSize="small" />}
                        />
                      </Animate>
                    </Grid>
                    <Grid item xs={12}>
                      <Animate show delay="0.6s">
                        <AvatarCard
                          title={
                            "R" + props.sys.rackRow + " - " + props.sys.rackLoc
                          }
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<MyLocationRoundedIcon fontSize="small" />}
                        />
                      </Animate>
                    </Grid>
                    <Grid item xs={12}>
                      <Animate show delay="0.7s">
                        <AvatarCard
                          title={props.sys.chipset}
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<MemoryRoundedIcon fontSize="medium" />}
                        />
                      </Animate>
                    </Grid>
                    <Grid item xs={12}>
                      <Animate show delay="0.8s">
                        <AvatarCard
                          title={props.sys.hba}
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<CableRoundedIcon fontSize="small" />}
                        />
                      </Animate>
                    </Grid>
                    <Grid item xs={12}>
                      <Animate show delay="0.9s">
                        <AvatarCard
                          title={props.sys.os ? props.sys.os : "Unknown OS"}
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<DeviceHubRoundedIcon fontSize="small" />}
                        />
                      </Animate>
                    </Grid>
                  </Grid>
                  <Grid item xs={4.5} container spacing={1.5}>
                    <Grid item xs={12}>
                      <Animate show delay="1.5s">
                        <AvatarCard
                          title={
                            props.sys.ip ? props.sys.ip : "Unable to obtain IP"
                          }
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<HttpRoundedIcon fontSize="medium" />}
                        />
                      </Animate>
                    </Grid>
                    <Grid item xs={12}>
                      <Animate show delay="1.7s">
                        <AvatarCard
                          title={
                            props.sys.drive
                              ? props.sys.drive
                              : "No Test Drive Connected"
                          }
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<AlbumRoundedIcon fontSize="medium" />}
                        />
                      </Animate>
                    </Grid>
                    <Grid item xs={12}>
                      <Animate show delay="1.9s">
                        <AvatarCard
                          title={
                            status === "reserved"
                              ? props.sys.status
                              : props.sys.qual
                              ? "Job Detected"
                              : "No Jobs Detected"
                          }
                          letterSpacing="1px"
                          fontWeight="350"
                          icon={<CodeRoundedIcon fontSize="medium" />}
                        />
                      </Animate>
                    </Grid>
                  </Grid>
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
