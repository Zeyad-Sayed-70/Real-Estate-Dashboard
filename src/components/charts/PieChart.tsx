import { Box, Stack, Typography } from '@pankod/refine-mui'
import ReactApexChart from "react-apexcharts";

import { PieChartProps } from "interfaces/home";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <>
    <Box
    id="chart"
    display='flex'
    flex={1}
    sx={{
      backgroundColor: "#fcfcfc",
      borderRadius: '15px',
      py: '1rem',
      pl: '1rem',
      gap: '2rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '110px',
      width: 'fit-content',
    }}
    >
      <Stack display='flex' direction='column'>
        <Typography 
          fontSize={'14px'}  
          color='#808191'
        >
          {title}
        </Typography>
        <Typography 
          fontSize={'24px'}
          fontWeight={700}
          color='#11142D'
        >
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: 'donut' },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width="120px"
      />
    </Box>
    </>
  )
}

export default PieChart