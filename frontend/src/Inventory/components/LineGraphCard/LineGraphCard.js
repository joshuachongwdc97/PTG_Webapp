import React, { useContext } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Grid } from "@mui/material";

import BasicCard from "../../../Shared/components/Card/BasicCard";
import { DarkContext } from "../../../Shared/context/dark-context";
import SelectMenu from "../../../Shared/components/Input/SelectMenu";

const LineGraphCard = (props) => {
  const darkMode = useContext(DarkContext);

  // Change tooltip background color accordingly with webapp's theme
  const lightTheme = {
    textColor: "#8f8f8f",
    tooltip: {
      container: {
        background: "white",
      },
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
      <Grid item container xs={2.5}>
        <SelectMenu
          required
          label="Timeline"
          data={[
            { value: "past week", label: "Past Week" },
            { value: "past month", label: "Past Month" },
            { value: "past year", label: "Past Year" },
          ]}
          onChange={props.changePeriodHandler}
          value={props.selectedPeriod}
          name="period"
          size="small"
        ></SelectMenu>
      </Grid>

      <Grid item container sx={{ height: "12.5em" }}>
        <ResponsiveLine
          theme={darkMode.dark ? darkTheme : lightTheme}
          data={props.data}
          margin={{ top: 10, right: 100, bottom: 20, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridY={false}
          pointSize={4}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor", modifiers: [] }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Grid>
    </BasicCard>
  );
};

export default LineGraphCard;
