import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

// COMPONENTS
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import BasicCard from "../../../Shared/components/Card/BasicCard";
import StorageGrid from "./StorageGrid";

// VARIABLES
import { serverName } from "../../../Shared/variables/Variables";

const ServerStorageCard = () => {
  const { sendRequest } = useHttpClient();
  const [storageData, setStorageData] = useState([]);

  const getStorageData = async () => {
    let response;
    try {
      response = await sendRequest(
        "http://" + serverName + "/api/system/storage"
      );

      const filteredDrives = response.storageData.filter((drv) =>
        ["D:", "E:"].includes(drv.drive)
      );
      setStorageData(filteredDrives);
    } catch (err) {}
  };

  useEffect(() => {
    getStorageData();
    // eslint-disable-next-line
  }, []);

  return (
    <BasicCard title="Server Storage">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Server Storage Utilization
          </Typography>
        </Grid>
        {storageData &&
          storageData.map((data) => (
            <StorageGrid
              drive={data.drive}
              totalSpace={data.totalSpace}
              freeSpace={data.freeSpace}
              key={data.drive}
              progress={
                ((data.totalSpace - data.freeSpace) / data.totalSpace) * 100
              }
            />
          ))}
      </Grid>
    </BasicCard>
  );
};

export default ServerStorageCard;
