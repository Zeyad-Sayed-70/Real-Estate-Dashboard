import { Box, Stack, Typography } from '@pankod/refine-mui'
import { propertyReferralsInfo } from 'constatns';
import ReactApexChart from "react-apexcharts";

interface ProgressBar {
  title: string;
  percentage: number;
  color: string
}

const ProgressBar = ({ title, percentage, color }: ProgressBar) => (
  <>
  <Box 
    display='flex'
    alignItems='center'
    justifyContent='space-between' 
    sx={{ backgroundColor: '#fcfcfc' }}
  >
    <Typography fontWeight={500} fontSize={16} color='#11142D'>
      {title}
    </Typography>
    <Typography fontWeight={500} fontSize={16} color='#11142D'>
      {percentage}%
    </Typography>
  </Box>
  <Box
    position="relative"
    width="100%"
    height="8px"
    borderRadius={1}
    bgcolor="#e4e8ef"
  >
  <Box
    width={`${percentage}%`}
    bgcolor={color}
    position="absolute"
    height="100%"
    borderRadius={1}
  />
</Box>
  </>
)

const PropertyReferrals = () => {
  return (
    <>
    <Box
      mt='20px'
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
    <Typography fontSize={18} fontWeight={600} color="#11142d" mb={3}>
      Total Revenue
    </Typography>
    <Stack gap={2}>
      {propertyReferralsInfo.map(prop => (
        <ProgressBar title={prop.title} percentage={prop.percentage} color={prop.color}/>
      ))}
    </Stack>
    </Box>
    </>
  )
}

export default PropertyReferrals