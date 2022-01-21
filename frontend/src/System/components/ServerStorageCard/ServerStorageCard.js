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
  const [storageData, setStorageData] = useState();

  const getStorageData = async () => {
    let response;
    try {
      response = await sendRequest(
        "http://" + serverName + "/api/system/storage"
      );
    } catch (err) {
      console.log(err);
    }
    setStorageData(Object.values(response.storageData));
  };

  useEffect(() => {
    getStorageData();
    // eslint-disable-next-line
  }, []);

  return (
    <BasicCard title="Server Storage">
      <Grid container>
        <Grid item xs={12} paddingBottom={1.5}>
          <Typography variant="subtitle2" color="textSecondary">
            Server Storage
          </Typography>
        </Grid>
        {storageData &&
          storageData.map((data) => (
            <Grid item container xs={12} key={data.drive}>
              <Grid item xs={1.5}>
                <Typography variant="h4">{data.drive}</Typography>
              </Grid>
              <Grid
                item
                xs={10.5}
                alignSelf={"center"}
                justifyContent={"right"}
              >
                <Typography variant="subtitle2">
                  <CountUp
                    start={0}
                    end={data.totalSpace - data.freeSpace}
                    duration={0.5}
                  />
                  {" GB / " + data.totalSpace + " GB"}
                </Typography>
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
