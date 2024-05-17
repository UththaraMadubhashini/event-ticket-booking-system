import React from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  is3D: true,
  backgroundColor: 'transparent',
  legend: { position: 'right', alignment: 'center' },
};

export default function PieChart() {
  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" align="center" sx={{ mb: -15 }}>
        My Daily Activities
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"600px"}
          height={"500px"}
        />
      </Box>
    </Box>
  );
}
