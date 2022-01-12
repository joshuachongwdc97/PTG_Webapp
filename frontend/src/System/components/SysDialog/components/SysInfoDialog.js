import React, { useEffect, useState } from "react";

// Images
import GIF from "../../../../Shared/assets/comp_hw.gif";

import { Button, Grid, Typography } from "@mui/material";

import Dialog from "../../../../Shared/components/Dialog/Dialog";
import MediaCard from "../../../../Shared/components/Card/MediaCard";
import AvatarCard from "../../../../Shared/components/Card/AvatarCard";
import OutlinedCard from "../../../../Shared/components/Card/OutlinedCard";
import SysDeleteDialog from "./SysDeleteDialog";
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

const SysInfoDialog = (props) => {
  const [status, setStatus] = useState();
  const [showDelDialog, setShowDelDialog] = useState(false);

  useEffect(() => {
    if (props.open) {
      setStatus(SysStatus(props.sys));
    }
  }, [props.sys, props.open]);

  const DialogActions = (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          startIcon={<BookmarkAddedRoundedIcon />}
        >
          RESERVE
        </Button>
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

      <Dialog
        open={props.open}
        close={props.close}
        maxWidth="lg"
        actions={DialogActions}
      >
        {props.sys && (
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
                    title={"R" + props.sys.rackRow + " - " + props.sys.rackLoc}
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
                    title={props.sys.ip ? props.sys.ip : "Unable to obtain IP"}
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
                    title={props.sys.qual ? "Job Detected" : "No Jobs Detected"}
                    letterSpacing="1px"
                    fontWeight="350"
                    icon={<CodeRoundedIcon fontSize="medium" />}
                  />
                </Animate>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default SysInfoDialog;
