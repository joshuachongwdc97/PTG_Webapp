import React, { useState, useEffect } from "react";
import { Grid, Typography, LinearProgress } from "@mui/material";
import CountUp from "react-countup";

// COMPONENTS
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import BasicCard from "../../../Shared/components/Card/BasicCard";

// VARIABLES
import { serverName } from "../../../Shared/variables/Variables";

const ServerStorageCard = () => {
  const { sendRequest } = useHttpClient();
  const [storageData, setStorageData] = useState([
    { drive: "PTG_STORAGE_B", freeSpace: "20", totalSpace: "230" },
  ]);

  const getStorageData = async () => {
    let response;
    try {
      response = await sendRequest(
        "http://" + serverName + "/api/system/storage"
      );
    } catch (err) {
      console.log(err);
    }

    const updatedStorageData = storageData.concat(
      Object.values(response.storageData)
    );
    setStorageData(updatedStorageData);
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
            Server Storage
          </Typography>
        </Grid>
        {storageData &&
          storageData.map((data) => (
            <Grid
              item
              container
              xs={12}
              alignSelf={"center"}
              key={data.drive}
              paddingTop={3}
            >
              <Grid item xs={7}>
                <Typography variant="h5">{data.drive}</Typography>
              </Grid>
              <Grid item xs={5} textAlign={"right"} alignSelf={"center"}>
                <Typography variant="subtitle2" justifyItem={"right"}>
                  <CountUp
                    start={0}
                    end={data.totalSpace - data.freeSpace}
                    duration={0.5}
                  />
                  {" GB / " + data.totalSpace + " GB"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress
                  variant="determinate"
                  value={
                    ((data.totalSpace - data.freeSpace) / data.totalSpace) * 100
                  }
                  color="info"
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </BasicCard>
  );
};

export default ServerStorageCard;
