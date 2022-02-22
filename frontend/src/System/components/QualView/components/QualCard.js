import React, { useState } from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import { serverName } from "../../../../Shared/variables/Variables";

import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

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

  // QUAL CARD ACTIONS
  const actions = (
    <React.Fragment>
      <Tooltip title="View Systems">
        <IconButton
          size="small"
          onClick={() => {
            props.setSelectedQual(props.qual.id);
            props.setShowSysDialog(true);
          }}
        >
          <DesktopWindowsRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Mark As Complete">
        <IconButton size="small">
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
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ fontWeight: "500" }}
              color="textSecondary"
            >
              {props.invoice ? props.invoice.name : "Invoice Not Found"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LinearProgress
              variant="indeterminate"
              value={100}
              color={"primary"}
              sx={{ borderRadius: "10px", marginTop: "10px" }}
            />
          </Grid>
        </Grid>
      </BasicCard>
    </React.Fragment>
  );
};

export default QualCard;
