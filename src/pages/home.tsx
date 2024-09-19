import { Box, Typography, Stack } from "@pankod/refine-mui";
import { propertiesCharts } from "constatns/home";
import { PieChart, PropertyReferrals, TotalRevenue } from "components";

const Home = () => {
  return (
    <>
      <Box overflow="hidden">
        <Typography fontSize={"25px"} fontWeight={700} color="#11142D">
          Dashboard
        </Typography>
        <Box mt="20px" display="flex" gap={4} flexWrap="wrap">
          {propertiesCharts.map((box, ind) => (
            <PieChart
              title={box.title}
              value={box.value}
              series={box.series}
              colors={box.colors}
            />
          ))}
        </Box>
      </Box>

      <Stack display="flex" gap={3} direction={{ xs: "column", lg: "row" }}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </>
  );
};

export default Home;
