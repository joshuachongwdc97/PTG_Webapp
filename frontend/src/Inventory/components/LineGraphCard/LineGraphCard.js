import React, { useContext } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

import BasicCard from "../../../Shared/components/Card/BasicCard";
import { DarkContext } from "../../../Shared/context/dark-context";

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
    legends: {
      hidden: { text: { fill: "#8f8f8f" }, symbol: { fill: "#8f8f8f" } },
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

  const lineTheme = {
    "<= 30 days": "hsl(123, 38%, 57%)",
    "31-60 days": "hsl(54, 84%, 65%)",
    "61-90 days": "hsl(38, 79%, 56%)",
    "> 90 days": "hsl(9, 87%, 67%)",
  };

  return (
    <BasicCard>
      <Grid item container xs={12}>
        <Button
          variant="text"
          onClick={props.changePeriodHandler}
          value="past 3 months"
          size="small"
        >
          3 Months
        </Button>
        <Button
          variant="text"
          onClick={props.changePeriodHandler}
          value="past 6 months"
          size="small"
        >
          6 Months
        </Button>
        <Button
          variant="text"
          onClick={props.changePeriodHandler}
          value="past year"
          size="small"
        >
          Year
        </Button>
      </Grid>

      <Grid item container sx={{ height: "12.5em" }}>
        <ResponsiveLine
          theme={darkMode.dark ? darkTheme : lightTheme}
          data={props.data}
          colors={(id) => lineTheme[id.id]}
          margin={{ top: 10, right: 100, bottom: 25, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
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
              toggleSerie: true,
            },
          ]}
        />
      </Grid>
    </BasicCard>
  );
};

export default LineGraphCard;
