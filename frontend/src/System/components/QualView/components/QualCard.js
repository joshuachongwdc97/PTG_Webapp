import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import { serverName } from "../../../../Shared/variables/Variables";

import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

// FUNCTIONS
import getTimeRemaining from "../../../../Shared/functions/getTimeRemaining";
import getDuration from "../../../../Shared/functions/getDuration";
import average from "../../../../Shared/functions/averageArr";

import {
  Chip,
  Grid,
  Typography,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

// ICONS
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

import BasicCard from "../../../../Shared/components/Card/BasicCard";

const QualCard = (props) => {
  const { sendRequest } = useHttpClient();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEndAlert, setShowEndAlert] = useState(false);
  const [timeRem, setTimeRem] = useState([0, 0]);
  const [duration, setDuration] = useState([0, 0]);
  const [progress, setProgress] = useState(0);
  const [modeProgress, setModeProgress] = useState(0);

  // Get Time Remaining & Total Qual Duration (Planned)
  useEffect(() => {
    if (props.qual.plannedEnd) {
      const plannedStart = new Date(props.qual.plannedStart);
      const plannedEnd = new Date(props.qual.plannedEnd);

      setTimeRem(getTimeRemaining(plannedEnd));
      setDuration(getDuration(plannedStart, plannedEnd));
    } else {
      setTimeRem([0, 0]);
    }
  }, [props.qual]);

  // Calculate Qual Progress
  useEffect(() => {
    if (timeRem !== [0, 0] && duration !== [0, 0]) {
      const timeRemMins = timeRem[0] * 60 + timeRem[1];
      const durationMins = duration[0] * 60 + duration[1];

      // eslint-disable-next-line
      setProgress(
        Math.floor(((durationMins - timeRemMins) / durationMins) * 100)
      );
    }
  }, [timeRem, duration]);

  // Get Mode Progress
  useEffect(() => {
    if (props.systems.length > 0) {
      const progressArr = props.systems.map((sys) => {
        return sys.modeProgress;
      });
      setModeProgress(Math.floor(average(progressArr)));
    }
  }, [props.systems]);

  // QUAL CARD ACTIONS
  const actions = (
    <React.Fragment>
      <Tooltip title="View Systems">
        <IconButton
          size="small"
          onClick={() => {
            props.setSelectedQual(props.qual);
            props.setShowQualSysDialog(true);
          }}
        >
          <DesktopWindowsRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Mark As Complete">
        <IconButton
          size="small"
          onClick={() => {
            setShowEndAlert(true);
          }}
        >
          <DoneAllRoundedIcon fontSize="small" color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={() => {
            setShowDeleteAlert(true);
          }}
        >
          <DeleteForeverRoundedIcon fontSize="small" color="error" />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );

  const delQualHandler = async () => {
    try {
      await sendRequest(
        "http://" + serverName + "/api/qual/" + props.qual.id,
        "DELETE"
      );
      props.getQuals();
    } catch (err) {}
  };

  const endQualHandler = async () => {
    try {
      await sendRequest(
        "http://" + serverName + "/api/qual/end/" + props.qual.id,
        "PATCH"
      );
    } catch (err) {}

    const qualSystems = [];
    props.systems.forEach((sys) => {
      if (sys.qual === props.qual.id) {
        qualSystems.push(sys.mac);
      }
    });

    try {
      await sendRequest(
        "http://" + serverName + "/api/system/test/reset",
        "PATCH",
        JSON.stringify({ macs: qualSystems }),
        { "Content-Type": "application/json" }
      );

      props.getSystems();
      props.getQuals();
      setShowEndAlert(false);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <AlertDialog
        open={showDeleteAlert}
        close={() => {
          setShowDeleteAlert(false);
        }}
        proceedTitle="Delete"
        proceedColor="error"
        closeTitle="Cancel"
        closeColor="primary"
        title="Deleting Job"
        proceed={delQualHandler}
      >
        Are you sure?
      </AlertDialog>
      <AlertDialog
        open={showEndAlert}
        close={() => {
          setShowEndAlert(false);
        }}
        proceedTitle="End"
        proceedColor="error"
        closeTitle="Cancel"
        closeColor="primary"
        title="End Job"
        proceed={endQualHandler}
      >
        Are you sure?
      </AlertDialog>
      <BasicCard actions={actions}>
        <Grid container spaing={1} rowSpacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              {props.qual.soda}
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <Chip
              label={props.test.test}
              sx={{
                borderRadius: "5px",
                fontWeight: "600",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="caption"
              noWrap
              sx={{ fontWeight: "500" }}
              color="textSecondary"
            >
              {props.invoice ? props.invoice.name : "Invoice Removed"}
            </Typography>
          </Grid>

          {/* Mode Progress */}
          {props.test.modes.length > 1 && (
            <Grid item xs={12} container>
              <Grid item xs={8}>
                <Typography variant="caption" color="textSecondary">
                  Mode Progress
                </Typography>
              </Grid>
              <Grid item xs={4} align="right">
                <Typography variant="caption" color="textSecondary">
                  {modeProgress + "%"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress
                  variant={
                    progress > 100 || progress === 0 ? "determinate" : "buffer"
                  }
                  value={modeProgress}
                  valueBuffer={modeProgress}
                  color={modeProgress === 100 ? "success" : "primary"}
                  sx={{
                    borderRadius: "10px",
                    marginTop: "5px",
                  }}
                />
              </Grid>
            </Grid>
          )}

          {/* OVERALL PROGRESS */}
          <Grid item xs={12} container>
            <Grid item xs={8}>
              <Typography variant="caption" color="textSecondary">
                Qual Progress
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
              <Typography variant="caption" color="textSecondary">
                {progress <= 100 ? progress + "%" : "!"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant={
                  progress > 100 || progress === 0 ? "indeterminate" : "buffer"
                }
                value={progress}
                valueBuffer={progress}
                color={progress > 100 ? "warning" : "primary"}
                sx={{
                  borderRadius: "10px",
                  marginTop: "5px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </BasicCard>
    </React.Fragment>
  );
};

export default QualCard;
