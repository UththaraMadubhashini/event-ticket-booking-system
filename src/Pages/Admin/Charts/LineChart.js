import React from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const data = [
  ["Months", "Sales"],
  ["June",100],
  ["May", 580],
  ["April", 850],
  ["March", 1050],
];

export const options = {
  title: "Tickets Sales",
  curveType: "function",
  legend: { position: "bottom" },
};

export default function LineChart() {
  return (

    <Box sx={{ maxWidth: '350px', margin: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" align="center" sx={{ mb: -10 }}>
        My Daily Activities
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', }}>
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
