import React, { useContext } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Grid } from "@mui/material";

import BasicCard from "../../../Shared/components/Card/BasicCard";
import { DarkContext } from "../../../Shared/context/dark-context";

const PieChartCard = (props) => {
  const darkMode = useContext(DarkContext);

  // Change tooltip background color accordingly with webapp's theme
  const lightTheme = {
    textColor: "#8f8f8f",
    fontSize: "0.8em",
    tooltip: {
      container: {
        background: "white",
      },
    },
    labels: {
      text: { fontWeight: "bold" },
    },
  };

  const darkTheme = {
    ...lightTheme,
    tooltip: { container: { background: "black" } },
    grid: {
      line: {
        stroke: "#474747",
      },
    },
  };

  return (
    <BasicCard>
      <Grid item container sx={{ height: "300px" }}>
        <ResponsivePie
          theme={darkMode.dark ? darkTheme : lightTheme}
          data={props.data}
          margin={{ top: 50, right: 80, bottom: 10, left: 80 }}
          innerRadius={0.5}
          padAngle={1.5}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#8f8f8f"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#383838"
        />
      </Grid>
    </BasicCard>
  );
};

export default PieChartCard;
