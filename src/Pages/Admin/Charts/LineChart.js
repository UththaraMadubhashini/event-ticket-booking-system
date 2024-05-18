import React from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

export default function LineChart() {
  return (

    <Box sx={{ maxWidth: '350px', margin: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" align="center" sx={{ mb: -10 }}>
        My Daily Activities
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chart
      chartType="LineChart"
      width="800px"
      height="400px"
      data={data}
      options={options}
        />
    </Box>
    </Box>
  );
}
