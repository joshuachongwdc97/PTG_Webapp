import React, { useContext } from "react";
import { ResponsivePie } from "@nivo/pie";

import BasicCard from "../../../Shared/components/Card/BasicCard";
import { DarkContext } from "../../../Shared/context/dark-context";

const PieChartCard = (props) => {
  const darkMode = useContext(DarkContext);
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
      <div style={{ height: 250 }}>
        <ResponsivePie
          theme={darkMode.dark ? darkTheme : lightTheme}
          data={props.data}
          margin={{ top: 0, right: 80, bottom: 0, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
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
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      </div>
    </BasicCard>
  );
};

export default PieChartCard;
